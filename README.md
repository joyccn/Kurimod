# Kurimod

<img src="https://img.shields.io/badge/Telegram-2CA5E0?style=flat&logo=telegram&logoColor=white" height="30" /> <img src="https://img.shields.io/github/v/release/joyccn/Kurimod" height="30" /> <img src="https://img.shields.io/github/license/joyccn/Kurimod" height="30" />

Kurimod is a versatile Python add-on for the Kurigram library, designed to make developing Telegram bots faster and more
efficient.

It's based on **monkeypatching**, which means it works together with Kurigram, rather than being a fork or modified
version. It
adds features to Kurigram classes on the go, so you don't need to update it every time Kurigram is updated.

Whether you're building a simple chatbot or a complex form to get multiple responses from the user, Kurimod has you
covered. It enhances Kurigram with a range
of advanced features, simplifies conversation handling, and offers a high degree of customizability.

## Documentation

You can find the full documentation at [joyccn.github.io/Kurimod](https://joyccn.github.io/Kurimod).

## Key Features

- **Effortless Bot Development:** Kurimod streamlines the process of building conversational Telegram bots, saving you
  time and effort
  during development.

- **Advanced Conversation Management:** Managing conversations with users is made easier, allowing you to create dynamic
  and interactive interactions much easier, without having to save states anywhere, by leveraging the power of
  async/await syntax.

- **Effortless Inline Keyboards Creation:** Creating inline keyboards is easier than ever with Kurimod's inline keyboard
  helper functions.

- **User-Friendly Pagination:** Enhance the user experience by providing easy navigation tools with the Kurimod's
  pagination
  helpers.

- **Highly Customizable:** Kurimod's configuration options let you customize its behavior to meet your specific project
  requirements.

## Examples

**Awaiting a single message from a specific chat:**

```python
response = await client.listen(chat_id=chat_id)
```

**Awaiting a single message from a specific user in a specific chat:**

```python
response = await client.listen(chat_id=chat_id, user_id=user_id)
```

**Asking the user a question then await for the response:**

```python
response = await client.ask(chat_id=chat_id, text='What is your name?')
```

**Asking the user a question then await for the response, with a timeout:**

```python
try:
    response = await client.ask(chat_id=chat_id, text='What is your name?', timeout=10)
except ListenerTimeout:
    await message.reply('You took too long to answer.')
```

**Full handler example, getting user's name and age with bound method Chat.ask:**

```python
from Kurimod import Client, Message
from pyrogram import filters


@Client.on_message(filters.command('form'))
async def on_form(client: Client, message: Message):
    chat = message.chat

    name = await chat.ask('What is your name?', filters=filters.text)
    age = await chat.ask('What is your age?', filters=filters.text)

    await message.reply(f'Your name is {name.text} and you are {age.text} years old.')
```

**Easier inline keyboard creation:**

```python
from Kurimod.helpers import ikb

keyboard = ikb([
    [('Button 1', 'callback_data_1'), ('Button 2', 'callback_data_2')],
    [('Another button', 't.me/durovpalsu', 'url')]
])
```

## Installation

To get started with Kurimod, you can install it using uv:

```bash
uv add git+https://github.com/joyccn/Kurimod
```

Or with pip:

```bash
pip install git+https://github.com/joyccn/Kurimod
```

## Initialization

To initialize Kurimod, on the file that creates the client instance, simply import the Client class from Kurimod instead
of kurigram:

```python
from Kurimod import Client
```

And that's all! You can still use the `Client` class as you would normally do with Kurigram, but now having all the
extra features.

You don't need to change the imports on the plugins files. Even by importing `Client` from kurigram, the Kurimod
features will be available anyway. In order to monkeyatch Kurimod features successfully, it's just required that the
first `Client` class imported to your project code should be from Kurimod. Then all the other future `Client` instances
will be patched automatically.

You just need to import from Kurimod if you want your IDE to recognize and suggest
the extra features based on `Kurimod.Client` type.

## Contributing

We welcome contributions from the community to make Kurimod even better.

Feel free to open issues, submit pull requests,
or contribute in any way that aligns with our goals.

### Copyright & License

This project is based on [Pyromod](https://github.com/usernein/pyromod) by usernein.

- Pyromod - A monkeypatched add-on for Kurigram. Copyright (C) 2020
  usernein <<https://github.com/usernein>>

This project is also based on [Kurigram](https://github.com/KurimuzonAkuma/kurigram) by KurimuzonAkuma.

- Kurigram - Telegram MTProto API Client Library for Python. Copyright (C) 2024
  KurimuzonAkuma <<https://github.com/KurimuzonAkuma>>

### Resources

- [Kurigram Documentation](https://docs.kurigram.icu/)
- [Kurigram Repository](https://github.com/KurimuzonAkuma/kurigram)
- [Pyrogram Documentation](https://docs.pyrogram.org/)

Licensed under the terms of the [GNU Lesser General Public License v3 or later (LGPLv3+)](COPYING.lesser)


