# Kiro CLI vs Claude Code — Deep Technical Reference (2026)

> Side-by-side mapping of every major feature: config files, slash commands, agents, skills, tools, hooks, MCP, and more.

---

## 1. Project Configuration Files

### The "memory / rules" file

Both tools use markdown files to give the AI persistent knowledge about your project. The design philosophy differs significantly.

**Claude Code → `CLAUDE.md`**

A single file, auto-loaded at startup. Hierarchy:

```
~/.claude/CLAUDE.md              # Global (all projects)
/repo/CLAUDE.md                  # Project root (git-managed, team-shared)
/repo/CLAUDE.local.md            # Project personal (.gitignore recommended)
/repo/subdir/CLAUDE.md           # Sub-directory (auto-loaded when cwd is that dir)
```

Modular rules extension (recent addition):

```
/repo/.claude/rules/
    code-style.md
    security.md
    testing.md
```

Each `.claude/rules/*.md` file loads automatically. Keeps `CLAUDE.md` lean.

**Kiro CLI → `.kiro/steering/*.md`**

Multiple files, each focused on one domain. Hierarchy:

```
~/.kiro/steering/                # Global (all workspaces)
/repo/.kiro/steering/            # Workspace-level
```

Two built-in foundation files loaded in every session by default:

```
.kiro/steering/tech.md           # Tech stack, frameworks, constraints
.kiro/steering/structure.md      # File organization, naming conventions
```

You add as many custom files as you want:

```
.kiro/steering/api-design.md
.kiro/steering/security.md
.kiro/steering/testing.md
```

**Inclusion modes (Kiro-only)** — YAML frontmatter controls when a file loads:

```yaml
---
inclusion: always       # Default for foundation files
---
```

```yaml
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"   # Only loaded when editing test files
---
```

```yaml
---
inclusion: manual                  # Never auto-loaded; agent must reference it
---
```

**AGENTS.md standard (both tools)**

Both tools support `AGENTS.md` — an emerging open standard. Drop an `AGENTS.md` file at the workspace root or `~/.kiro/steering/` (Kiro) / `~/.claude/` (Claude Code) and it is always included. Kiro's AGENTS.md does not support inclusion modes.

---

### Feature comparison table

| Feature | Claude Code | Kiro CLI |
|---|---|---|
| Primary config file | `CLAUDE.md` | `.kiro/steering/*.md` |
| Global config | `~/.claude/CLAUDE.md` | `~/.kiro/steering/` |
| Workspace config | `/repo/CLAUDE.md` | `/repo/.kiro/steering/` |
| Personal overrides | `CLAUDE.local.md` | workspace overrides global |
| Modular rules | `.claude/rules/*.md` | each file IS a rule |
| AGENTS.md support | ✅ | ✅ |
| Conditional loading | ❌ | ✅ `fileMatch`, `always`, `manual` |
| Team MDM distribution | ❌ | ✅ push via MDM/Group Policy |

---

## 2. CLI Arguments & Launch Flags

### Claude Code — `claude` binary

```bash
# Core launch
claude                           # Start interactive session
claude "fix the login bug"       # One-shot prompt
claude -c                        # Continue most recent session
claude -r "session name"         # Resume session by name
claude --resume-picker           # Interactive session picker

# Model selection
claude --model opus              # Use Claude Opus
claude --model sonnet            # Use Claude Sonnet (default)
claude --model haiku             # Use Claude Haiku (fast/cheap)

# Permission modes
claude --dangerously-skip-permissions   # Trust everything (automation)
claude --trust-tools Read,Write         # Trust specific tools only

# Context injection
claude --add-dir ./docs          # Add extra directory to context
claude --system-prompt "You are a senior Go developer"
claude --system-prompt-file ./prompts/backend.md
claude --append-system-prompt "Focus only on security"

# Non-interactive / piping
claude -p "summarize this" < file.txt
cat error.log | claude -p "what's wrong?"
git diff | claude -p "write a commit message"
claude --no-interactive --output-format json "list all functions"

# Output formats
claude --output-format text      # Default
claude --output-format json      # Structured JSON output
claude --output-format stream-json  # Streaming JSON

# Headless / CI
claude --max-turns 5             # Limit agentic loop turns
```

