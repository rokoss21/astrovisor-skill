# AstroVisor Skill

[![npm version](https://img.shields.io/npm/v/astrovisor-skill.svg)](https://www.npmjs.com/package/astrovisor-skill)
[![CI](https://github.com/rokoss21/astrovisor-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/rokoss21/astrovisor-skill/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

AstroVisor Skill is a reusable Agent Skill for personal astrology workflows. It
teaches Codex, ChatGPT desktop, and Claude how to collect reliable birth data,
maintain private Markdown profiles, discover the correct AstroVisor API operation,
build a schema-valid request, and interpret the returned calculation responsibly.

The skill is the workflow layer. It uses
[AstroVisor MCP](https://github.com/rokoss21/astrovisor-mcp) as the calculation and
API-access layer.

> [!IMPORTANT]
> The skill does not provide anonymous access to AstroVisor calculations. You need
> a personal AstroVisor API key beginning with `pk-`. Create an account and get
> your key at [astrovisor.io](https://astrovisor.io/). During setup, the skill can
> ask for the key and save it in a private local configuration without placing it
> in `SKILL.md`, people profiles, generated client configuration, or Git.

### Configure the API key in three steps

1. Create an account and obtain a `pk-...` key at
   [astrovisor.io](https://astrovisor.io/).
2. Enter it in the hidden terminal prompt:

   ```bash
   node "$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs" \
     config set-key
   ```

3. Verify the saved credential and MCP connection:

   ```bash
   node "$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs" \
     doctor --json
   ```

If you prefer guided setup, ask the agent:

```text
Use $astrovisor. Help me securely configure my AstroVisor API key, ask me only
for actions you need, keep the key out of chat and generated configuration, then
run the connection diagnostics.
```

The agent will check the installation, offer the private storage option, direct
you to the hidden key prompt, and verify the result. Do not paste a real key into
the conversation unless you intentionally want the agent to handle it for the
current session.

```text
User conversation
    ↓
AstroVisor Skill
profiles · onboarding · consent · request construction · interpretation
    ↓
AstroVisor MCP
live OpenAPI discovery · authentication · API calls · result retrieval
    ↓
AstroVisor API
astrological and related calculation engines
```

## Why a separate skill?

MCP exposes tools. A skill defines how an AI should use those tools safely and
consistently.

AstroVisor Skill adds:

- secure, interactive API-key onboarding;
- one private Markdown file per person;
- exact, approximate, ranged, and unknown birth-time handling;
- progressive profile enrichment without turning guesses into facts;
- live OpenAPI discovery before every unfamiliar calculation;
- exact `operationId`, `path`, `query`, and `body` construction;
- isolated multi-person payloads and relationship-consent checks;
- compact result storage and targeted follow-up retrieval;
- interpretation boundaries for sensitive and high-stakes topics.

The MCP server remains independently usable by generic MCP clients. See
[AstroVisor MCP](https://github.com/rokoss21/astrovisor-mcp) for transport,
tool, self-hosting, and protocol documentation.

## Supported clients

| Client | Skill location | MCP connection |
| --- | --- | --- |
| Codex CLI / IDE / ChatGPT desktop | `~/.agents/skills/astrovisor` | stdio launcher or Streamable HTTP |
| Claude Code | `~/.claude/skills/astrovisor` | stdio launcher or Streamable HTTP |
| Claude Desktop | Claude Code skill is optional | stdio MCP configuration |
| Other MCP clients | Client-specific | Streamable HTTP or `astrovisor-mcp` stdio |

Requirements:

- Node.js 20 or newer;
- an AstroVisor dashboard API key beginning with `pk-`;
- an MCP-capable client for calculations.

## Quick start

### 1. Install the skill

Install for Codex and Claude Code:

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target both
```

Install only for Codex:

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target codex
```

Install only for Claude Code:

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target claude
```

The installer makes recoverable backups when `--force` is used. Codex and Claude
copies share one private configuration and profile directory.

### 2. Save the API key

Use the hidden interactive prompt:

```bash
node "$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs" \
  config set-key
```

The default private file is:

```text
macOS/Linux: ~/.config/astrovisor/skill.env
Windows:     %APPDATA%\AstroVisor\skill.env
```

The key is masked in status output and omitted from generated client
configuration. Entering it in the terminal is safer than pasting it into a chat.

### 3. Generate MCP configuration

Codex:

```bash
node "$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs" \
  client-config codex
```

Claude Code:

```bash
node "$HOME/.claude/skills/astrovisor/scripts/astrovisor-skill.mjs" \
  client-config claude-code
```

Claude Desktop:

```bash
node "$HOME/.claude/skills/astrovisor/scripts/astrovisor-skill.mjs" \
  client-config claude-desktop
```

Apply the generated configuration and restart the client when it asks you to.

### 4. Verify

```bash
node "$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs" \
  doctor --json
```

A healthy remote connection reports the MCP version, 456 current OpenAPI
operations, and six compact tools. The operation count may increase as the API
grows.

### 5. Ask naturally

Codex:

```text
Use $astrovisor. Check my profile, ask only for missing birth data, and calculate
my natal chart.
```

Claude Code:

```text
/astrovisor Create separate profiles for me and my partner, confirm the data
needed for synastry, and use the live AstroVisor schema.
```

The skill can also activate implicitly when a request matches its description.

## Installation options

### User scope

User scope makes the skill available in every project:

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target both --scope user
```

Destinations:

- Codex: `~/.agents/skills/astrovisor`;
- Claude Code: `~/.claude/skills/astrovisor`.

### Project scope

Use project scope when a team wants a pinned, reviewable copy:

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target both --scope project \
  --project-dir /path/to/project
```

Destinations:

- `.agents/skills/astrovisor`;
- `.claude/skills/astrovisor`.

Do not commit profiles or API keys. The installer adds a defensive `.gitignore`
inside each installed skill.

### Install from Git

```bash
git clone https://github.com/rokoss21/astrovisor-skill.git
cd astrovisor-skill
node astrovisor/scripts/astrovisor-skill.mjs install --target both
```

### Update

```bash
npx --yes --package=astrovisor-skill@1.0.1 -- \
  astrovisor-skill install --target both --force
```

The previous installation is moved to the private
`~/.config/astrovisor/install-backups/` directory. Private profiles and the
recommended external `skill.env` are not replaced.

## Codex and ChatGPT desktop

Codex discovers user skills in `~/.agents/skills` and repository skills in
`.agents/skills`. Codex CLI, the IDE extension, and ChatGPT desktop share Codex MCP
configuration on the same host.

The recommended configuration uses the skill's stdio launcher:

```toml
[mcp_servers.astrovisor]
command = "node"
args = ["/absolute/path/to/astrovisor/scripts/astrovisor-mcp-launcher.mjs"]
startup_timeout_sec = 30
tool_timeout_sec = 120
```

The launcher reads the private key at runtime and starts the pinned
[`astrovisor-mcp`](https://www.npmjs.com/package/astrovisor-mcp) package. No key is
written to `config.toml`.

Direct remote HTTP is also supported when the environment variable is available to
the Codex host:

```toml
[mcp_servers.astrovisor]
url = "https://mcp.astrovisor.io/"
bearer_token_env_var = "ASTROVISOR_API_KEY"
```

Verify with `codex mcp list` or `/mcp`. Invoke explicitly with `$astrovisor`.

Official documentation:
[Codex skills](https://learn.chatgpt.com/docs/build-skills) and
[Codex MCP](https://learn.chatgpt.com/docs/extend/mcp).

## Claude Code

Claude Code discovers personal skills in `~/.claude/skills` and project skills in
`.claude/skills`.

The generated stdio command has this form:

```bash
claude mcp add --transport stdio --scope user astrovisor -- \
  node /absolute/path/to/astrovisor/scripts/astrovisor-mcp-launcher.mjs
```

Verify:

```bash
claude mcp get astrovisor
claude mcp list
```

Inside Claude Code, use `/mcp` to inspect the connection and `/astrovisor` to
invoke the skill.

Remote HTTP is the preferred transport for cloud-hosted MCP services, but a static
header can be persisted in Claude configuration. Use it only when that storage
model is acceptable:

```bash
claude mcp add --transport http --scope user astrovisor \
  https://mcp.astrovisor.io/ \
  --header "Authorization: Bearer pk-..."
```

The bundled stdio launcher is recommended for personal use because it keeps the
key out of shell history and client configuration.

Official documentation:
[Claude Code skills](https://code.claude.com/docs/en/slash-commands) and
[Claude Code MCP](https://code.claude.com/docs/en/mcp).

## Claude Desktop

Claude Desktop can run the private stdio launcher without installing the skill
for Claude Code. Generate a configuration or add:

```json
{
  "mcpServers": {
    "astrovisor": {
      "command": "node",
      "args": [
        "/absolute/path/to/astrovisor/scripts/astrovisor-mcp-launcher.mjs"
      ]
    }
  }
}
```

Restart Claude Desktop after changing `claude_desktop_config.json`.

## Private people profiles

Profiles live outside the installed skill by default:

```text
~/.config/astrovisor/profiles/
```

Each person has one Markdown file with structured YAML frontmatter and narrative
sections. This makes the data readable, portable, diffable when intentionally
versioned in a private store, and easy for an AI to update safely.

The schema supports:

- display, preferred, legal, birth, and numerology names;
- aliases, pronouns, gender fields, language, and relationship identifiers;
- birth date, time, time accuracy/range, place, coordinates, and IANA timezone;
- birth-certificate provenance and rectification candidates;
- current location separately from birthplace;
- tropical/sidereal, house-system, ayanamsa, and system preferences;
- goals, focus areas, sensitive topics, avoided topics, and privacy boundaries;
- consent for storage, relationship comparisons, and rectification;
- work, education, family, relationships, worldview, and health context;
- dated life events, prior calculation notes, candidate facts, and an update log.

Create the default profile interactively:

```bash
SKILL="$HOME/.agents/skills/astrovisor/scripts/astrovisor-skill.mjs"
node "$SKILL" profile create me --interactive --default
```

Create another person:

```bash
node "$SKILL" profile create partner --interactive
node "$SKILL" profile create mother --set 'display_name=Anna'
```

Inspect and validate:

```bash
node "$SKILL" profile list --json
node "$SKILL" profile show me --json
node "$SKILL" profile validate me --json
node "$SKILL" profile resolve Anna --json
```

Update deterministic fields:

```bash
node "$SKILL" profile set me \
  --set 'birth_time_accuracy=exact' \
  --set 'focus_areas=["relationships","career"]'
```

Render normalized request seeds:

```bash
node "$SKILL" profile render me --format core
node "$SKILL" profile render me --format birth
```

### Progressive enrichment

The profile update policy controls what the AI may save:

| Policy | Behavior |
| --- | --- |
| `ask` | Propose exact changes and save only after confirmation. This is the default. |
| `auto-explicit` | Save unambiguous facts the user explicitly states, then report the changes. |
| `off` | Use conversation data only for the current task. |

Configure it:

```bash
node "$SKILL" config set \
  --set ASTROVISOR_PROFILE_UPDATE_POLICY=auto-explicit
```

Inferences never become confirmed profile fields. Potentially useful hypotheses
remain labeled candidates until the user confirms them.

### Unknown birth time

Unknown time is stored as:

```yaml
birth_time: ""
birth_time_accuracy: "unknown"
```

The skill never silently substitutes `12:00`. It explains which calculations are
time-sensitive and selects an honest alternative or rectification workflow.

## How API requests are constructed

The skill never guesses endpoint shapes. For each unfamiliar calculation it
requires the AI to:

1. call `astrovisor_openapi_search` or `astrovisor_openapi_list`;
2. select an operation by purpose, method, path, summary, and tags;
3. call `astrovisor_openapi_get`;
4. read the canonical `operationId`, parameters, request schema, required fields,
   and live example;
5. validate each selected profile against those fields;
6. place values in the exact `path`, `query`, and `body` locations;
7. call `astrovisor_request`;
8. use `astrovisor_result_get` for narrow follow-up retrieval.

The MCP envelope is:

```json
{
  "operationId": "<canonical operation id>",
  "path": {},
  "query": {},
  "body": {},
  "response": {
    "view": "compact",
    "tokenBudget": 12000,
    "store": true
  }
}
```

For multiple people, each profile is loaded and validated independently, then
mapped to the exact nested fields returned by the live schema. One person's
coordinates, timezone, or consent are never silently reused for another.

See
[`astrovisor/references/request-contract.md`](astrovisor/references/request-contract.md)
for the complete contract.

## Configuration

Supported environment variables:

| Variable | Purpose |
| --- | --- |
| `ASTROVISOR_API_KEY` | Runtime API key; highest precedence |
| `ASTROVISOR_URL` | API base URL; defaults to `https://astrovisor.io` |
| `ASTROVISOR_MCP_URL` | Remote MCP URL; defaults to `https://mcp.astrovisor.io/` |
| `ASTROVISOR_SKILL_HOME` | Private configuration root |
| `ASTROVISOR_SKILL_ENV` | Custom private environment file |
| `ASTROVISOR_PROFILE_DIR` | Profile directory override |
| `ASTROVISOR_DEFAULT_PROFILE` | Default profile id |
| `ASTROVISOR_PROFILE_UPDATE_POLICY` | `ask`, `auto-explicit`, or `off` |
| `ASTROVISOR_MCP_PACKAGE` | Override the stdio MCP npm package specification |

Configuration precedence:

1. process environment;
2. `ASTROVISOR_SKILL_ENV`;
3. private `skill.env`;
4. installed skill `.env`;
5. safe defaults.

## Privacy and safety

- Never commit an API key or private profile.
- Prefer the hidden `config set-key` prompt.
- Keep third-party profiles only with appropriate consent.
- Ask before saving sensitive or inferred information.
- Keep user-confirmed facts separate from AI-derived observations.
- Treat astrology and divination as reflective or entertainment-oriented
  material, not scientific certainty.
- Do not turn results into medical, legal, financial, or safety advice.
- Avoid deterministic claims about illness, death, pregnancy, crime, fidelity,
  or another person's hidden intentions.

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## Troubleshooting

### `doctor` reports a missing key

Run `config set-key` or export `ASTROVISOR_API_KEY`.

### `doctor` reports an invalid key

The key is present but the server rejected it. Generate or rotate a dashboard key,
then save the replacement. Do not repeatedly paste it into chat.

### MCP starts but exposes no tools

Run:

```bash
node "$SKILL" doctor --json
```

Then inspect `/mcp`, `codex mcp list`, or `claude mcp list`. A normal compact
connection exposes six tools.

### The AI proposes the wrong request fields

Ask it to show the canonical operation id and the relevant
`astrovisor_openapi_get` metadata. The skill explicitly prohibits calling an
unfamiliar operation before reading that metadata.

### A result is too large

Use `view: "compact"`, `store: true`, and a smaller `tokenBudget`, then retrieve a
specific path with `astrovisor_result_get`.

## Development and validation

```bash
git clone https://github.com/rokoss21/astrovisor-skill.git
cd astrovisor-skill
npm ci
npm test
npm pack --dry-run
```

The tests cover:

- private configuration and masked credentials;
- maximum-fields Markdown profiles;
- validation and request rendering;
- isolated multi-person data;
- progressive updates and alias resolution;
- unknown-time safety;
- Codex and Claude installations;
- secret-free client configuration;
- private POSIX file modes.

## Project structure

```text
astrovisor-skill/
├── README.md
├── package.json
└── astrovisor/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── assets/
    ├── references/
    └── scripts/
```

The repository-level README is for people. `astrovisor/SKILL.md` is the concise
runtime instruction set loaded by AI clients. Detailed material stays in
`references/` for progressive disclosure.

## Related projects

- [AstroVisor MCP](https://github.com/rokoss21/astrovisor-mcp) — stdio and
  Streamable HTTP server with live OpenAPI discovery.
- [AstroVisor](https://astrovisor.io) — API, dashboard, and product.

## License

[MIT](LICENSE)
