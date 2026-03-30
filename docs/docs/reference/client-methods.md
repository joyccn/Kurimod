---
title: Client Methods
sidebar_position: 1
---

## Client Methods

Kurimod extends the Kurigram Client class with several powerful methods for conversation management and user interaction.

### listen()

Wait for a message or callback query that matches specific criteria.

```python
async def listen(
    filters: Optional[Filter] = None,
    listener_type: ListenerTypes = ListenerTypes.MESSAGE,
    timeout: Optional[int] = None,
    unallowed_click_alert: bool = True,
    chat_id: Union[Union[int, str], List[Union[int, str]]] = None,
    user_id: Union[Union[int, str], List[Union[int, str]]] = None,
    message_id: Union[int, List[int]] = None,
    inline_message_id: Union[str, List[str]] = None,
) -> Union[Message, CallbackQuery]
```

#### Parameters

- **filters** (`Filter`, optional): Filter to apply to the incoming update
- **listener_type** (`ListenerTypes`): Type of listener (MESSAGE or CALLBACK_QUERY). Default: MESSAGE
- **timeout** (`int`, optional): Maximum time to wait in seconds
- **unallowed_click_alert** (`bool`): Whether to alert users on unallowed clicks. Default: True
- **chat_id** (`int`/`str`/`list`, optional): Chat ID(s) to listen from
- **user_id** (`int`/`str`/`list`, optional): User ID(s) to listen from
- **message_id** (`int`/`list`, optional): Message ID(s) to listen for
- **inline_message_id** (`str`/`list`, optional): Inline message ID(s) to listen for

#### Returns

- `Message` or `CallbackQuery`: The matched update

#### Raises

- `ListenerTimeout`: If timeout is reached without receiving a matching update

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

# Wait for any message from a specific chat
response = await client.listen(chat_id=123456789)

# Wait for a text message with timeout
try:
    response = await client.listen(
        chat_id=123456789,
        filters=filters.text,
        timeout=30
    )
except ListenerTimeout:
    print("User didn't respond in time")

# Wait for callback query on a specific message
callback = await client.listen(
    listener_type=ListenerTypes.CALLBACK_QUERY,
    message_id=123
)
```

---

### ask()

Send a message and wait for a response.

```python
async def ask(
    chat_id: Union[Union[int, str], List[Union[int, str]]],
    text: str,
    filters: Optional[Filter] = None,
    listener_type: ListenerTypes = ListenerTypes.MESSAGE,
    timeout: Optional[int] = None,
    unallowed_click_alert: bool = True,
    user_id: Union[Union[int, str], List[Union[int, str]]] = None,
    message_id: Union[int, List[int]] = None,
    inline_message_id: Union[str, List[str]] = None,
    *args,
    **kwargs,
) -> Union[Message, CallbackQuery]
```

#### Parameters

All parameters from `listen()` plus:

- **chat_id** (`int`/`str`/`list`): Chat ID to send the message to
- **text** (`str`): Message text to send
- **args/kwargs**: Additional arguments passed to `send_message()`

#### Returns

- `Message` or `CallbackQuery`: The response from the user

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

# Ask a simple question
response = await client.ask(
    chat_id=123456789,
    text="What is your name?"
)

# Ask with timeout and filters
try:
    response = await client.ask(
        chat_id=123456789,
        text="Enter a number:",
        filters=filters.text,
        timeout=30
    )
    print(f"User entered: {response.text}")
except ListenerTimeout:
    await client.send_message(123456789, "Time's up!")
```

---

### stop_listening()

Stop all listeners matching specific criteria.

```python
async def stop_listening(
    listener_type: ListenerTypes = ListenerTypes.MESSAGE,
    chat_id: Union[Union[int, str], List[Union[int, str]]] = None,
    user_id: Union[Union[int, str], List[Union[int, str]]] = None,
    message_id: Union[int, List[int]] = None,
    inline_message_id: Union[str, List[str]] = None,
) -> None
```

