---
title: Kurimod.config
---

> *object* `Kurimod.config`

The `config` object in Kurimod is a `SimpleNamespace` object that stores configuration settings for your Kurimod-powered
bot. These settings allow you to customize the behavior of your bot according to your specific needs.

## Attributes

| Attribute                    | Type     | Default value                                         | Description                                                                                                                                                                                |
|------------------------------|----------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timeout_handler`            | callable | None                                                  | An optional callback function that can be set to handle timeouts for listeners.                                                                                                            |
| `stopped_handler`            | callable | None                                                  | An optional callback function that can be set to handle when a listener is stopped.                                                                                                        |
| `throw_exceptions`           | bool     | True                                                  | A boolean flag that determines whether Kurimod should raise exceptions for certain events.                                                                                                 |
| `unallowed_click_alert`      | bool     | True                                                  | A boolean flag that controls whether users should be alerted when they click a button that doesn't match the filters (i.e. clicking on a button that is supposed for other user to click). |
| `unallowed_click_alert_text` | str      | `[Kurimod] You're not expected to click this button.` | The text to display in the alert when `unallowed_click_alert` is `True`.                                                                                                                   |
| `disable_startup_logs`       | bool     | False                                                 | A boolean flag that determines whether the startup message logged by Kurimod should be suppressed.                                                                                         |

## Example Usage

Here's an example of how to configure Kurimod using the `config` object:

```python
from Kurimod.config import config

# Set a custom timeout handler function
config.timeout_handler = my_custom_timeout_handler

# Disable raising exceptions for listener events
config.throw_exceptions = False
```