const SECTIONS = [
{id:"intro",title:"Getting Started",content:`
<h1>Getting Started with Kiro CLI</h1>
<p>Kiro CLI is an AI-powered coding assistant that runs in your terminal. It provides agentic capabilities including code generation, file manipulation, shell commands, and integration with MCP servers.</p>
<h2>Installation</h2>
<pre><code>npm install -g @anthropic-ai/kiro-cli</code></pre>
<h2>Starting a Chat Session</h2>
<pre><code># Basic interactive session
kiro-cli chat

# With a specific agent
kiro-cli chat --agent my-agent

# With a specific model
kiro-cli chat --model claude-sonnet-4

# Trust all tools (no confirmation prompts)
kiro-cli chat --trust-all-tools

# Trust specific tools only
kiro-cli chat --trust-tools=fs_read,grep,execute_bash

# Headless mode (for scripts/CI)
kiro-cli chat --no-interactive --trust-all-tools "Run tests"

# Resume last conversation
kiro-cli chat --resume</code></pre>
<h2>Keyboard Shortcuts</h2>
<table>
<tr><th>Shortcut</th><th>Action</th></tr>
<tr><td><code>Ctrl+C</code></td><td>Cancel current input / exit</td></tr>
<tr><td><code>Ctrl+J</code></td><td>Insert new line (multi-line prompt)</td></tr>
<tr><td><code>Ctrl+S</code></td><td>Fuzzy search commands &amp; context files</td></tr>
<tr><td><code>Ctrl+T</code></td><td>Toggle tangent mode</td></tr>
<tr><td><code>Ctrl+R</code></td><td>Search command history</td></tr>
<tr><td><code>Up/Down</code></td><td>Navigate command history</td></tr>
</table>
`},

{id:"slash-overview",title:"Slash Commands Overview",content:`
<h1>All Slash Commands</h1>
<p>Slash commands start with <code>/</code> and provide shortcuts for common tasks inside an interactive chat session.</p>
<table>
<tr><th>Command</th><th>Purpose</th></tr>
<tr><td><code class="cmd">/help</code></td><td>Switch to Help Agent or show help text</td></tr>
<tr><td><code class="cmd">/quit</code></td><td>Exit the chat session (aliases: /exit, /q)</td></tr>
<tr><td><code class="cmd">/clear</code></td><td>Clear conversation history</td></tr>
<tr><td><code class="cmd">/context</code></td><td>Manage context files and view usage</td></tr>
<tr><td><code class="cmd">/model</code></td><td>Select AI model for current session</td></tr>
<tr><td><code class="cmd">/agent</code></td><td>Manage and switch agents</td></tr>
<tr><td><code class="cmd">/chat</code></td><td>Manage chat sessions (new/resume/save/load)</td></tr>
<tr><td><code class="cmd">/editor</code></td><td>Open $EDITOR to compose a prompt</td></tr>
<tr><td><code class="cmd">/reply</code></td><td>Open editor with last response quoted</td></tr>
<tr><td><code class="cmd">/checkpoint</code></td><td>Manage workspace checkpoints</td></tr>
<tr><td><code class="cmd">/plan</code></td><td>Switch to Plan agent (Shift+Tab to return)</td></tr>
<tr><td><code class="cmd">/knowledge</code></td><td>Manage semantic knowledge base</td></tr>
<tr><td><code class="cmd">/compact</code></td><td>Summarize conversation to free context</td></tr>
<tr><td><code class="cmd">/paste</code></td><td>Paste image from clipboard</td></tr>
<tr><td><code class="cmd">/tools</code></td><td>View/manage tool permissions</td></tr>
<tr><td><code class="cmd">/prompts</code></td><td>Manage reusable prompt templates</td></tr>
<tr><td><code class="cmd">/hooks</code></td><td>View active context hooks</td></tr>
<tr><td><code class="cmd">/usage</code></td><td>Show billing and credits</td></tr>
<tr><td><code class="cmd">/mcp</code></td><td>View loaded MCP servers</td></tr>
<tr><td><code class="cmd">/code</code></td><td>Code intelligence with LSP</td></tr>
<tr><td><code class="cmd">/experiment</code></td><td>Toggle experimental features</td></tr>
<tr><td><code class="cmd">/tangent</code></td><td>Enter/exit tangent mode</td></tr>
<tr><td><code class="cmd">/todos</code></td><td>Manage to-do lists</td></tr>
<tr><td><code class="cmd">/issue</code></td><td>Create GitHub issue / feature request</td></tr>
<tr><td><code class="cmd">/logdump</code></td><td>Create log archive for support</td></tr>
<tr><td><code class="cmd">/changelog</code></td><td>View CLI changelog</td></tr>
</table>
`},

{id:"cmd-help",title:"/help",content:`
<h1>/help — Get Help</h1>
<p>Switch to the Help Agent to ask questions about Kiro CLI features, or display classic help text.</p>
<pre><code># Switch to Help Agent (interactive)
/help

# Ask a question directly
/help How do I configure MCP servers?

# Show classic help text
/help --legacy

# Help for a specific command
/help --legacy /context</code></pre>
`},

{id:"cmd-context",title:"/context",content:`
<h1>/context — Manage Context</h1>
<p>Context rules determine which files are included in your Kiro session. They are derived from the current active agent.</p>
<pre><code># Show context rules and matched files
/context show

# Add specific file
/context add src/app.js

# Add glob pattern
/context add "*.py"
/context add "src/**/*.js"

# Remove a rule
/context remove src/app.js

# Remove all rules
/context clear</code></pre>
<div class="note">Context changes are NOT preserved between sessions. To make them permanent, edit the agent config file.</div>
`},

{id:"cmd-model",title:"/model",content:`
<h1>/model — Select AI Model</h1>
<p>Choose which AI model to use for the current session.</p>
<pre><code># Open interactive model picker
/model

# Select directly by name
/model claude-opus-4.6

# Tab completion works
/model clau&lt;Tab&gt;

# Save current model as default for all future sessions
/model set-current-as-default</code></pre>
<div class="note">The default model is saved to <code>~/.kiro/settings/cli.json</code>.</div>
`},

{id:"cmd-agent",title:"/agent",content:`
<h1>/agent — Manage Agents</h1>
<p>Create, edit, list, and switch between agent configurations.</p>
<pre><code># List all available agents
/agent list

# Create a new agent (AI-assisted by default)
/agent create my-agent

# Create with description and MCP servers
/agent create my-agent -D "Code reviewer" -m code-analysis

# Create using editor (manual mode)
/agent create my-agent --manual

# Create from template
/agent create my-agent --from backend-specialist

# Edit current agent
/agent edit

# Edit specific agent
/agent edit my-agent

# Show agent config schema
/agent schema

# Set default agent
/agent set-default my-agent

# Swap to different agent at runtime
/agent swap code-reviewer</code></pre>
<h2>Agent Storage Locations</h2>
<table>
<tr><th>Scope</th><th>Path</th></tr>
<tr><td>Local (workspace)</td><td><code>.kiro/agents/</code></td></tr>
<tr><td>Global (user-wide)</td><td><code>~/.kiro/agents/</code></td></tr>
</table>
<div class="note">Local agents take precedence over global agents with the same name.</div>
`},

{id:"cmd-chat",title:"/chat",content:`
<h1>/chat — Session Management</h1>
<p>Manage chat sessions. Kiro auto-saves all sessions on every conversation turn.</p>
<pre><code># Start fresh conversation
/chat new

# Start fresh with initial prompt
/chat new how do I set up a React project

# Resume a previous session (interactive picker)
/chat resume

# Save to file
/chat save /myproject/codereview.json

# Load from file
/chat load /myproject/codereview.json

# Custom save via script (e.g., git notes)
/chat save-via-script ./scripts/save-to-git.sh

# Custom load via script
/chat load-via-script ./scripts/load-from-git.sh</code></pre>
<div class="note">Sessions are stored per-directory, so each project has its own set of sessions.</div>
`},

{id:"cmd-tools",title:"/tools",content:`
<h1>/tools — Tool Permissions</h1>
<p>View available tools and manage trust levels. By default, Kiro asks for confirmation before using certain tools.</p>
<pre><code># View all tools with token counts and permissions
/tools

# Show JSON schema for all tools
/tools schema

# Trust a specific tool for the session
/tools trust fs_write

# Trust multiple tools
/tools trust execute_bash grep

# Revert to per-request confirmation
/tools untrust fs_write

# Trust ALL tools (no prompts)
/tools trust-all

# Reset to agent defaults
/tools reset</code></pre>
<h2>Permission Levels</h2>
<table>
<tr><th>Level</th><th>Meaning</th></tr>
<tr><td>Trusted</td><td>Auto-approved, no prompts</td></tr>
<tr><td>Allowed</td><td>In agent's allowedTools, auto-approved</td></tr>
<tr><td>Ask</td><td>Requires confirmation each time</td></tr>
</table>
<h2>CLI Flags for Trust</h2>
<pre><code># Trust all at startup
kiro-cli chat --trust-all-tools

# Trust specific tools at startup
kiro-cli chat --trust-tools=fs_read,grep,execute_bash</code></pre>
<div class="note">Trust changes via <code>/tools</code> are session-only. For permanent trust, add tools to your agent's <code>allowedTools</code> config.</div>
`},

{id:"cmd-code",title:"/code",content:`
<h1>/code — Code Intelligence (LSP)</h1>
<p>LSP-powered code intelligence for semantic understanding. Supports TypeScript, Rust, Python, Go, Java, Ruby, C/C++.</p>
<pre><code># Initialize LSP in current directory
/code init

# Force reinitialize (restart LSP servers)
/code init -f

# Get workspace overview
/code overview

# Cleaner overview output
/code overview --silent

# Check LSP server status
/code status

# View LSP logs
/code logs
/code logs -l INFO
/code logs -n 50
/code logs -l DEBUG -n 100
/code logs -p ./lsp-logs.json</code></pre>
<div class="note">Disable by deleting <code>.kiro/settings/lsp.json</code>. Re-enable anytime with <code>/code init</code>.</div>
`},

{id:"cmd-checkpoint",title:"/checkpoint",content:`
<h1>/checkpoint — Workspace Snapshots</h1>
<p>Track and restore file changes using git-based checkpoints.</p>
<pre><code># Create a snapshot
/checkpoint init

# List all checkpoints
/checkpoint list

# Restore (interactive picker)
/checkpoint restore

# Restore to specific checkpoint
/checkpoint restore 2

# Hard restore (removes newer files too)
/checkpoint restore 2 --hard

# View checkpoint details
/checkpoint expand 1

# Diff between checkpoints
/checkpoint diff 1 2

# Clean up checkpoint data
/checkpoint clean</code></pre>
<div class="note warn">Experimental feature. Enable with: <code>kiro-cli settings chat.enableCheckpoint true</code></div>
`},

{id:"cmd-knowledge",title:"/knowledge",content:`
<h1>/knowledge — Semantic Search</h1>
<p>Index files and directories for semantic search across your project.</p>
<pre><code># Show all knowledge base entries
/knowledge show

# Add a directory
/knowledge add --name my-docs --path ./docs

# Add with include/exclude patterns
/knowledge add --name src --path ./src --include "*.ts" --exclude "*.test.ts"

# Add with indexing type
/knowledge add --name api --path ./api --index-type Best

# Search the knowledge base
/knowledge search "authentication flow"

# Remove an entry
/knowledge remove ./docs

# Re-index an entry
/knowledge update ./docs

# Clear entire knowledge base
/knowledge clear

# Cancel background indexing
/knowledge cancel</code></pre>
<div class="note warn">Experimental feature. Enable with: <code>kiro-cli settings chat.enableKnowledge true</code></div>
`},

{id:"cmd-misc",title:"Other Commands",content:`
<h1>Other Slash Commands</h1>

<h2>/editor</h2>
<p>Opens <code>$EDITOR</code> (defaults to vi) to compose a multi-line prompt. Save and exit to send.</p>
<pre><code>/editor</code></pre>

<h2>/reply</h2>
<p>Opens editor with the AI's last response quoted, so you can reference specific parts.</p>
<pre><code>/reply</code></pre>

<h2>/plan</h2>
<p>Switch to the Plan agent for breaking down complex ideas. Use <code>Shift+Tab</code> to return.</p>
<pre><code>/plan
/plan Build a REST API for user management</code></pre>

<h2>/compact</h2>
<p>Summarize conversation to free up context window space.</p>
<pre><code>/compact</code></pre>

<h2>/paste</h2>
<p>Paste an image from clipboard for the AI to analyze.</p>
<pre><code>/paste</code></pre>

<h2>/tangent</h2>
<p>Enter/exit tangent mode to explore side topics without disrupting main conversation. Also <code>Ctrl+T</code>.</p>

<h2>/todos</h2>
<pre><code>/todos
/todos add "Fix authentication bug"
/todos complete 1</code></pre>

<h2>/prompts</h2>
<pre><code>/prompts list
/prompts get code-review src/main.rs rust
/prompts create my-prompt
/prompts edit my-prompt
/prompts remove my-prompt
# Quick access: @code-review [arg]</code></pre>

<h2>/hooks</h2>
<p>Display active context hooks for the current session.</p>

<h2>/usage</h2>
<p>Show billing and credits information.</p>

<h2>/mcp</h2>
<p>Display loaded MCP servers.</p>

<h2>/experiment</h2>
<p>Toggle experimental features on/off.</p>

<h2>/logdump</h2>
<pre><code>/logdump
/logdump --mcp</code></pre>

<h2>/changelog</h2>
<p>View recent updates to Kiro CLI.</p>

<h2>/issue</h2>
<p>Create a GitHub issue or feature request for the Kiro team.</p>
`}
];