#### Parameters

- **listener_type** (`ListenerTypes`): Type of listeners to stop. Default: MESSAGE
- **chat_id** (`int`/`str`/`list`, optional): Chat ID(s) to stop listening for
- **user_id** (`int`/`str`/`list`, optional): User ID(s) to stop listening for
- **message_id** (`int`/`list`, optional): Message ID(s) to stop listening for
- **inline_message_id** (`str`/`list`, optional): Inline message ID(s) to stop listening for

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

# Stop all listeners for a specific chat
await client.stop_listening(chat_id=123456789)

# Stop all callback query listeners
await client.stop_listening(
    listener_type=ListenerTypes.CALLBACK_QUERY
)

# Stop listeners for a specific message
await client.stop_listening(message_id=123)
```

---

### stop_listener()

Stop a specific listener.

```python
async def stop_listener(listener: Listener) -> None
```

#### Parameters

- **listener** (`Listener`): The listener object to stop

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

# Get a listener reference and stop it later
listener = client.get_listener_matching_with_data(
    data=Identifier(chat_id=123456789),
    listener_type=ListenerTypes.MESSAGE
)

if listener:
    await client.stop_listener(listener)
```

---

### register_next_step_handler()

Register a callback function to handle the next matching update.

```python
def register_next_step_handler(
    callback: Callable,
    filters: Optional[Filter] = None,
    listener_type: ListenerTypes = ListenerTypes.MESSAGE,
    unallowed_click_alert: bool = True,
    chat_id: Union[Union[int, str], List[Union[int, str]]] = None,
    user_id: Union[Union[int, str], List[Union[int, str]]] = None,
    message_id: Union[int, List[int]] = None,
    inline_message_id: Union[str, List[str]] = None,
) -> None
```

#### Parameters

- **callback** (`Callable`): Function to call when a matching update is received
- **filters** (`Filter`, optional): Filter to apply to the incoming update
- **listener_type** (`ListenerTypes`): Type of listener. Default: MESSAGE
- **unallowed_click_alert** (`bool`): Whether to alert on unallowed clicks. Default: True
- **chat_id** (`int`/`str`/`list`, optional): Chat ID(s) to listen from
- **user_id** (`int`/`str`/`list`, optional): User ID(s) to listen from
- **message_id** (`int`/`list`, optional): Message ID(s) to listen for
- **inline_message_id** (`str`/`list`, optional): Inline message ID(s) to listen for

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

# Define a callback function
def handle_name(client, message):
    print(f"User's name: {message.text}")

# Register the callback
client.register_next_step_handler(
    callback=handle_name,
    chat_id=123456789
)
```

---

## Bound Methods

Kurimod also adds convenience methods to `Chat` and `User` objects.

### Chat.listen()

Listen for messages from a specific chat.

```python
async def listen(*args, **kwargs) -> Union[Message, CallbackQuery]
```

### Chat.ask()

Ask a question in a specific chat.

```python
async def ask(text: str, *args, **kwargs) -> Union[Message, CallbackQuery]
```

### Chat.stop_listening()

Stop listening for messages from a specific chat.

```python
async def stop_listening(*args, **kwargs) -> None
```

### User.listen()

Listen for messages from a specific user.

```python
async def listen(*args, **kwargs) -> Union[Message, CallbackQuery]
```

### User.ask()

Ask a question to a specific user.

```python
async def ask(text: str, *args, **kwargs) -> Union[Message, CallbackQuery]
```

### User.stop_listening()

Stop listening for messages from a specific user.

```python
async def stop_listening(*args, **kwargs) -> None
```

#### Example

```python
from Kurimod import Client

client = Client("my_bot")

@client.on_message(filters.command("start"))
async def start_handler(client, message):
    chat = message.chat
    
    # Use bound methods
    name = await chat.ask("What's your name?")
    age = await chat.ask("How old are you?")
    
    await message.reply(f"Hello {name.text}, you are {age.text} years old!")
```
