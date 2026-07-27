# Changelog

All notable changes to AstroVisor Skill are documented here. The project follows
[Semantic Versioning](https://semver.org/).

## [1.0.1] - 2026-07-28

- Store recoverable installation backups under the private AstroVisor
  configuration directory instead of beside active skills.
- Prevent Codex and Claude from discovering an old backup as a duplicate
  `astrovisor` skill after `install --force`.
- Add a regression test for backup isolation.

## [1.0.0] - 2026-07-28

- Publish AstroVisor Skill as a standalone repository and npm package.
- Add installation workflows for Codex, ChatGPT desktop, Claude Code, and Claude
  Desktop.
- Add private API-key configuration with masked diagnostics.
- Add one-Markdown-file-per-person profiles with progressive enrichment.
- Add strict live-OpenAPI request construction for AstroVisor MCP.
- Add multi-person consent, unknown-birth-time safety, and response retrieval
  workflows.
- Add deterministic self-tests and repository validation.

[1.0.1]: https://github.com/rokoss21/astrovisor-skill/releases/tag/v1.0.1
[1.0.0]: https://github.com/rokoss21/astrovisor-skill/releases/tag/v1.0.0