const SECTIONS2 = [
{id:"steering",title:"Steering Files",content:`
<h1>Steering — Persistent Project Knowledge</h1>
<p>Steering gives Kiro persistent knowledge about your project through markdown files. Instead of explaining conventions every chat, steering files ensure Kiro consistently follows your patterns.</p>

<h2>Scope</h2>
<table>
<tr><th>Scope</th><th>Path</th><th>Applies To</th></tr>
<tr><td>Workspace</td><td><code>.kiro/steering/</code></td><td>Current workspace only</td></tr>
<tr><td>Global</td><td><code>~/.kiro/steering/</code></td><td>All workspaces</td></tr>
<tr><td>Team</td><td><code>~/.kiro/steering/</code> (via MDM/Group Policy)</td><td>Entire team</td></tr>
</table>
<div class="note">Workspace steering overrides global steering when they conflict.</div>

<h2>Foundational Steering Files</h2>
<p>Create these in <code>.kiro/steering/</code>:</p>
<h3>product.md — Product Overview</h3>
<pre><code># Product Overview
## Purpose
Our app helps developers track code quality metrics.
## Target Users
- Backend developers working with microservices
- DevOps engineers monitoring deployments
## Key Features
- Real-time code coverage dashboards
- Automated PR quality gates</code></pre>

<h3>tech.md — Technology Stack</h3>
<pre><code># Technology Stack
## Frontend: React 18 + TypeScript + Vite
## Backend: Node.js + Express + PostgreSQL
## Testing: Jest + React Testing Library
## Deployment: AWS CDK + Lambda + API Gateway
## Constraints
- Must support Node.js 20+
- All APIs must be REST (no GraphQL)</code></pre>

<h3>structure.md — Project Structure</h3>
<pre><code># Project Structure
src/
  components/    # React components (PascalCase)
  hooks/         # Custom hooks (use* prefix)
  services/      # API service layer
  utils/         # Pure utility functions
  types/         # TypeScript type definitions
tests/
  unit/          # Mirror src/ structure
  integration/   # API integration tests</code></pre>

<h2>Custom Steering Files</h2>
<p>Add specialized guidance as needed:</p>
<ul>
<li><code>api-standards.md</code> — REST conventions, error formats, auth flows</li>
<li><code>testing-standards.md</code> — Unit test patterns, mocking, coverage</li>
<li><code>code-conventions.md</code> — Naming, imports, architecture</li>
<li><code>security-policies.md</code> — Auth, validation, sanitization</li>
<li><code>deployment-workflow.md</code> — Build, deploy, rollback steps</li>
</ul>

<h2>AGENTS.md Support</h2>
<p>Kiro also supports the <a href="https://agents.md">AGENTS.md</a> standard. Place <code>AGENTS.md</code> in your workspace root or <code>~/.kiro/steering/</code> — it's always included automatically.</p>

<h2>Steering with Custom Agents</h2>
<p>Custom agents don't auto-include steering. Add to agent config:</p>
<pre><code>{
  "resources": ["file://.kiro/steering/**/*.md"]
}</code></pre>
`},

{id:"agents-config",title:"Agent Configuration",content:`
<h1>Agent Configuration Reference</h1>
<p>Custom agents are JSON files that define behavior, tools, permissions, and context.</p>

<h2>Minimal Example</h2>
<pre><code>{
  "name": "my-agent",
  "description": "A custom agent for my workflow",
  "tools": ["read", "write"],
  "allowedTools": ["read"],
  "resources": [
    "file://README.md",
    "file://.kiro/steering/**/*.md"
  ],
  "prompt": "You are a helpful coding assistant",
  "model": "claude-sonnet-4"
}</code></pre>

<h2>All Configuration Fields</h2>
<table>
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td><code>name</code></td><td>string</td><td>Agent name (optional, derived from filename)</td></tr>
<tr><td><code>description</code></td><td>string</td><td>Human-readable description</td></tr>
<tr><td><code>prompt</code></td><td>string</td><td>System prompt (inline or <code>file://</code> URI)</td></tr>
<tr><td><code>mcpServers</code></td><td>object</td><td>MCP servers the agent can access</td></tr>
<tr><td><code>tools</code></td><td>array</td><td>Available tools (<code>*</code> for all)</td></tr>
<tr><td><code>toolAliases</code></td><td>object</td><td>Remap tool names for collisions</td></tr>
<tr><td><code>allowedTools</code></td><td>array</td><td>Tools auto-approved without prompting</td></tr>
<tr><td><code>toolsSettings</code></td><td>object</td><td>Per-tool configuration</td></tr>
<tr><td><code>resources</code></td><td>array</td><td>Files, skills, knowledge bases</td></tr>
<tr><td><code>hooks</code></td><td>object</td><td>Commands at trigger points</td></tr>
<tr><td><code>includeMcpJson</code></td><td>boolean</td><td>Include MCP servers from mcp.json</td></tr>
<tr><td><code>model</code></td><td>string</td><td>Model ID for this agent</td></tr>
<tr><td><code>keyboardShortcut</code></td><td>string</td><td>e.g. <code>ctrl+a</code></td></tr>
<tr><td><code>welcomeMessage</code></td><td>string</td><td>Shown when switching to agent</td></tr>
</table>

<h2>Tools Field Patterns</h2>
<pre><code>"tools": [
  "read",                        // Built-in tool
  "write",
  "@builtin",                    // All built-in tools
  "@git",                        // All tools from git MCP server
  "@rust-analyzer/check_code",   // Specific MCP tool
  "*"                            // Everything
]</code></pre>

<h2>AllowedTools Wildcards</h2>
<pre><code>"allowedTools": [
  "read",                  // Exact match
  "@git/git_status",       // Specific MCP tool
  "@server/read_*",        // Prefix wildcard
  "@server/*_get",         // Suffix wildcard
  "@fetch"                 // All tools from server
]</code></pre>

<h2>Hooks</h2>
<pre><code>"hooks": {
  "agentSpawn": [{"command": "git status"}],
  "userPromptSubmit": [{"command": "ls -la"}],
  "preToolUse": [{"matcher": "execute_bash", "command": "echo audit"}],
  "postToolUse": [{"matcher": "fs_write", "command": "cargo fmt --all"}],
  "stop": [{"command": "npm test"}]
}</code></pre>

<h2>Resources</h2>
<pre><code>"resources": [
  "file://README.md",                    // Direct file
  "file://.kiro/steering/**/*.md",       // Glob pattern
  "skill://.kiro/skills/**/SKILL.md",    // Skills (lazy-loaded)
  {                                       // Knowledge base
    "type": "knowledgeBase",
    "source": "file://./docs",
    "name": "ProjectDocs",
    "indexType": "best",
    "autoUpdate": true
  }
]</code></pre>

<h2>Complete Example</h2>
<pre><code>{
  "name": "aws-rust-agent",
  "description": "AWS and Rust development",
  "prompt": "file://./prompts/aws-rust-expert.md",
  "mcpServers": {
    "fetch": {"command": "fetch-server", "args": []},
    "git": {"command": "git-mcp", "args": [], "timeout": 120000}
  },
  "tools": ["read","write","shell","aws","@git","@fetch/fetch_url"],
  "toolAliases": {"@git/git_status": "status"},
  "allowedTools": ["read", "@git/git_status"],
  "toolsSettings": {
    "write": {"allowedPaths": ["src/**","tests/**","Cargo.toml"]}
  },
  "resources": ["file://README.md","file://docs/**/*.md"],
  "hooks": {
    "agentSpawn": [{"command": "git status"}],
    "postToolUse": [{"matcher": "fs_write", "command": "cargo fmt --all"}]
  },
  "model": "claude-sonnet-4",
  "keyboardShortcut": "ctrl+shift+r",
  "welcomeMessage": "Ready for AWS and Rust!"
}</code></pre>
`}
];

