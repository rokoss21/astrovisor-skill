# Contributing

Contributions are welcome through focused pull requests.

## Development

Requirements:

- Node.js 20 or newer;
- npm 10 or newer;
- Python 3 for optional Agent Skill validation.

Run the local checks:

```bash
npm ci
npm test
npm pack --dry-run
```

If OpenAI's `skill-creator` is installed, also run:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py astrovisor
```

## Change guidelines

- Keep `astrovisor/SKILL.md` concise and imperative.
- Put detailed schemas and workflows in `astrovisor/references/`.
- Add deterministic behavior to scripts instead of relying on prompt wording.
- Never add real API keys, personal profiles, or production response data.
- Preserve unknown birth times as unknown; never introduce a silent noon
  fallback.
- Update tests and `CHANGELOG.md` for user-visible changes.

