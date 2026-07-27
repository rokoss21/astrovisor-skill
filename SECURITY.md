# Security

## Supported versions

Security fixes are provided for the latest published major version.

## Report a vulnerability

Do not open a public issue for a credential leak or exploitable vulnerability.
Use GitHub's private vulnerability reporting for
[`rokoss21/astrovisor-skill`](https://github.com/rokoss21/astrovisor-skill/security/advisories/new).

Include the affected version, reproduction steps, impact, and any suggested
mitigation. Do not include real AstroVisor API keys or private profile contents.

## Credential model

- Store API keys in the private skill configuration or a process environment
  variable.
- Never commit `skill.env`, `.env`, or people profiles.
- Generated client configurations do not contain the API key when using the
  bundled stdio launcher.
- Rotate a key immediately if it appears in chat, logs, shell history, or Git.