### Kiro CLI — `kiro-cli` binary

```bash
# Core launch
kiro-cli                         # Start interactive chat
kiro-cli chat                    # Same as above
kiro-cli "fix the login bug"     # One-shot (via command router)

# Session management
kiro-cli chat --resume           # Resume previous session
kiro-cli chat --resume-picker    # Interactive session picker
kiro-cli chat --list-sessions    # Show all saved sessions
kiro-cli chat --delete-session <ID>

# Agent selection
kiro-cli --agent backend-specialist
kiro-cli chat --agent my-agent "explain the auth flow"

# Permission modes
kiro-cli chat --trust-all-tools       # Trust everything
kiro-cli chat --trust-tools read,write # Trust specific tools

# Non-interactive
kiro-cli chat --no-interactive "show current directory"
kiro-cli chat --no-interactive --trust-all-tools "run tests"

# Model selection
kiro-cli chat --list-models
kiro-cli chat --list-models --format json

# MCP control
kiro-cli chat --require-mcp-startup  # Fail if any MCP server down

# Natural language → shell command translation
kiro-cli translate "find all Python files modified last week"
kiro-cli translate -n 3 "compress logs older than 30 days"

# Management commands
kiro-cli agent list
kiro-cli agent create my-agent
kiro-cli agent edit my-agent
kiro-cli agent set-default my-agent
kiro-cli mcp add
kiro-cli mcp list
kiro-cli mcp status
kiro-cli settings
kiro-cli doctor
kiro-cli update
kiro-cli version
kiro-cli login --social github
kiro-cli login --license pro --identity-provider <URL> --region us-east-1
```

**Command router (Kiro v1.26.0+)** — unifies `kiro` to launch CLI or IDE:

```bash
kiro-cli integrations install kiro-command-router
kiro set-default cli     # kiro → launches CLI
kiro set-default ide     # kiro → launches IDE
kiro-ide                 # always IDE
kiro-cli                 # always CLI
```

---

## 3. Slash Commands (In-Session)

### Claude Code slash commands

**Context management:**

```
/compact                         # Compress conversation history
/compact focus on auth changes   # Compact with retention hint
/clear                           # Wipe conversation, keep CLAUDE.md
/reset                           # Alias for /clear
/context                         # Show context window usage grid
```

**Session:**

```
/init                            # Generate CLAUDE.md from codebase scan
/memory                          # Open CLAUDE.md editor
/resume                          # Resume a past session
/rename                          # Name current session (or auto-name it)
/fork                            # Branch conversation for safe experiments
/rewind                          # Roll back to previous state (like git revert)
/export                          # Export session as markdown
```

**Model & behavior:**

```
/model                           # Switch model interactively
/model opus                      # Switch to Opus
/model sonnet                    # Switch to Sonnet
/model haiku                     # Switch to Haiku
/fast                            # Toggle Fast Mode (speed-optimized Opus)
/plan                            # Enter Plan Mode (read-only, no edits)
/effort high                     # Set thinking effort level
/effort medium
/effort auto
```

**Keyboard shortcuts (instead of typing slash commands):**

```
Shift+Tab                        # Cycle: normal → auto-accept → plan mode
Option+T / Alt+T                 # Toggle extended thinking
Option+P / Alt+P                 # Quick model picker
Tab                              # Toggle thinking
Ctrl+C                           # Cancel current operation
Ctrl+R                           # Search session history
Esc Esc                          # Rewind last action
# text                           # Add quick memory note
@ path                           # File autocomplete / @-mention
! command                        # Run shell command directly
```

**Agents:**

```
/agents                          # List and manage sub-agents
```

**Tools & permissions:**

```
/permissions                     # Review & modify tool permissions
/hooks                           # Manage automation hooks
```

**Skills:**

