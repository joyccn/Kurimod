# Changelog

All notable changes to Kurimod will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-01-19

### Added
- Full async support throughout the codebase
- Non-blocking callback execution using executor for sync callbacks
- Async methods in Chat and User classes (listen, ask, stop_listening)
- Proper async/await handling for all listener callbacks
- Copyright attribution to Pyromod and Kurigram in documentation

### Changed
- Replaced deprecated `asyncio.get_event_loop()` with `asyncio.get_running_loop()`
- Modified patch mechanism to preserve async methods instead of converting to sync
- Updated base library from Pyrogram to Kurigram
- Updated documentation to reference Kurigram instead of Pyrogram
- Fixed incorrect inheritance in Client class (was inheriting from decorator result)

### Fixed
- Bug where sync callbacks were blocking the event loop
- Bug where Chat and User methods were sync but called async client methods
- Critical bug in Client class inheritance

### Removed
- PyPI references from documentation (now GitHub-only distribution)

### Note
This is the original Pyromod version that Kurimod is based on.
