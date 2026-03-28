# Claude Code vs. Kiro: two philosophies of AI-assisted development

**Claude Code and Kiro represent fundamentally different approaches to AI coding assistance**, despite both running on Anthropic's Claude models. Claude Code is a CLI-first, minimal-ceremony tool that treats AI as a co-developer adapting to your workflow. Kiro, Amazon's spec-driven IDE and CLI, enforces structured planning before code generation — transforming vague prompts into formal requirements, designs, and task lists. The two tools are increasingly complementary rather than competitive: developers use Kiro for architecture and planning, then Claude Code for rapid execution, with **skills fully portable between both** thanks to the shared agentskills.io open standard.

---

## Claude Code's skills system turns instructions into reusable expertise

Claude Code's skills system packages domain-specific knowledge into modular **SKILL.md files** — markdown documents with YAML frontmatter stored in `.claude/skills/<skill-name>/SKILL.md`. Each skill directory can optionally include `scripts/` (executable code), `references/` (supplemental docs), and `assets/` (templates, images, fonts). Skills exist at two levels: **project-level** (`.claude/skills/`, committed to version control) and **personal** (`~/.claude/skills/`, available across all projects).

The architecture uses **three-level progressive disclosure** to manage context efficiently. At startup, only skill metadata (name and description, ~100 tokens each) loads into the system prompt. When Claude's LLM determines a skill matches the user's request, it loads the full SKILL.md body (<5,000 tokens). Only when SKILL.md explicitly references additional files do scripts and references enter context. This means dozens of skills can be installed with negligible overhead.

Skills trigger through **pure LLM reasoning** — no keyword matching or classifiers. Claude reads the `description` field from each skill's frontmatter and decides which to activate based on the conversation. Users can also invoke skills directly as `/skill-name` slash commands. Two frontmatter flags control invocation: `disable-model-invocation: true` restricts a skill to user-only activation (useful for deployment or commits), while `user-invocable: false` makes a skill invisible to users but available for Claude's autonomous use.

A typical SKILL.md looks like this:

```yaml
---
name: security-review
description: Analyzes code for security vulnerabilities. Use when reviewing 
  code for security, before deployment, or when the user mentions audit.
allowed-tools: Read, Grep, Glob
context: fork
---
# Security Review
When reviewing code for security:
1. Check for injection vulnerabilities (SQL, XSS, command injection)
2. Verify authentication/authorization patterns
3. Look for exposed secrets or hardcoded credentials
```

Anthropic ships several built-in skills including **docx**, **xlsx**, **pptx**, and **pdf** generation, plus community skills covering frontend design (277,000+ installs), code review, commit formatting, and penetration testing. Advanced features include dynamic context injection (`!`command`` syntax runs shell commands inline), extended thinking triggers, and the ability to override the model or spawn forked sub-agent contexts.

---

## Kiro brings spec-driven development from Amazon's playbook

Kiro (pronounced "keer-oh") launched in **July 2025** at AWS Summit NYC, built by a team under Deepak Singh, VP of Developer Experience and Agents at Amazon. Its tagline — "from vibe coding to viable code" — targets the growing problem of undocumented, unmaintainable AI-generated code. Kiro is a full **VS Code fork IDE plus a standalone CLI** (available since November 17, 2025, as the successor to Amazon Q Developer CLI). It runs on **Claude models via AWS Bedrock**, supporting everything from Haiku 4.5 to Opus 4.6.

Kiro operates in two modes. **Vibe mode** works like traditional AI chat — type a prompt, get code. **Spec mode** is the differentiator: it transforms natural language descriptions into three structured artifacts before writing any code.

The **spec-driven development workflow** follows three phases:

**Phase 1 — Requirements.** The developer describes a feature in natural language ("Build a REST API for blog posts with authentication"). Kiro generates `requirements.md` containing user stories with acceptance criteria using **EARS notation** (Easy Approach to Requirements Syntax). For bugs, it produces `bugfix.md` with current behavior, expected behavior, and unchanged behavior analysis.

**Phase 2 — Design.** Once requirements are approved, Kiro analyzes the existing codebase and generates `design.md` with technical architecture, sequence diagrams, component design, interface definitions, and testing strategy. Feature specs support two workflow variants: requirements-first or design-first.

**Phase 3 — Tasks.** Kiro creates `tasks.md` with discrete, dependency-ordered implementation tasks. Each task is a concrete unit of work with clear outcomes. Developers can execute tasks individually or queue them all. The agent writes code, creates tests, and generates documentation for each task, updating status in real-time.

All three files are **plain markdown**, version-controlled, and human-editable. This is the key architectural insight: specs serve as "version-controlled super prompts" that persist across sessions, unlike chat history that gets lost. If requirements change, editing `requirements.md` triggers Kiro to create new tasks and update code accordingly.

The Thoughtworks analysis offers a useful caveat: for small bugs, spec-driven development can feel like "using a sledgehammer to crack a nut," generating four user stories with sixteen acceptance criteria for a simple fix. **Specs add the most value for complex features, costly bug fixes, and team collaboration** where documentation and traceability matter.

---

## Both CLIs offer powerful but distinct terminal workflows