const SECTIONS3 = [
{id:"spec-driven",title:"Spec-Driven Development",content:`
<h1>Spec-Driven Development</h1>
<p>Kiro supports a structured approach to building features through formal specifications. This transforms high-level ideas into detailed implementation plans.</p>

<h2>The Four Phases</h2>
<table>
<tr><th>Phase</th><th>Output</th><th>Description</th></tr>
<tr><td>1. Requirements</td><td>User stories + acceptance criteria</td><td>EARS-format requirements with clear conditions</td></tr>
<tr><td>2. Design</td><td>Architecture + data models</td><td>Technical design document with components</td></tr>
<tr><td>3. Tasks</td><td>Incremental implementation steps</td><td>Test-driven, ordered coding tasks</td></tr>
<tr><td>4. Execute</td><td>Working code</td><td>Implement tasks one at a time</td></tr>
</table>

<h2>Using Specs in Kiro CLI</h2>
<p>Use the <code>/plan</code> command to enter the Plan agent, which helps break down ideas:</p>
<pre><code># Switch to Plan agent
/plan

# Or with immediate prompt
/plan Build a user authentication system with OAuth2

# Use Shift+Tab to return to your previous agent</code></pre>

<h2>Spec File Structure</h2>
<p>Specs are typically stored in your project as markdown:</p>
<pre><code>.kiro/
  specs/
    feature-auth/
      requirements.md    # User stories, acceptance criteria
      design.md          # Architecture, components, data models
      tasks.md           # Implementation steps</code></pre>

<h2>Example Requirements (EARS Format)</h2>
<pre><code># User Authentication Requirements

## User Stories
US-1: As a user, I want to sign up with email/password
  - AC-1.1: Email must be validated
  - AC-1.2: Password must be 8+ chars with mixed case
  - AC-1.3: Duplicate emails are rejected with clear message

US-2: As a user, I want to log in with OAuth2
  - AC-2.1: Google OAuth2 flow completes in under 3 seconds
  - AC-2.2: New OAuth users get accounts auto-created</code></pre>
`},

{id:"comparison",title:"Kiro CLI vs Claude Code",content:`
<h1>Kiro CLI vs Claude Code — Command Mapping</h1>
<p>If you're coming from Claude Code, here's how the commands map:</p>

<table class="comparison">
<tr><th>Task</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Start session</td><td><code>claude</code></td><td><code>kiro-cli chat</code></td></tr>
<tr><td>Exit</td><td><code>/exit</code></td><td><code>/quit</code> (or /exit, /q)</td></tr>
<tr><td>Clear history</td><td><code>/clear</code></td><td><code>/clear</code></td></tr>
<tr><td>Compact context</td><td><code>/compact</code></td><td><code>/compact</code></td></tr>
<tr><td>Select model</td><td><code>/model</code></td><td><code>/model</code></td></tr>
<tr><td>View costs</td><td><code>/cost</code></td><td><code>/usage</code></td></tr>
<tr><td>Add context</td><td><code>/add-dir</code></td><td><code>/context add</code></td></tr>
<tr><td>Project memory</td><td><code>CLAUDE.md</code></td><td><code>.kiro/steering/*.md</code> or <code>AGENTS.md</code></td></tr>
<tr><td>Trust all tools</td><td><code>--dangerously-skip-permissions</code></td><td><code>--trust-all-tools</code> or <code>/tools trust-all</code></td></tr>
<tr><td>Headless/non-interactive</td><td><code>claude -p "query"</code></td><td><code>kiro-cli chat --no-interactive "query"</code></td></tr>
<tr><td>Resume session</td><td><code>claude --resume</code></td><td><code>kiro-cli chat --resume</code></td></tr>
<tr><td>MCP servers</td><td><code>claude mcp add</code></td><td><code>/mcp</code> + agent config</td></tr>
<tr><td>Custom instructions</td><td><code>CLAUDE.md</code></td><td>Steering files + Agent prompt</td></tr>
<tr><td>Multi-line input</td><td><code>\\</code> at end of line</td><td><code>Ctrl+J</code></td></tr>
<tr><td>Image input</td><td>Drag &amp; drop</td><td><code>/paste</code></td></tr>
<tr><td>Code intelligence</td><td>Built-in</td><td><code>/code init</code> (LSP-based)</td></tr>
<tr><td>Plan mode</td><td><code>--plan</code> flag</td><td><code>/plan</code> or <code>Shift+Tab</code></td></tr>
<tr><td>Todo tracking</td><td><code>/todoread</code>, <code>/todoadd</code></td><td><code>/todos</code></td></tr>
<tr><td>Checkpoints</td><td>N/A</td><td><code>/checkpoint</code></td></tr>
<tr><td>Knowledge base</td><td>N/A</td><td><code>/knowledge</code></td></tr>
<tr><td>Tangent mode</td><td>N/A</td><td><code>/tangent</code> or <code>Ctrl+T</code></td></tr>
<tr><td>Agent switching</td><td>N/A</td><td><code>/agent swap</code></td></tr>
<tr><td>Hooks/automation</td><td>N/A</td><td>Agent hooks (pre/post tool use)</td></tr>
<tr><td>Prompt templates</td><td>N/A</td><td><code>/prompts</code> + <code>@prompt-name</code></td></tr>
</table>

<h2>Key Differences</h2>
<ul>
<li>Kiro CLI has a richer agent system with custom configs, keyboard shortcuts, and per-agent tool permissions</li>
<li>Steering files are more structured than CLAUDE.md — separate files for product, tech, structure</li>
<li>Kiro has built-in spec-driven development workflow via <code>/plan</code></li>
<li>Knowledge base allows semantic search over large doc sets</li>
<li>Checkpoint system provides git-based workspace snapshots</li>
<li>Tangent mode lets you explore side topics without losing main context</li>
</ul>
`},

{id:"settings",title:"Settings Reference",content:`
<h1>Settings Reference</h1>
<p>Manage settings via the terminal command <code>kiro-cli settings</code> (not a slash command).</p>
<pre><code># Set a setting
kiro-cli settings chat.enableThinking true

# Get a setting value
kiro-cli settings chat.enableThinking</code></pre>

<h2>Key Settings</h2>
<table>
<tr><th>Setting</th><th>Type</th><th>Description</th></tr>
<tr><td><code>chat.enableThinking</code></td><td>bool</td><td>Enable thinking for complex reasoning</td></tr>
<tr><td><code>chat.enableKnowledge</code></td><td>bool</td><td>Enable knowledge base</td></tr>
<tr><td><code>chat.enableCodeIntelligence</code></td><td>bool</td><td>Enable LSP code intelligence</td></tr>
<tr><td><code>chat.enableSubagent</code></td><td>bool</td><td>Enable subagent delegation</td></tr>
<tr><td><code>chat.enableTangentMode</code></td><td>bool</td><td>Enable tangent mode</td></tr>
<tr><td><code>chat.enableCheckpoint</code></td><td>bool</td><td>Enable checkpoint feature</td></tr>
<tr><td><code>chat.enableTodoList</code></td><td>bool</td><td>Enable todo list feature</td></tr>
<tr><td><code>chat.enableDelegate</code></td><td>bool</td><td>Enable delegate tool</td></tr>
<tr><td><code>chat.defaultModel</code></td><td>string</td><td>Default AI model</td></tr>
<tr><td><code>chat.defaultAgent</code></td><td>string</td><td>Default agent configuration</td></tr>
<tr><td><code>chat.disableMarkdownRendering</code></td><td>bool</td><td>Disable markdown in chat</td></tr>
<tr><td><code>chat.disableAutoCompaction</code></td><td>bool</td><td>Disable auto-summarization</td></tr>
<tr><td><code>chat.enableNotifications</code></td><td>bool</td><td>Desktop notifications</td></tr>
<tr><td><code>chat.enableHistoryHints</code></td><td>bool</td><td>Show history hints</td></tr>
<tr><td><code>chat.enablePromptHints</code></td><td>bool</td><td>Show prompt hints on empty input</td></tr>
<tr><td><code>api.timeout</code></td><td>number</td><td>API request timeout (seconds)</td></tr>
<tr><td><code>mcp.initTimeout</code></td><td>number</td><td>MCP server init timeout</td></tr>
<tr><td><code>app.disableAutoupdates</code></td><td>bool</td><td>Disable auto-updates</td></tr>
</table>
`},

{id:"workflows",title:"Common Workflows",content:`
<h1>Common Workflows</h1>

<h2>1. New Project Setup</h2>
<pre><code># Start Kiro
kiro-cli chat --trust-all-tools

# Create steering files
> Create .kiro/steering/product.md, tech.md, and structure.md for my project

# Initialize code intelligence
/code init

# Create a custom agent
/agent create my-project-agent</code></pre>

<h2>2. Feature Development with Specs</h2>
<pre><code># Switch to plan mode
/plan Build a user dashboard with real-time metrics

# Review the generated spec, then switch back
Shift+Tab

# Implement the tasks
> Implement task 1 from the spec</code></pre>

<h2>3. Code Review Workflow</h2>
<pre><code># Add context
/context add src/auth/**/*.ts

# Create a checkpoint before changes
/checkpoint init

# Ask for review
> Review the authentication module for security issues

# If needed, restore
/checkpoint restore</code></pre>

<h2>4. Debugging Session</h2>
<pre><code># Use tangent mode to explore without losing context
/tangent

# Investigate the issue
> Why is the API returning 500 on /users endpoint?

# Exit tangent, main context preserved
/tangent</code></pre>

<h2>5. CI/CD Integration</h2>
<pre><code># Headless mode for automation
kiro-cli chat --no-interactive --trust-all-tools \\
  --require-mcp-startup \\
  "Run all tests and generate coverage report"

# Exit code 3 if MCP servers fail to start</code></pre>

<h2>6. Knowledge Base for Large Projects</h2>
<pre><code># Index documentation
/knowledge add --name docs --path ./docs --index-type Best

# Index source code
/knowledge add --name src --path ./src --include "*.ts" --exclude "*.test.ts"

# Search semantically
/knowledge search "how does authentication work"</code></pre>
`}
];

// Merge all sections
const ALL_SECTIONS = [...SECTIONS, ...SECTIONS2, ...SECTIONS3];
