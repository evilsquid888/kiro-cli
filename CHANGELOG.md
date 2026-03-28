# Changelog — QA & Bug Fix Log

## QA Cycle 1 — Fact-Check Against Official Kiro Docs (2026-03-28)

Cross-referenced all tutorial sections against https://kiro.dev/docs/ official documentation.

### Bugs Found & Fixed

| # | Section | Bug | Fix |
|---|---------|-----|-----|
| 1 | hooks-deep-dive | Stated Kiro has "5 events" with wrong names (agentSpawn, userPromptSubmit, etc.) | Fixed to 10 trigger types per official docs: Prompt Submit, Agent Stop, Pre/Post Tool Use, File Create/Save/Delete, Pre/Post Task Execution, Manual Trigger |
| 2 | hooks-deep-dive | Kiro hook capabilities listed CLI-style agent JSON events | Replaced with official event names (Prompt Submit, Agent Stop, etc.) and added tool name filter categories (@mcp, @powers, @builtin) |
| 3 | mcp-tools | MCP config path listed as `.kiro/mcp.json` | Fixed to `.kiro/settings/mcp.json` (workspace) and `~/.kiro/settings/mcp.json` (user-level) per official docs |
| 4 | mcp-tools | Showed `kiro-cli mcp add/list/status` CLI commands | Replaced with Command Palette instructions per official docs |
| 5 | mcp-tools | Showed `kiro-cli powers install stripe` CLI command | Fixed: Powers are one-click install from Kiro panel or kiro.dev, not CLI commands |
| 6 | mcp-tools | Missing remote server URL config format | Added `url` + `headers` config for remote/streamable HTTP servers |
| 7 | mcp-tools | Missing `autoApprove` and `disabledTools` MCP config fields | Added both fields to config example |
| 8 | mcp-tools | Powers description was superficial | Updated with POWER.md, dynamic activation, and official launch partners list |
| 9 | config-compared | Said Claude Code has no conditional loading | Fixed: Claude Code has path-scoped CLAUDE.md files per directory |
| 10 | config-compared | Only showed 3 inclusion modes (always, fileMatch, manual) | Added 4th mode: `auto` (LLM-evaluated matching based on description field) |
| 11 | config-compared | Kiro file hierarchy missing `product.md` | Added product.md as foundational file alongside tech.md and structure.md |
| 12 | spec-driven | Said "Four Phases" (Requirements, Design, Tasks, Execute) | Fixed to "Three Phases" per official docs — Execute is not a separate phase |
| 13 | spec-driven | Missing workflow variants and bugfix specs | Added Requirements-First vs Design-First variants and Bugfix Specs note |
| 14 | steering (SECTIONS2) | Missing inclusion modes section entirely | Added full Inclusion Modes table with all 4 modes and fileMatch example |
| 15 | steering (SECTIONS2) | Missing file references syntax | Added `#[[file:<path>]]` syntax per official docs |
| 16 | steering (SECTIONS2) | AGENTS.md note incomplete | Added note that AGENTS.md files don't support inclusion modes |

### Sources Verified
- https://kiro.dev/docs/hooks/ and /hooks/types/ and /hooks/actions/
- https://kiro.dev/docs/mcp/ and /mcp/configuration/
- https://kiro.dev/docs/steering/
- https://kiro.dev/docs/specs/ and /specs/feature-specs/ and /specs/bugfix-specs/
- https://kiro.dev/docs/skills/
- https://kiro.dev/docs/powers/

---

## QA Cycle 2 — Section Intros, Source Credits & Remaining Fixes (2026-03-28)

Improved all section introductions for better user engagement and added source attribution.

### Changes Made

| # | Section | Change Type | Description |
|---|---------|-------------|-------------|
| 1 | philosophy | Intro improved | Added context about the AI tool landscape split and purpose of the section |
| 2 | skills-portability | Intro improved | Added narrative about the shared standard and what the section covers |
| 3 | hooks-deep-dive | Intro improved | Added concrete examples of what hooks do and the 10 vs 4 event count |
| 4 | config-compared | Intro improved | Added framing about teaching AI and migration use case |
| 5 | mcp-tools | Intro improved | Added framing about tools as capabilities and daily workflow impact |
| 6 | steering (SECTIONS2) | Intro improved | Added "project README your AI actually reads" analogy |
| 7 | spec-driven (SECTIONS3) | Intro improved | Added rationale about why jumping to code fails |
| 8 | agents-config (SECTIONS2) | Intro improved | Added description of agent use cases (security reviewer, deployer, etc.) |
| 9 | comparison (SECTIONS3) | Intro improved | Added framing about not relearning everything |
| 10 | All SECTIONS4 | Source credits | Added source attribution footer to all 5 research sections |

### Additional Bug Found & Fixed

| # | Section | Bug | Fix |
|---|---------|-----|-----|
| 17 | config-compared | `auto` inclusion mode example was missing from the inline examples | Added `auto` mode with `name:` and `description:` fields in the SECTIONS4 code sample |

---

## QA Cycle 3 — Final Verification & Polish (2026-03-28)

Final pass: re-verified all sections against official docs, fixed remaining inaccuracies, validated JS syntax.

### Bugs Found & Fixed

| # | Section | Bug | Fix |
|---|---------|-----|-----|
| 18 | skills-portability | SKILL.md example showed `allowed-tools: Read, Grep, Glob` — not an official frontmatter field | Replaced with official fields: `license`, `metadata` (author, version). Added note listing all official fields: name, description, license, compatibility, metadata |
| 19 | hooks-deep-dive | Section header said "Kiro CLI Hooks" and only described agent JSON config | Changed to "Kiro Hooks" and added note about Kiro panel UI and Command Palette (`Kiro: Open Kiro Hook UI`) as primary config methods |
| 20 | comparison | "Hooks/automation" row said "N/A" for Claude Code | Fixed: Claude Code has hooks in settings.json (4 events) |
| 21 | comparison | Missing context providers row | Added `#codebase`, `#file`, `#git diff`, `#terminal`, `#url`, `#spec` etc. as Kiro IDE features |
| 22 | comparison | Missing execution modes row | Added Autopilot (autonomous) vs Supervised (approval at each step) per official docs |
| 23 | skills-portability | Missing Skills vs Steering vs Powers distinction | Added comparison table from official docs showing when to use each mechanism |

### Validation Checks
- JS syntax: `node -c data.js` — PASS
- Section count: 23 sections with unique IDs — PASS
- All SECTIONS4 sections have source credit footers — PASS
- All inclusion modes documented (always, fileMatch, manual, auto) — PASS
- MCP config path correct (`.kiro/settings/mcp.json`) — PASS
- Hook trigger types match official docs (10 types) — PASS
- Spec phases match official docs (3 phases) — PASS
- SKILL.md frontmatter fields match official docs — PASS

### Sources Re-Verified
- https://kiro.dev/docs/hooks/types/ — 10 trigger types confirmed
- https://kiro.dev/docs/mcp/configuration/ — `.kiro/settings/mcp.json` confirmed
- https://kiro.dev/docs/skills/ — frontmatter fields confirmed (name, description, license, compatibility, metadata)
- https://kiro.dev/docs/steering/ — 4 inclusion modes confirmed (always, fileMatch, manual, auto)
- https://kiro.dev/docs/powers/ — POWER.md + dynamic activation + one-click install confirmed
- https://kiro.dev/docs/privacy-and-security/ — Autopilot vs Supervised modes confirmed
- https://kiro.dev/docs/chat/ — context providers (`#codebase`, `#file`, etc.) confirmed

---
