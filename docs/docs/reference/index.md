---
title: Introduction
sidebar_position: 0
---

# *package* Kurimod

This is a concise list of the main modules, objects, helpers, and decorators provided by Kurimod.

- Modules:
    - Kurimod.config
    - Kurimod.helpers
    - Kurimod.listen
    - Kurimod.nav
    - Kurimod.utils
    - Kurimod.exceptions
    - Kurimod.types

- Objects:
    - Kurimod.config.config
    - Kurimod.listen.Client
    - Kurimod.listen.Message
    - Kurimod.listen.Chat
    - Kurimod.listen.User
    - Kurimod.nav.Pagination
    - Kurimod.types.Identifier
    - Kurimod.types.ListenerTypes
    - Kurimod.types.Listener
    - Kurimod.exceptions.ListenerTimeout
    - Kurimod.exceptions.ListenerStopped
    - Kurimod.utils.patch_into
    - Kurimod.utils.should_patch

- Helpers:
    - Kurimod.helpers.ikb
    - Kurimod.helpers.bki
    - Kurimod.helpers.ntb
    - Kurimod.helpers.btn
    - Kurimod.helpers.kb
    - Kurimod.helpers.kbtn
    - Kurimod.helpers.array_chunk
    - Kurimod.helpers.force_reply

- Decorators:
    - Kurimod.utils.patch_into(target_class)
    - Kurimod.utils.should_patch(func)