```
/skill-name                      # Invoke a named skill directly
/review                          # Example skill invocation
```

**Utilities:**

```
/help                            # Command reference
/cost                            # Token usage (API users)
/stats                           # Usage stats (Pro/Max users)
/diff                            # Show pending changes
/todos                           # View active task list
/review                          # Trigger code review
/install-github-app              # Install Claude on GitHub for PR review
/doctor                          # Diagnose issues
/batch                           # Large-scale multi-file changes
/remote-control                  # Control session from browser
/insights                        # Session analytics
/extra-usage                     # Configure rate limit behavior
/loop / /schedule                # Schedule recurring tasks (cloud)
```

---

### Kiro CLI slash commands (in-session)

```
/agent create <name>             # Create a new custom agent (AI-assisted)
/agent create <name> --manual    # Create with editor (manual JSON)
/agent create <name> --from <template>   # Clone from existing agent
/agent swap                      # Switch to different agent mid-session
/agent generate                  # Alias for /agent create

/context add <path>              # Add file/directory to session context
/context clear                   # Clear session context

/mcp                             # Manage MCP servers

/editor                          # Open $EDITOR for multi-line prompt input
/help                            # Show command reference
/introspect                      # Ask Kiro about its own capabilities
```

**Kiro in-session prefix shortcuts:**

```
!command                         # Run shell command directly (same as Claude Code)
```

---

## 4. Skills / Custom Commands

### Claude Code Skills

Skills are the evolution of "custom commands." Both formats work; skills add more power.

**File structure:**

```
~/.claude/skills/                # Global skills (all projects)
.claude/skills/                  # Project skills
.claude/commands/                # Legacy commands (still work)
```

**Skill file format** (`.claude/skills/review-pr/SKILL.md`):

```markdown
---
name: review-pr
description: Review a pull request for bugs and security issues. Use when
             the user mentions PR, pull request, or asks to review code.
argument-hint: [pr-number]
allowed-tools: Read, Grep, Glob, Bash(git diff:*, gh pr diff:*)
model: sonnet
invocation: user        # 'user' = user must call /review-pr
                        # 'auto' = Claude auto-loads when relevant
---

Fetch the PR diff: `gh pr diff $ARGUMENTS`

Review the changes for:
1. Logic errors and bugs
2. Security vulnerabilities (injection, auth issues)
3. Missing error handling

Do NOT comment on style or naming. Output:
- **Critical** — must fix before merge
- **Important** — should fix
- **Minor** — optional improvements
```

**Invoke it:**

```
/review-pr 142
```

**Legacy command format** (`.claude/commands/deploy.md`):

```markdown
---
description: Deploy to staging
allowed-tools: Bash
argument-hint: [environment]
---

Run the deployment script for $ARGUMENTS environment:
!./scripts/deploy.sh $ARGUMENTS

Then verify the deployment:
!curl -s https://$ARGUMENTS.myapp.com/health
```

**Supporting files in a skill directory:**

```
.claude/skills/
  db-migrate/
    SKILL.md              # Instructions
    schema.sql            # Referenced by SKILL.md
    migration-guide.md    # Extra context
```

Reference them from SKILL.md: `See @schema.sql for the current schema.`

**Dynamic context injection in skills:**

```markdown
---
name: catchup
---

Read all changed files since main:
!`git diff main --name-only`

Summarize what changed and what I need to know to continue work.
```

---

### Kiro CLI Skills

Kiro uses `skill://` URI scheme in agent configs. A skill file has YAML frontmatter.

**File structure:**

```
~/.kiro/skills/               # Global skills
.kiro/skills/                 # Workspace skills
```

**Skill file format** (`.kiro/skills/dynamodb/SKILL.md`):

```markdown
---
name: dynamodb-data-modeling
description: Guide for DynamoDB data modeling best practices. Use when
             designing tables, access patterns, or GSIs.
---

## DynamoDB Data Modeling

### Access Pattern First
Design your table around your access patterns, not your entities.

### Single-Table Design
- Use a composite sort key: `PK=USER#<id>`, `SK=ORDER#<timestamp>`
- GSI for reverse lookups: `GSI1PK=ORDER#<id>`

