---
title: Introduction
sidebar_position: 1
---
# Kurimod

<div class="badge-links">
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat&logo=telegram&logoColor=white)](https://t.me/honlyonee)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/joyccn/Kurimod)
![GitHub License](https://img.shields.io/github/license/joyccn/Kurimod)
</div>

Kurimod is a versatile Python add-on for the Kurigram library, designed to make developing Telegram bots faster and more
efficient.

It's based on **monkeypatching**, which means it works together with Kurigram, rather than being a fork or modified
version. It
adds features to Kurigram classes on the go, so you don't need to update it every time Kurigram is updated.

Whether you're building a simple chatbot or a complex form to get multiple responses from the user, Kurimod has you
covered. It enhances Kurigram with a range
of advanced features, simplifies conversation handling, and offers a high degree of customizability.

## About Kurigram

**Kurigram** is a Telegram MTProto API client library for Python that maintains **100% API compatibility with Pyrogram**. This means:

- All Pyrogram API calls work exactly the same in Kurigram
- You can use `from pyrogram import Client` with Kurigram
- All filters, types, and methods have the same names and signatures
- Existing Pyrogram code can be used with Kurigram without modifications

The main difference is that Kurigram is actively maintained by a different developer (KurimuzonAkuma) and may include additional optimizations and features while maintaining full backward compatibility with Pyrogram's API.

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
