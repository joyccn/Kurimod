---
title: Initialization
sidebar_position: 3
---

To initialize Kurimod, on the file that creates the client instance, simply import the Client class from Kurimod instead
of kurigram:

```python
from Kurimod import Client
```

And that's all! You can still use the `Client` class as you would normally do with Kurigram, but now having all the
extra features.

:::note

You don't need to change the imports on the plugins files. Even by importing `Client` from kurigram, the Kurimod  features will be available anyway.

:::

:::note

In order to monkeyatch Kurimod features successfully, it's just required that the  first `Client` class imported to your project code should be from Kurimod. Then all the other future `Client` instances  will be patched automatically.

:::

:::note

On custom plugins, you just need to import Client from Kurimod if you want your IDE to recognize and suggest
the extra features based on `Kurimod.Client` type.

:::