### Key Naming Conventions
...
```

**Loading skills in an agent config:**

```json
{
  "resources": [
    "skill://.kiro/skills/**/SKILL.md"
  ]
}
```

Skills load lazily — only metadata at startup, full content on demand. This keeps context lean.

**Invoking skills directly:**

Within a Kiro session, you can reference skills by name or just ask naturally — the agent will load relevant skills automatically.

---

## 5. Custom Agents

### Claude Code Sub-agents

**Inline via Task tool (no config file needed):**

Claude Code can spawn subagents on the fly. In your prompt:

```
Build the auth module. Use a subagent to handle the database layer
separately so we don't pollute the main context.
```

Or orchestrate explicitly in a prompt:

```
Create three parallel subagents:
- Frontend subagent: implement the React components in src/components/
- Backend subagent: implement the Express routes in src/routes/
- Tests subagent: write tests for both after they finish
```

**Named sub-agents (config file):**

```
.claude/agents/
  backend.md
  frontend.md
  security-reviewer.md
```

`.claude/agents/backend.md`:

```markdown
---
name: backend
description: Expert in Node.js, Express, PostgreSQL. Use for all API
             and database work. Loads when user mentions "API", "route",
             "database", or "backend".
model: sonnet
allowed-tools: Read, Write, Bash, Grep
---

You are a backend specialist. Follow these conventions:
- All routes in src/routes/
- Use the logger from packages/api/src/logger.ts
- Always add input validation with Zod
- Write tests in __tests__/ next to the implementation
```

**Invoke a named subagent:**

```
/agents
# or
Use the backend agent to implement the user registration endpoint.
```

**Master-Clone architecture (no named agents):**

Give your main agent everything in `CLAUDE.md`, then let it delegate to copies of itself. Avoids context fragmentation.

---

### Kiro CLI Custom Agents

Agents are JSON config files. Each agent is a full configuration, not just a system prompt.

**Create an agent:**

```bash
# AI-assisted creation (recommended)
kiro-cli agent create backend-specialist

# Or from within a session:
/agent create backend-specialist -D "Backend coding specialist" -m code-analysis

# Manual (opens editor)
/agent create my-agent --manual

# Clone from existing
/agent create new-agent --from backend-specialist
```

**Agent config file** (`.kiro/agents/backend-specialist.json` or `~/.kiro/agents/`):

```json
{
  "name": "backend-specialist",
  "description": "Expert in Node.js, PostgreSQL, and AWS Lambda",
  "model": "claude-sonnet-4",
  "prompt": "You are a backend specialist. Always use async/await. Validate inputs with Zod. Write tests.",
  "tools": ["read", "write", "shell", "grep", "glob"],
  "allowedTools": ["read", "grep", "glob"],
  "resources": [
    "file://README.md",
    "file://.kiro/steering/tech.md",
    "file://.kiro/steering/api-design.md",
    "skill://.kiro/skills/dynamodb/SKILL.md"
  ],
  "toolsSettings": {
    "shell": {
      "allowedCommands": ["npm test", "npm run lint", "git status"],
      "deniedCommands": ["git push .*", "git commit .*"],
      "autoAllowReadonly": true
    },
    "read": {
      "allowedPaths": ["./src/**", "./tests/**"],
      "deniedPaths": ["./secrets/**"]
    }
  },
  "hooks": {
    "agentSpawn": [
      { "command": "git status" }
    ],
    "postToolUse": [
      { "matcher": "fs_write", "command": "npm run lint --fix" }
    ],
    "stop": [
      { "command": "npm test" }
    ]
  }
}
```

**Switch agents mid-session:**

```
/agent swap
# Interactive picker shows all available agents

