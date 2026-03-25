import asyncio
from inspect import iscoroutinefunction
from typing import Callable, Tuple

import pyrogram
from pyrogram.filters import Filter
from pyrogram.types import CallbackQuery

from .client import Client
from ..config import config
from ..types import ListenerTypes, Identifier, Listener
from ..utils import patch_into, should_patch


@patch_into(pyrogram.handlers.callback_query_handler.CallbackQueryHandler)
class CallbackQueryHandler(
    pyrogram.handlers.callback_query_handler.CallbackQueryHandler
):
    old__init__: Callable

    @should_patch()
    def __init__(self, callback: Callable, filters: Filter = None):
        self.original_callback = callback
        self.old__init__(self.resolve_future_or_callback, filters)

    @should_patch()
    def compose_data_identifier(self, query: CallbackQuery):
        cache = getattr(query, "_kurimod_data_cache", None)
        if cache is not None:
            return cache

        from_user = query.from_user
        from_user_id = from_user.id if from_user else None
        from_user_username = from_user.username if from_user else None

        chat_id = None
        message_id = None

        if query.message:
            message_id = getattr(
                query.message, "id", getattr(query.message, "message_id", None)
            )

            if query.message.chat:
                chat_id = [query.message.chat.id, query.message.chat.username]

        result = Identifier(
            message_id=message_id,
            chat_id=chat_id,
            from_user_id=[from_user_id, from_user_username],
            inline_message_id=query.inline_message_id,
        )
        setattr(query, "_kurimod_data_cache", result)
        return result

    @should_patch()
    async def check_if_has_matching_listener(
        self, client: Client, query: CallbackQuery
    ) -> Tuple[bool, Listener]:
        cache = getattr(query, "_kurimod_listener_cache", None)
        if cache is not None:
            return cache

        data = self.compose_data_identifier(query)

        listener = client.get_listener_matching_with_data(
            data, ListenerTypes.CALLBACK_QUERY
        )

        listener_does_match = False

        if listener:
            filters = listener.filters
            if callable(filters):
                if iscoroutinefunction(filters.__call__):
                    listener_does_match = await filters(client, query)
                else:
                    loop = asyncio.get_running_loop()
                    listener_does_match = await loop.run_in_executor(
                        None, filters, client, query
                    )
            else:
                listener_does_match = True

        result = (listener_does_match, listener)
        setattr(query, "_kurimod_listener_cache", result)
        return result

    @should_patch()
    async def check(self, client: Client, query: CallbackQuery):
        listener_does_match, listener = await self.check_if_has_matching_listener(
            client, query
        )

        if callable(self.filters):
            if iscoroutinefunction(self.filters.__call__):
                handler_does_match = await self.filters(client, query)
            else:
                loop = asyncio.get_running_loop()
                handler_does_match = await loop.run_in_executor(
                    None, self.filters, client, query
                )
        else:
            handler_does_match = True

        if config.unallowed_click_alert:
            data = self.compose_data_identifier(query)
            permissive_identifier = Identifier(
                chat_id=data.chat_id,
                message_id=data.message_id,
                inline_message_id=data.inline_message_id,
                from_user_id=None,
            )

            if (
                listener
                and (permissive_identifier.matches(data) and not listener_does_match)
                and listener.unallowed_click_alert
            ):
                alert = (
                    listener.unallowed_click_alert
                    if isinstance(listener.unallowed_click_alert, str)
                    else config.unallowed_click_alert_text
                )
                await query.answer(alert)
                return False

        return listener_does_match or handler_does_match

    @should_patch()
    async def resolve_future_or_callback(
        self, client: Client, query: CallbackQuery, *args
    ):
        listener_does_match, listener = await self.check_if_has_matching_listener(
            client, query
        )

        if listener and listener_does_match:
            client.remove_listener(listener)

            if listener.future and not listener.future.done():
                listener.future.set_result(query)

                raise pyrogram.StopPropagation
            elif listener.callback:
                if iscoroutinefunction(listener.callback):
                    await listener.callback(client, query, *args)
                else:
                    loop = asyncio.get_running_loop()
                    await loop.run_in_executor(
                        None, listener.callback, client, query, *args
                    )

                raise pyrogram.StopPropagation
            else:
                raise ValueError("Listener must have either a future or a callback")
        else:
            await self.original_callback(client, query, *args)