Claude Code is installed via `npm install -g @anthropic-ai/claude-code` and launched with `claude` in any project directory. Its CLI is deliberately minimal. The `-p` flag enables headless mode for scripting and CI/CD pipelines (`claude -p "fix any linting errors"`), and it integrates with Unix pipes (`cat data.csv | claude -p "analyze this"`). Key interactive commands include `/compact` (compress context), `/commit` (git integration), `/model` (switch models), and `/add-dir` (multi-repo support).

Kiro CLI installs with `curl -fsSL https://cli.kiro.dev/install | bash` and runs as `kiro-cli`. It preserves backward compatibility with Amazon Q Developer CLI's `q` command. Authentication supports AWS Builder ID, IAM Identity Center, and social login (Google, GitHub). Unique capabilities include `kiro-cli translate` for natural-language-to-shell-command conversion, `kiro-cli agent` commands for managing custom agents, and a `/plan` slash command that switches to a dedicated planning agent for task decomposition.

Both tools support MCP (Model Context Protocol) integration, inline shell execution via `!command`, session management, and model switching. The **key operational difference** is that Claude Code focuses on raw terminal power — piping, scripting, headless automation — while Kiro CLI emphasizes agent orchestration and structured workflows with its custom agent system and steering files.

| Capability | Claude Code CLI | Kiro CLI |
|---|---|---|
| Headless/scripted mode | `claude -p "prompt"` | `kiro-cli chat --no-interactive` |
| Unix pipe integration | Full stdin/stdout support | Limited |
| Custom agents | Sub-agents via skills | First-class agent system with JSON configs |
| Natural language → shell | Via conversation | Dedicated `translate` command |
| Session persistence | Automatic | Manual save/load + resume picker |
| Spec-driven workflow | Via community plugins | Native |

---

## Hooks reveal the philosophical split between the tools

Both tools offer event-driven automation, but their hooks systems reflect deep architectural differences. Claude Code provides **15–21 lifecycle events** with **four handler types** (shell command, LLM prompt, sub-agent, HTTP endpoint). Kiro offers **10 IDE events** and **5 CLI events** with **two handler types** (shell command and agent prompt).

Claude Code hooks live in JSON settings files at four levels (global, project, local, enterprise-managed) and are **security-snapshotted at session start** — mid-session edits have no effect. Configuration uses regex matchers against tool names:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit|MultiEdit",
      "hooks": [{ "type": "command", "command": "bun run format || true" }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "prompt",
        "prompt": "Analyze: $ARGUMENTS. Are all tasks complete?"
      }]
    }]
  }
}
```

Kiro hooks are stored as individual `.kiro.hook` files in `.kiro/hooks/` and can be created through natural language, a visual form in the IDE, or direct file editing. Kiro uniquely supports **file system events** (save, create, delete) as first-class triggers and **spec task events** (pre/post task execution) tied to its spec-driven workflow.

The fundamental difference: **Claude Code hooks emphasize deterministic enforcement** with granular control (tool input rewriting, permission decisions, async execution, HTTP webhooks). **Kiro hooks emphasize AI-first automation** where the default action is "ask the agent," making hooks more accessible but less predictable. Claude Code's prompt and agent hook types bridge this gap by offering LLM-based verification alongside deterministic shell commands.

---

## Skills transfer freely between both tools via a shared standard

The **agentskills.io open standard** makes SKILL.md files directly portable between Claude Code and Kiro with zero format changes. Migration is literally a file copy:

```bash
cp -r .claude/skills/my-skill .kiro/skills/
```

Both tools use identical directory structures (SKILL.md plus optional scripts/, references/, assets/ subdirectories), the same YAML frontmatter format, and the same progressive disclosure pattern. The standard also extends to Cursor, Gemini CLI, Codex CLI, GitHub Copilot, and other tools.

The **main migration effort** involves converting Claude Code's monolithic `CLAUDE.md` to Kiro's modular steering system. Kiro stores steering files in `.kiro/steering/` with three inclusion modes: `always` (equivalent to CLAUDE.md), `fileMatch` (loaded only for specific file patterns like `components/**/*.tsx`), and `manual` (referenced via `#name` in chat). Kiro auto-generates foundational files — `product.md`, `tech.md`, `structure.md` — that have no direct Claude Code equivalent.

Community tools actively bridge the remaining gaps. **cc-sdd** brings Kiro's spec-driven workflow to Claude Code via slash commands (`/kiro:spec-init`, `/kiro:spec-requirements`). **claude-kiro** is a Python tool implementing Kiro's methodology as Claude Code commands. These tools demonstrate a growing pattern: **developers increasingly use both tools in tandem** — Kiro for planning and specification, Claude Code for rapid execution and terminal-native workflows.

---

## Conclusion

Claude Code and Kiro are converging from opposite directions. Claude Code starts with maximum power and minimal structure, relying on skills to progressively add specialized expertise. Kiro starts with maximum structure and uses vibe mode to selectively remove it. The **agentskills.io standard** has made the skills layer fully interoperable, reducing tool lock-in to configuration differences rather than fundamental incompatibilities. The most productive workflow emerging among developers combines both: Kiro's spec-driven planning to define what to build, then Claude Code's raw terminal power to build it fast. The tools' hooks systems remain the most architecturally distinct feature — Claude Code offering deeper lifecycle control with four handler types and 15+ events, Kiro offering tighter integration with its spec workflow and more accessible AI-first automation. For teams choosing one tool, **Claude Code suits developers who want flexibility and terminal-native power**, while **Kiro suits teams that need documentation, traceability, and structured planning as first-class development artifacts**.