# Or launch directly:
kiro-cli --agent backend-specialist
```

**Knowledge Base resource (for large doc sets):**

```json
{
  "resources": [
    {
      "type": "knowledgeBase",
      "source": "file://./docs",
      "name": "ProjectDocs",
      "description": "Project documentation and API specs",
      "indexType": "best",
      "autoUpdate": true
    }
  ]
}
```

Knowledge bases are vector-indexed — good for large doc directories.

**Delegate tasks between agents:**

```bash
# Within a session with agent A, delegate to agent B:
/delegate backend-specialist "implement the user auth endpoints"
```

---

## 6. Tools (Built-in)

### Claude Code built-in tools

| Tool | Description |
|---|---|
| `Read` | Read files, directories, images |
| `Write` | Create and edit files |
| `Bash` | Execute shell commands |
| `Glob` | File pattern matching |
| `Grep` | Regex content search |
| `WebSearch` | Search the web (native) |
| `WebFetch` | Fetch a URL |
| `Task` | Spawn a subagent |
| `TodoRead` | Read current task list |
| `TodoWrite` | Update task list |
| `NotebookRead` | Read Jupyter notebooks |
| `NotebookEdit` | Edit Jupyter notebooks |
| `ComputerUse` | Control the desktop (experimental) |

**Permission syntax in settings.json:**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(npm test:*)",
      "Read(**)",
      "Write(src/**)"
    ],
    "deny": [
      "Bash(git push:*)",
      "Bash(rm -rf:*)"
    ]
  }
}
```

**Bash tool scoping:**

```markdown
# In CLAUDE.md or a skill:
allowed-tools: Bash(git diff:*), Bash(npm run:*), Read, Grep
```

---

### Kiro CLI built-in tools

| Tool name | Description |
|---|---|
| `read` | Read files, folders, images |
| `write` | Create and edit files (with diff view) |
| `shell` | Execute bash commands |
| `glob` | File pattern discovery (respects .gitignore) |
| `grep` | Regex content search (respects .gitignore) |
| `aws` | Execute AWS CLI commands natively |
| `web_search` | Search the web |
| `web_fetch` | Fetch a URL (multiple modes) |
| `introspect` | Query Kiro's own capabilities |
| `code_intelligence` | Tree-sitter LSP-based code analysis |
| `delegate` | Delegate to another agent |
| `knowledge` | Query indexed knowledge base (experimental) |
| `thinking` | Extended reasoning tokens (experimental) |
| `todo` | Task list management (experimental) |
| `session_settings` | Modify session settings mid-chat |
| `subagent` | Spawn a subagent inline |
| `submit_issue` | File a GitHub issue from CLI |

**AWS tool (Kiro-unique):**

```bash
> what EC2 instances are running in us-east-1?

Executing AWS command: aws ec2 describe-instances --region us-east-1 (using tool: aws)
✓ Completed in 1.2s

> You have 3 running instances: ...
```

**Web fetch modes (Kiro):**

```
full      # Full HTML content
markdown  # Converted to markdown (default)
text      # Plain text only
```

**Tool permissions in agent config:**

```json
{
  "tools": ["read", "write", "shell", "grep", "glob"],
  "allowedTools": ["read", "grep"],
  "toolsSettings": {
    "shell": {
      "allowedCommands": ["npm test"],
      "deniedCommands": ["git push .*"],
      "denyByDefault": false,
      "autoAllowReadonly": true
    },
    "grep": {
      "allowedPaths": ["./src/**"],
      "allowReadOnly": true
    }
  }
}
```

`tools` = tools available (agent can use, will ask permission)
`allowedTools` = tools pre-approved (no prompt required)

---

## 7. Hooks

Both tools support lifecycle hooks that execute shell commands at specific points.

### Claude Code Hooks

Configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "echo 'About to write a file'" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "prettier --write $CLAUDE_FILE_PATHS" }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "tsc --noEmit" }
        ]
      }
    ],
    "Notification": [
      { "type": "command", "command": "osascript -e 'display notification \"Claude needs input\"'" }
    ],
    "Stop": [
      { "type": "command", "command": "npm test" }
    ]
  }
}
```

**HTTP hooks (recent addition):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "http",
            "url": "https://your-ci.example.com/webhook",
            "method": "POST"
          }
        ]
      }
    ]
  }
}
```

**Available hook events in Claude Code:**

- `PreToolUse` — before any tool runs
- `PostToolUse` — after any tool completes
- `Notification` — when Claude needs user attention
- `Stop` — when the agentic loop ends

---

### Kiro CLI Hooks

Configured in agent JSON:

```json
{
  "hooks": {
    "agentSpawn": [
      { "command": "git status" },
      { "command": "cat .kiro/steering/tech.md" }
    ],
    "userPromptSubmit": [
      { "command": "ls -la" }
    ],
    "preToolUse": [
      {
        "matcher": "execute_bash",
        "command": "{ echo \"$(date) - Bash: \"; cat; } >> /tmp/audit.log"
      }
    ],
    "postToolUse": [
      {
        "matcher": "fs_write",
        "command": "cargo fmt --all"
      },
      {
        "matcher": "fs_write",
        "command": "eslint --fix $KIRO_CHANGED_FILE"
      }
    ],
    "stop": [
      { "command": "npm test" },
      { "command": "git diff --stat" }
    ]
  }
}
```

**Available hook events in Kiro CLI:**

- `agentSpawn` — when agent session starts
- `userPromptSubmit` — when user submits a prompt
- `preToolUse` — before tool runs (can pipe stdin)
- `postToolUse` — after tool completes
- `stop` — when agent finishes

**Matcher patterns:**

```json
{ "matcher": "fs_write" }        // file writes
{ "matcher": "execute_bash" }    // shell commands
{ "matcher": "fs_read" }         // file reads
```

---

## 8. MCP (Model Context Protocol)

Both tools support MCP servers for connecting external services.

### Claude Code MCP

```bash
# Add MCP server
claude mcp add

# Add specific types
claude mcp add --transport stdio my-server node server.js
claude mcp add --transport sse my-server https://api.example.com/mcp
claude mcp add --transport http my-server https://api.example.com/mcp

# List servers
claude mcp list

# Remove
claude mcp remove my-server
```

**Config in `.mcp.json` (project, git-managed):**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "$GITHUB_TOKEN" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "$DATABASE_URL" }
    },
    "sentry": {
      "command": "npx",
      "args": ["@sentry/mcp-server@latest"],
      "env": { "SENTRY_AUTH_TOKEN": "$SENTRY_AUTH_TOKEN" }
    }
  }
}
```

**MCP in skills (tool allowlisting):**

```markdown
---
name: create-ticket
allowed-tools: mcp__jira__create_issue, mcp__jira__get_project
---
Create a Jira ticket for the issue described by the user.
```

---

### Kiro CLI MCP

```bash
# Add server
kiro-cli mcp add

# List
kiro-cli mcp list

# Check status
kiro-cli mcp status

# Import from existing config
kiro-cli mcp import

# Remove
kiro-cli mcp remove my-server
```

**Config in `.kiro/mcp.json`:**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

**Kiro Powers** — pre-packaged MCP bundles with steering files included:

```bash
# Install a Power (e.g., Stripe)
kiro-cli powers install stripe
# Adds: MCP server + .kiro/steering/stripe.md with best practices
```

Available Powers: Datadog, Figma, Stripe, Supabase, AWS, Sentry, GitHub, and more.

**Reference MCP tools in agent config:**

```json
{
  "resources": ["file://.kiro/steering/**/*.md"],
  "tools": ["read", "write", "mcp:github", "mcp:stripe"]
}
```

---

## 9. Context Management

### Claude Code

```bash
# See context usage breakdown
/context
# Shows visual grid: system prompt / conversation / tools / file contents

# Compress when >80% full
/compact
/compact focus on the auth module and current test failures

# Hard reset (wipes conversation, keeps CLAUDE.md)
/clear

# Auto memory
~/.claude/projects/<project-hash>/memory/
# Claude writes notes here automatically; you can read/edit them
# /memory opens the editor for CLAUDE.md
```

**Context window:** 200,000 tokens (Opus 4.6), up to 1M in beta.

**Environment variables for context:**

```bash
export CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1  # Load CLAUDE.md from --add-dir
export SLASH_COMMAND_TOOL_CHAR_BUDGET=32000            # Expand skill description budget
```

---

### Kiro CLI

```bash
# Add context in-session
/context add ./src/auth/

# Clear session context
/context clear

# Use knowledge base (large doc sets)
# Configured in agent JSON — vector-indexed, semantic search

# Skill lazy loading — metadata only at startup, full content on demand
# Keeps context lean by default

# Resume sessions
kiro-cli chat --resume
kiro-cli chat --resume-picker
kiro-cli chat --list-sessions
```

**Context architecture:**

- **Agent Resources** — loaded at spawn (`file://`, `skill://`, `knowledgeBase`)
- **Session Context** — files added via `/context add` during the session
- **Steering Files** — injected per inclusion mode rules
- **Skills** — lazy-loaded when agent determines they're needed

---

## 10. Permissions & Security

### Claude Code

Three modes (cycle with Shift+Tab):

```
Normal mode     → Ask permission for each tool use
Auto-accept     → Trust all tools (for the current session)
Plan mode       → Read-only, propose changes only, no writes
```

Fine-grained in `settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(npm test:*)",
      "Read(**)",
      "Write(src/**)",
      "Write(tests/**)"
    ],
    "deny": [
      "Bash(git push:*)",
      "Bash(curl:*)",
      "Write(.env*)"
    ]
  }
}
```

CLI flags:

```bash
claude --dangerously-skip-permissions    # Trust all (CI/automation)
claude --trust-tools Read,Bash           # Trust specific tools
```

---

### Kiro CLI

Per-tool allow/deny in agent JSON:

```json
{
  "tools": ["read", "write", "shell"],
  "allowedTools": ["read"],               // pre-approved (no prompt)
  "toolsSettings": {
    "shell": {
      "allowedCommands": ["npm test", "git status"],
      "deniedCommands": ["git push .*", "rm -rf .*"],
      "denyByDefault": false,
      "autoAllowReadonly": true
    },
    "write": {
      "allowedPaths": ["./src/**"],
      "deniedPaths": ["./.env*", "./secrets/**"]
    }
  }
}
```

CLI flags:

```bash
kiro-cli chat --trust-all-tools
kiro-cli chat --trust-tools read,grep
```

---

## 11. Non-Interactive / Automation / CI

### Claude Code

```bash
# Pipe input
echo "review this file for security issues" | claude -p --allowedTools Read < src/auth.ts

# Git hooks
# .git/hooks/pre-commit:
claude --dangerously-skip-permissions -p "lint and fix issues in staged files"

# GitHub Actions:
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}

# Scheduled tasks (cloud):
/loop every night at 2am: analyze CI failures and open a GitHub issue

# JSON output for scripting:
claude --output-format json -p "list all exported functions" | jq '.result'

# Max turns limit:
claude --max-turns 3 -p "implement the auth feature"

# Subagent in headless mode:
claude --dangerously-skip-permissions -p "
  Spawn subagents to:
  1. Write unit tests for every file in src/
  2. Fix any failing tests
  3. Generate a coverage report
"
```

---

### Kiro CLI

```bash
# Non-interactive
kiro-cli chat --no-interactive --trust-all-tools "run all tests and report"

# Pipe
echo "summarize these logs" | kiro-cli chat --no-interactive

# Use hooks for CI automation (in agent config)
# postToolUse → run tests after every write
# stop → git diff at the end of every session

# ACP integration — Kiro CLI as a backend to other tools
# Any ACP-compatible IDE can delegate to kiro-cli
```

---

## 12. Feature-to-Feature Mapping

| Claude Code Feature | Kiro CLI Equivalent |
|---|---|
| `CLAUDE.md` | `.kiro/steering/*.md` |
| `CLAUDE.local.md` | workspace steering overrides global |
| `.claude/rules/*.md` | each `.kiro/steering/*.md` IS a rule |
| `/compact` | no direct equivalent (sessions are shorter by design) |
| `/clear` | `/context clear` |
| `/init` | `kiro-cli agent create` (AI generates config) |
| `/memory` | edit `.kiro/steering/*.md` files directly |
| `/model sonnet` | `kiro-cli chat --list-models` → agent `"model"` field |
| `/plan` (read-only mode) | `"allowedTools": []` in agent config |
| `/rewind` | ❌ not available |
| `/fork` | ❌ not available |
| `/review` (custom skill) | custom agent or skill |
| `Bash(cmd:*)` permission | `"allowedCommands": ["cmd"]` in toolsSettings |
| `Write(src/**)` permission | `"allowedPaths": ["./src/**"]` in write toolsSettings |
| `.mcp.json` | `.kiro/mcp.json` |
| `claude mcp add` | `kiro-cli mcp add` |
| Custom skills (`SKILL.md`) | Kiro skills (`skill://` URI, YAML frontmatter) |
| Sub-agents (`Task` tool) | `delegate` tool + custom agents |
| GitHub Actions integration | ❌ no native equivalent |
| `/loop` (scheduled tasks) | ❌ not available |
| `--output-format json` | `--format json` (on some commands) |
| `--dangerously-skip-permissions` | `--trust-all-tools` |
| `claude -c` (continue) | `kiro-cli chat --resume` |
| `@file` mention | `/context add <file>` |
| `# text` quick memory | edit steering file directly |
| `!command` inline bash | `!command` (same) |
| `kiro-cli translate` | ❌ not available in Claude Code |
| `kiro-cli agent` subcommand | ❌ Claude Code manages agents differently |
| Kiro Powers (MCP bundles) | ❌ no equivalent (manual MCP setup) |
| Knowledge Base (vector search) | ❌ no equivalent |
| `--from` agent template | copy `.claude/agents/*.md` manually |
| AGENTS.md support | ✅ both tools |
| Inline autocomplete | `kiro-cli inline enable` / no equivalent in CC |
| `kiro-cli translate` NL→shell | ❌ not in Claude Code |

---

## Quick Start Recipes

### Claude Code: Locked-down CI agent

```bash
claude \
  --dangerously-skip-permissions \
  --max-turns 10 \
  --output-format json \
  -p "Run tests, fix failures, open a PR if all tests pass"
```

### Kiro CLI: Locked-down backend agent

```json
// .kiro/agents/ci-agent.json
{
  "name": "ci-agent",
  "model": "claude-haiku-4-5",
  "tools": ["read", "write", "shell"],
  "allowedTools": ["read"],
  "toolsSettings": {
    "shell": {
      "allowedCommands": ["npm test", "npm run lint"],
      "denyByDefault": true
    }
  },
  "hooks": {
    "stop": [{ "command": "npm test" }]
  }
}
```

```bash
kiro-cli --agent ci-agent --trust-tools shell chat --no-interactive "fix failing tests"
```

### Claude Code: Custom PR review skill

```markdown
<!-- .claude/skills/review-pr/SKILL.md -->
---
name: review-pr
description: Review pull request for bugs and security vulnerabilities
argument-hint: [pr-number]
allowed-tools: Bash(gh pr diff:*), Bash(gh pr view:*), Read, Grep
---
!`gh pr diff $ARGUMENTS`
Review only for: logic bugs, security holes, missing error handling.
Skip style issues. Output Critical / Important / Minor.
```

### Kiro CLI: Custom backend agent with steering + skills

```bash
kiro-cli agent create backend-specialist \
  -D "Node.js and PostgreSQL expert" \
  -m postgres-mcp
```

Then edit the generated JSON to add:

```json
{
  "resources": [
    "file://.kiro/steering/tech.md",
    "file://.kiro/steering/api-design.md",
    "skill://.kiro/skills/dynamodb/SKILL.md"
  ],
  "hooks": {
    "postToolUse": [
      { "matcher": "fs_write", "command": "npm run lint --fix" }
    ]
  }
}
```
