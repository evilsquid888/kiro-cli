const SECTIONS = [
{id:"intro",title:"Getting Started",content:`
<h1>Getting Started with Kiro CLI</h1>
<p>Kiro CLI is an AI-powered coding assistant that runs in your terminal. It provides agentic capabilities including code generation, file manipulation, shell commands, and integration with MCP servers.</p>
<h2>Installation</h2>
<pre><code># Install Kiro CLI
curl -fsSL https://cli.kiro.dev/install | bash</code></pre>
<div class="note">Kiro is built by Amazon (AWS). For the full IDE, download from <a href="https://kiro.dev">kiro.dev</a>. The CLI is the terminal-only interface.</div>
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
<p>Every time you start a new chat, you lose context. Steering solves this by giving Kiro persistent knowledge about your project through markdown files — your tech stack, coding conventions, architecture decisions, and team standards. Instead of re-explaining conventions every session, steering files ensure Kiro consistently follows your patterns from the first message. Think of it as a project README that your AI assistant actually reads and follows.</p>

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

<h2>Inclusion Modes</h2>
<p>Steering files use YAML frontmatter to control when they load:</p>
<table>
<tr><th>Mode</th><th>Behavior</th><th>Use Case</th></tr>
<tr><td><code>always</code></td><td>Loaded in every interaction (default)</td><td>Foundation files (product, tech, structure)</td></tr>
<tr><td><code>fileMatch</code></td><td>Loaded only when editing matching files</td><td>Test standards, component patterns</td></tr>
<tr><td><code>manual</code></td><td>On-demand via <code>#steering-file-name</code> in chat</td><td>Rare references, deployment guides</td></tr>
<tr><td><code>auto</code></td><td>Auto-included when request matches description</td><td>Domain-specific guidance (uses LLM matching)</td></tr>
</table>
<pre><code>---
inclusion: fileMatch
fileMatchPattern: "components/**/*.tsx"
---</code></pre>

<h2>File References</h2>
<p>Link live workspace files in steering using: <code>#[[file:&lt;relative_path&gt;]]</code></p>
<pre><code>Refer to the API spec at #[[file:api/openapi.yaml]] for endpoint definitions.</code></pre>

<h2>AGENTS.md Support</h2>
<p>Kiro also supports the <a href="https://agents.md">AGENTS.md</a> standard. Place <code>AGENTS.md</code> in your workspace root or <code>~/.kiro/steering/</code> — it's always included automatically. AGENTS.md files don't support inclusion modes.</p>

<h2>Steering with Custom Agents</h2>
<p>Custom agents don't auto-include steering. Add to agent config:</p>
<pre><code>{
  "resources": ["file://.kiro/steering/**/*.md"]
}</code></pre>
`},

{id:"agents-config",title:"Agent Configuration",content:`
<h1>Agent Configuration Reference</h1>
<p>Agents are at the heart of Kiro's extensibility. Each agent is a JSON configuration file that defines what the AI can do, what tools it can access, how it should behave, and what project context it starts with. You can create specialized agents for different workflows — a security reviewer that only reads files, a deployment agent with AWS access, or a code reviewer with strict formatting hooks — and switch between them instantly.</p>

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
<p>Jumping straight from a vague idea to code is the leading cause of features that miss requirements, need rework, or break adjacent systems. Kiro's spec-driven development enforces a structured pipeline — from formal requirements through technical design to trackable tasks — before a single line of code is written. The result: fewer surprises, clearer scope, and a paper trail that makes code review and onboarding dramatically easier.</p>

<h2>The Three Phases</h2>
<p>Every spec generates three files through a structured workflow:</p>
<table>
<tr><th>Phase</th><th>Output File</th><th>Description</th></tr>
<tr><td>1. Requirements</td><td><code>requirements.md</code> (or <code>bugfix.md</code>)</td><td>User stories with EARS-format acceptance criteria</td></tr>
<tr><td>2. Design</td><td><code>design.md</code></td><td>Technical architecture, sequence diagrams, implementation considerations</td></tr>
<tr><td>3. Tasks</td><td><code>tasks.md</code></td><td>Discrete, trackable implementation steps</td></tr>
</table>
<div class="note">Two workflow variants exist: <strong>Requirements-First</strong> (Requirements → Design → Tasks) for product-driven features, and <strong>Design-First</strong> (Design → Requirements → Tasks) for architecture-constrained work. Kiro also supports <strong>Bugfix Specs</strong> with a separate analysis phase.</div>

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
<p>Switching between AI coding tools shouldn't mean relearning everything from scratch. If you're already productive with Claude Code, this mapping table shows exactly where to find the equivalent functionality in Kiro CLI — and highlights the features that are unique to each tool.</p>

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
<tr><td>Hooks/automation</td><td>Hooks in settings.json (23 event types)</td><td>Agent hooks (10 trigger types) + Kiro panel UI</td></tr>
<tr><td>Prompt templates</td><td>N/A</td><td><code>/prompts</code> + <code>@prompt-name</code></td></tr>
<tr><td>Context providers</td><td>N/A</td><td><code>#codebase</code>, <code>#file</code>, <code>#git diff</code>, <code>#terminal</code>, <code>#url</code>, <code>#spec</code>, etc. (IDE)</td></tr>
<tr><td>Execution modes</td><td>Permissions-based</td><td>Autopilot (autonomous) or Supervised (approval at each step)</td></tr>
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

const SECTIONS4 = [
{id:"philosophy",title:"Philosophy & Overview",content:`
<h1>Two Philosophies of AI-Assisted Development</h1>
<p>The AI coding tool landscape has split into two clear camps: tools that prioritize raw power and flexibility, and tools that enforce structure and planning before code is written. Claude Code and Kiro are the flagship examples of each philosophy — and understanding this split is the key to choosing the right tool (or using both together).</p>
<p>This section distills research comparing both tools' architectures, workflows, and design choices so you can make informed decisions about your AI-assisted development stack.</p>

<h2>Claude Code: Power-First</h2>
<p>Claude Code is a CLI-first, minimal-ceremony tool that treats AI as a co-developer adapting to <em>your</em> workflow. It starts with maximum power and minimal structure, relying on skills and CLAUDE.md to progressively add specialized expertise as needed.</p>
<ul>
<li>Raw terminal power — full Unix pipe support, headless scripting, JSON output</li>
<li>Structure is opt-in via skills, commands, and CLAUDE.md</li>
<li>Best for: rapid execution, terminal-native workflows, CI/CD automation</li>
</ul>

<h2>Kiro: Structure-First</h2>
<p>Kiro enforces structured planning before code generation — transforming vague prompts into formal requirements, designs, and task lists. It starts with maximum structure and uses vibe mode to selectively remove it.</p>
<ul>
<li>Spec-driven development: requirements → design → tasks → code</li>
<li>Rich agent system with JSON configs, hooks, and per-agent permissions</li>
<li>Best for: complex features, team collaboration, documentation-heavy projects</li>
</ul>

<h2>Complementary, Not Competitive</h2>
<div class="note">The most productive workflow emerging among developers combines both: <strong>Kiro's spec-driven planning</strong> to define what to build, then <strong>Claude Code's raw terminal power</strong> to build it fast.</div>

<table class="comparison">
<tr><th>Dimension</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Design philosophy</td><td>Minimal ceremony, maximum flexibility</td><td>Structured planning, guided workflows</td></tr>
<tr><td>Headless / scripted mode</td><td><code>claude -p "prompt"</code> with full stdin/stdout</td><td><code>kiro-cli chat --no-interactive</code></td></tr>
<tr><td>Custom agents</td><td>Sub-agents via skills and .claude/agents/</td><td>First-class agent system with JSON configs</td></tr>
<tr><td>NL → shell command</td><td>Via conversation</td><td>Dedicated <code>kiro-cli translate</code> command</td></tr>
<tr><td>Spec-driven workflow</td><td>Via community plugins (cc-sdd)</td><td>Native (requirements → design → tasks)</td></tr>
<tr><td>Session persistence</td><td>Automatic</td><td>Manual save/load + resume picker</td></tr>
</table>
<hr>
<p><small><strong>Sources:</strong> <a href="https://kiro.dev/docs/">Kiro Official Documentation</a> · <a href="https://code.claude.com/docs">Claude Code Documentation</a> · Research analysis from project compass artifact and kiro-vs-claude-code-technical.md</small></p>
`},

{id:"skills-portability",title:"Skills & Portability",content:`
<h1>Skills System & Cross-Tool Portability</h1>
<p>One of the most exciting developments in AI coding tools is the emergence of a shared skills standard. Instead of locking your automation recipes into one vendor's format, both Claude Code and Kiro adopted the same SKILL.md format — meaning a skill you write for one tool works in the other with zero changes. This section covers how skills work, how they load efficiently, and how to migrate between tools.</p>

<h2>How Skills Work</h2>
<p>Skills package domain-specific knowledge into modular <strong>SKILL.md files</strong> — markdown documents with YAML frontmatter. Each skill directory can include:</p>
<table>
<tr><th>Path</th><th>Purpose</th></tr>
<tr><td><code>SKILL.md</code></td><td>Main instructions (required)</td></tr>
<tr><td><code>scripts/</code></td><td>Executable code referenced by the skill</td></tr>
<tr><td><code>references/</code></td><td>Supplemental documentation</td></tr>
<tr><td><code>assets/</code></td><td>Templates, images, fonts</td></tr>
</table>

<h2>Three-Level Progressive Disclosure</h2>
<p>Skills use progressive disclosure to manage context efficiently:</p>
<ol>
<li><strong>Startup:</strong> Only skill metadata (name + description, ~100 tokens each) loads into the system prompt</li>
<li><strong>Activation:</strong> When the LLM determines a skill matches, it loads the full SKILL.md body (&lt;5,000 tokens)</li>
<li><strong>Deep context:</strong> Only when SKILL.md explicitly references additional files do scripts and references enter context</li>
</ol>
<div class="note">This means dozens of skills can be installed with negligible overhead. No keyword matching or classifiers — activation uses pure LLM reasoning based on the <code>description</code> field.</div>

<h2>SKILL.md Example</h2>
<pre><code>---
name: security-review
description: Analyzes code for security vulnerabilities. Use when reviewing
  code for security, before deployment, or when the user mentions audit.
license: MIT
metadata:
  author: your-team
  version: 1.0.0
---
# Security Review
When reviewing code for security:
1. Check for injection vulnerabilities (SQL, XSS, command injection)
2. Verify authentication/authorization patterns
3. Look for exposed secrets or hardcoded credentials</code></pre>
<div class="note">Official SKILL.md frontmatter fields: <code>name</code> (required, must match folder name), <code>description</code> (required, max 1024 chars), <code>license</code>, <code>compatibility</code>, <code>metadata</code>. The name must be lowercase with numbers and hyphens only (max 64 chars).</div>

<h2>Storage Locations</h2>
<table>
<tr><th>Scope</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Project-level</td><td><code>.claude/skills/</code></td><td><code>.kiro/skills/</code></td></tr>
<tr><td>Personal (global)</td><td><code>~/.claude/skills/</code></td><td><code>~/.kiro/skills/</code></td></tr>
</table>

<h2>The agentskills.io Open Standard</h2>
<p>The <strong>agentskills.io</strong> standard makes SKILL.md files directly portable between Claude Code, Kiro, Cursor, Gemini CLI, Codex CLI, GitHub Copilot, and more. Migration is literally a file copy:</p>
<pre><code># Copy a skill from Claude Code to Kiro
cp -r .claude/skills/my-skill .kiro/skills/

# Copy from Kiro to Claude Code
cp -r .kiro/skills/my-skill .claude/skills/</code></pre>

<h2>Invocation Controls</h2>
<p>Two frontmatter flags control how skills are triggered:</p>
<table>
<tr><th>Flag</th><th>Effect</th><th>Use Case</th></tr>
<tr><td><code>disable-model-invocation: true</code></td><td>User-only activation (slash command)</td><td>Deployment, commits — dangerous to auto-trigger</td></tr>
<tr><td><code>user-invocable: false</code></td><td>AI-only, invisible to users</td><td>Background automation skills</td></tr>
</table>

<h2>Skills vs Steering vs Powers (Kiro)</h2>
<p>Kiro has three distinct extension mechanisms — understanding when to use each is important:</p>
<table>
<tr><th>Mechanism</th><th>Purpose</th><th>Loading</th><th>Best For</th></tr>
<tr><td><strong>Skills</strong></td><td>Portable instruction packages (open standard)</td><td>On-demand via LLM matching</td><td>Reusable workflows across tools</td></tr>
<tr><td><strong>Steering</strong></td><td>Kiro-specific project context</td><td><code>always</code>, <code>auto</code>, <code>fileMatch</code>, <code>manual</code></td><td>Project standards and conventions</td></tr>
<tr><td><strong>Powers</strong></td><td>MCP tools + knowledge bundles</td><td>Dynamic activation by conversation context</td><td>Integrations needing both tools and guidance</td></tr>
</table>

<h2>Bridging the Gap</h2>
<p>Community tools bring each tool's strengths to the other:</p>
<ul>
<li><strong>cc-sdd</strong> — brings Kiro's spec-driven workflow to Claude Code via slash commands (<code>/kiro:spec-init</code>, <code>/kiro:spec-requirements</code>)</li>
<li><strong>claude-kiro</strong> — a Python tool implementing Kiro's methodology as Claude Code commands</li>
</ul>
<div class="note">The main migration effort is converting Claude Code's monolithic <code>CLAUDE.md</code> to Kiro's modular steering system, not the skills themselves.</div>
<hr>
<p><small><strong>Sources:</strong> <a href="https://kiro.dev/docs/skills/">Kiro Skills Documentation</a> · <a href="https://agentskills.io">agentskills.io Open Standard</a> · Research analysis from project compass artifact</small></p>
`},

{id:"hooks-deep-dive",title:"Hooks Deep Dive",content:`
<h1>Hooks Deep Dive — Event-Driven Automation</h1>
<p>Hooks let you attach automated actions to events in the AI coding workflow — formatting code after every file write, running tests when the agent stops, or blocking dangerous commands before they execute. Both Claude Code and Kiro support hooks, but their implementations reveal the deeper philosophical split between the tools: Claude Code leans on deterministic shell commands with security snapshotting, while Kiro offers a richer event palette with 10 trigger types including file system events and spec task lifecycle hooks.</p>

<h2>At a Glance</h2>
<table class="comparison">
<tr><th>Aspect</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Hook events</td><td>23 event types (PreToolUse, PostToolUse, Stop, SessionStart/End, SubagentStart/Stop, FileChanged, and more)</td><td>10 trigger types (Prompt Submit, Agent Stop, Pre/Post Tool Use, File Create/Save/Delete, Pre/Post Task Execution, Manual Trigger)</td></tr>
<tr><td>Handler types</td><td>4 types: shell command, LLM prompt, sub-agent, HTTP endpoint</td><td>2 types: shell command ("Run Command"), agent prompt ("Ask Kiro")</td></tr>
<tr><td>Config location</td><td><code>.claude/settings.json</code> (4 scope levels)</td><td><code>.kiro.hook</code> files in <code>.kiro/hooks/</code> or via the Kiro panel UI</td></tr>
<tr><td>Security</td><td>Snapshotted at session start — mid-session edits ignored</td><td>Live configuration, editable via panel UI</td></tr>
<tr><td>Philosophy</td><td>Deterministic enforcement with granular control</td><td>AI-first automation, more accessible</td></tr>
</table>

<h2>Claude Code Hooks</h2>
<p>Configured in <code>.claude/settings.json</code> with regex matchers against tool names:</p>
<pre><code>{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit|MultiEdit",
      "hooks": [
        { "type": "command", "command": "bun run format || true" }
      ]
    }],
    "Stop": [{
      "hooks": [{
        "type": "prompt",
        "prompt": "Analyze: are all tasks complete?"
      }]
    }]
  }
}</code></pre>
<p>Claude Code supports <strong>23 hook event types</strong> across 5 categories:</p>
<ul>
<li><strong>Lifecycle:</strong> SessionStart, SessionEnd, UserPromptSubmit, Stop, StopFailure</li>
<li><strong>Tool:</strong> PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest</li>
<li><strong>Subagent:</strong> SubagentStart, SubagentStop, TeammateIdle, TaskCreated, TaskCompleted</li>
<li><strong>File/Config:</strong> FileChanged, CwdChanged, ConfigChange, InstructionsLoaded, WorktreeCreate, WorktreeRemove</li>
<li><strong>Other:</strong> PreCompact, PostCompact, Notification</li>
</ul>
<p>Key capabilities unique to Claude Code hooks:</p>
<ul>
<li><strong>HTTP hooks</strong> — POST to external webhooks on any event</li>
<li><strong>Prompt hooks</strong> — single-turn LLM evaluation (yes/no decisions)</li>
<li><strong>Agent hooks</strong> — multi-turn subagent verification</li>
<li><strong>Security snapshotting</strong> — hooks frozen at session start, preventing mid-session tampering</li>
<li><strong>Environment variables:</strong> <code>CLAUDE_PROJECT_DIR</code>, <code>CLAUDE_ENV_FILE</code>, <code>CLAUDE_CODE_REMOTE</code></li>
</ul>

<h2>Kiro Hooks</h2>
<p>In the IDE, hooks are created via the Kiro panel UI or Command Palette (<code>Kiro: Open Kiro Hook UI</code>). In agent JSON configs, hooks use matcher strings:</p>
<pre><code>{
  "hooks": {
    "agentSpawn": [
      { "command": "git status" },
      { "command": "cat .kiro/steering/tech.md" }
    ],
    "postToolUse": [
      { "matcher": "fs_write", "command": "eslint --fix $FILE" }
    ],
    "stop": [
      { "command": "npm test" },
      { "command": "git diff --stat" }
    ]
  }
}</code></pre>
<p>Key capabilities unique to Kiro hooks:</p>
<ul>
<li><strong>Prompt Submit</strong> — trigger actions when the user sends a prompt (shell commands can access <code>USER_PROMPT</code> env var)</li>
<li><strong>Agent Stop</strong> — trigger when the agent completes its turn</li>
<li><strong>File events</strong> — trigger on File Create, File Save, or File Delete with glob patterns</li>
<li><strong>Spec task events</strong> — Pre/Post Task Execution hooks fire when spec tasks change status</li>
<li><strong>Manual Trigger</strong> — on-demand hooks executed manually by the user</li>
<li><strong>Tool name filters</strong> — Pre/Post Tool Use supports categories (<code>read</code>, <code>write</code>, <code>shell</code>, <code>web</code>, <code>spec</code>, <code>*</code>) and prefix filters (<code>@mcp</code>, <code>@powers</code>, <code>@builtin</code>)</li>
<li><strong>.kiro.hook files</strong> — individual hook files creatable through the Kiro panel UI or natural language</li>
</ul>

<h2>Common Hook Patterns</h2>
<h3>Auto-format on file write</h3>
<table>
<tr><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td><pre><code>"PostToolUse": [{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "prettier --write ."
  }]
}]</code></pre></td>
<td><pre><code>"postToolUse": [{
  "matcher": "fs_write",
  "command": "prettier --write $FILE"
}]</code></pre></td></tr>
</table>

<h3>Run tests when agent finishes</h3>
<table>
<tr><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td><pre><code>"Stop": [{
  "hooks": [{
    "type": "command",
    "command": "npm test"
  }]
}]</code></pre></td>
<td><pre><code>"stop": [{
  "command": "npm test"
}]</code></pre></td></tr>
</table>

<div class="note">Claude Code hooks emphasize <strong>deterministic enforcement</strong> with granular control (tool input rewriting, permission decisions, HTTP webhooks). Kiro hooks emphasize <strong>AI-first automation</strong> where the default action is "ask the agent," making hooks more accessible but less predictable.</div>
<hr>
<p><small><strong>Sources:</strong> <a href="https://kiro.dev/docs/hooks/">Kiro Hooks Documentation</a> · <a href="https://kiro.dev/docs/hooks/types/">Hook Types Reference</a> · <a href="https://kiro.dev/docs/hooks/actions/">Hook Actions Reference</a> · Research analysis from kiro-vs-claude-code-technical.md</small></p>
`},

{id:"config-compared",title:"Config Files Compared",content:`
<h1>Configuration Files Compared</h1>
<p>How you teach an AI assistant about your project matters as much as what you teach it. Claude Code and Kiro take different approaches to configuration: Claude Code uses a monolithic CLAUDE.md file (with optional modular rules), while Kiro splits configuration across purpose-specific steering files with intelligent loading modes. This section maps out both systems so you can set up either tool effectively — or migrate between them.</p>

<h2>CLAUDE.md vs .kiro/steering/</h2>
<table class="comparison">
<tr><th>Feature</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Primary config</td><td><code>CLAUDE.md</code> (single file)</td><td><code>.kiro/steering/*.md</code> (multiple files)</td></tr>
<tr><td>Global config</td><td><code>~/.claude/CLAUDE.md</code></td><td><code>~/.kiro/steering/</code></td></tr>
<tr><td>Workspace config</td><td><code>/repo/CLAUDE.md</code></td><td><code>/repo/.kiro/steering/</code></td></tr>
<tr><td>Personal overrides</td><td><code>CLAUDE.local.md</code></td><td>Workspace overrides global</td></tr>
<tr><td>Modular rules</td><td><code>.claude/rules/*.md</code></td><td>Each steering file IS a rule</td></tr>
<tr><td>Conditional loading</td><td>Path-scoped CLAUDE.md files (auto-loaded per directory)</td><td><code>always</code>, <code>fileMatch</code>, <code>manual</code>, <code>auto</code> modes via YAML frontmatter</td></tr>
<tr><td>Team distribution</td><td>Git (commit CLAUDE.md)</td><td>Git + MDM/Group Policy push</td></tr>
<tr><td>AGENTS.md support</td><td>Yes</td><td>Yes</td></tr>
</table>

<h2>Claude Code File Hierarchy</h2>
<pre><code>~/.claude/CLAUDE.md              # Global (all projects)
/repo/CLAUDE.md                  # Project root (git-managed, team-shared)
/repo/CLAUDE.local.md            # Project personal (.gitignore recommended)
/repo/subdir/CLAUDE.md           # Sub-directory (auto-loaded when cwd is that dir)
/repo/.claude/rules/             # Modular rules (recent addition)
    code-style.md
    security.md
    testing.md</code></pre>

<h2>Kiro Steering File Hierarchy</h2>
<pre><code>~/.kiro/steering/                # Global (all workspaces)
/repo/.kiro/steering/            # Workspace-level
    product.md                   # Foundational: product purpose, users, objectives
    tech.md                      # Foundational: tech stack, frameworks, constraints
    structure.md                 # Foundational: file organization, naming, architecture
    api-design.md                # Custom: your API conventions
    security.md                  # Custom: security policies
    testing.md                   # Custom: testing standards</code></pre>

<h2>Kiro Inclusion Modes</h2>
<p>Kiro steering files use YAML frontmatter to control when they load — a feature Claude Code lacks:</p>
<pre><code># Always loaded (default for foundation files)
---
inclusion: always
---

# Only loaded when editing matching files
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"
---

# Never auto-loaded; referenced manually via #steering-file-name in chat
---
inclusion: manual
---

# Auto-included when request matches description (LLM-evaluated)
---
inclusion: auto
name: testing-standards
description: Standards for writing unit and integration tests
---</code></pre>
<div class="note">Conditional loading is powerful for large projects. A <code>fileMatch</code> steering file for test patterns only loads when you're editing tests, keeping context lean the rest of the time.</div>

<h2>AGENTS.md Standard</h2>
<p>Both tools support the emerging <a href="https://agents.md">AGENTS.md</a> open standard. Drop an <code>AGENTS.md</code> file at the workspace root and it is always included by both tools.</p>
<table>
<tr><th>Placement</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>Workspace root</td><td><code>/repo/AGENTS.md</code></td><td><code>/repo/AGENTS.md</code></td></tr>
<tr><td>Global</td><td><code>~/.claude/AGENTS.md</code></td><td><code>~/.kiro/steering/AGENTS.md</code></td></tr>
</table>

<h2>Migration Checklist: CLAUDE.md → Kiro Steering</h2>
<p>The main migration effort when moving between tools:</p>
<ol>
<li>Extract product context from CLAUDE.md → <code>.kiro/steering/product.md</code></li>
<li>Extract tech stack info → <code>.kiro/steering/tech.md</code></li>
<li>Extract project structure → <code>.kiro/steering/structure.md</code></li>
<li>Extract coding conventions → <code>.kiro/steering/code-conventions.md</code></li>
<li>Move <code>.claude/rules/*.md</code> files → <code>.kiro/steering/</code> (rename as needed)</li>
<li>Copy skills directly: <code>cp -r .claude/skills/* .kiro/skills/</code></li>
</ol>
<hr>
<p><small><strong>Sources:</strong> <a href="https://kiro.dev/docs/steering/">Kiro Steering Documentation</a> · <a href="https://kiro.dev/docs/specs/">Kiro Specs Documentation</a> · Research analysis from kiro-vs-claude-code-technical.md</small></p>
`},

{id:"mcp-tools",title:"MCP & Tools Compared",content:`
<h1>MCP & Built-in Tools Compared</h1>
<p>Under the hood, AI coding assistants are only as capable as the tools they can call. Both Claude Code and Kiro provide built-in tools for file I/O, search, and shell access, plus MCP (Model Context Protocol) support for connecting external services like databases, APIs, and monitoring platforms. But the specific tools available, how you configure MCP servers, and how permissions work differ in ways that affect your daily workflow. This section gives you the complete picture.</p>

<h2>Built-in Tools</h2>
<table class="comparison">
<tr><th>Capability</th><th>Claude Code</th><th>Kiro CLI</th></tr>
<tr><td>File read</td><td><code>Read</code></td><td><code>read</code></td></tr>
<tr><td>File write</td><td><code>Write</code></td><td><code>write</code> (with diff view)</td></tr>
<tr><td>Shell commands</td><td><code>Bash</code></td><td><code>shell</code></td></tr>
<tr><td>File search</td><td><code>Glob</code></td><td><code>glob</code> (respects .gitignore)</td></tr>
<tr><td>Content search</td><td><code>Grep</code></td><td><code>grep</code> (respects .gitignore)</td></tr>
<tr><td>Web search</td><td><code>WebSearch</code></td><td><code>web_search</code></td></tr>
<tr><td>Web fetch</td><td><code>WebFetch</code></td><td><code>web_fetch</code> (full/markdown/text modes)</td></tr>
<tr><td>Sub-agents</td><td><code>Task</code></td><td><code>delegate</code> + <code>subagent</code></td></tr>
<tr><td>Todos</td><td><code>TodoRead</code> / <code>TodoWrite</code></td><td><code>todo</code></td></tr>
<tr><td>Notebooks</td><td><code>NotebookRead</code> / <code>NotebookEdit</code></td><td>Not available</td></tr>
<tr><td>Desktop control</td><td><code>ComputerUse</code> (experimental)</td><td>Not available</td></tr>
<tr><td>AWS CLI</td><td>Via Bash</td><td><code>aws</code> (native tool)</td></tr>
<tr><td>Code intelligence</td><td>Built-in</td><td><code>code_intelligence</code> (Tree-sitter/LSP)</td></tr>
<tr><td>Introspection</td><td>Not available</td><td><code>introspect</code></td></tr>
<tr><td>Knowledge base</td><td>Not available</td><td><code>knowledge</code> (vector-indexed)</td></tr>
</table>

<h2>MCP Server Configuration</h2>
<h3>Claude Code</h3>
<p>Config lives in <code>.mcp.json</code> at the project root (git-managed):</p>
<pre><code>{
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
    }
  }
}</code></pre>
<p>Management commands:</p>
<pre><code>claude mcp add --transport stdio my-server node server.js
claude mcp add --transport sse my-server https://api.example.com/mcp
claude mcp list
claude mcp remove my-server</code></pre>

<h3>Kiro CLI</h3>
<p>Config lives in <code>.kiro/settings/mcp.json</code> (workspace) or <code>~/.kiro/settings/mcp.json</code> (user-level). Both are merged; workspace takes precedence.</p>
<pre><code>{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "\${GITHUB_TOKEN}" },
      "disabled": false,
      "autoApprove": ["tool_name"],
      "disabledTools": ["unwanted_tool"]
    },
    "remote-api": {
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer \${API_TOKEN}" }
    }
  }
}</code></pre>
<p>Open config via Command Palette: <code>Kiro: Open workspace MCP config (JSON)</code> or <code>Kiro: Open user MCP config (JSON)</code>.</p>

<h2>Kiro Powers — Pre-Packaged MCP Bundles</h2>
<p>Kiro offers "Powers" — curated bundles that package an MCP server with a knowledge file (<code>POWER.md</code>) and optional steering/hooks. They activate dynamically based on conversation context rather than loading all MCP tools upfront.</p>
<p>Powers are installed via one-click install from the Kiro panel or from <a href="https://kiro.dev">kiro.dev</a>. Each Power adds: MCP server config + POWER.md steering + optional hooks.</p>
<p>Launch partners include: Datadog, Dynatrace, Figma, Neon, Netlify, Postman, Supabase, Stripe, Strands SDK, and AWS Aurora.</p>
<div class="note">Claude Code has no equivalent to Powers — you configure each MCP server and write steering files manually. Powers bundle tools with domain knowledge, lowering the barrier for common integrations.</div>

<h2>Tool Permissions Compared</h2>
<h3>Claude Code — settings.json</h3>
<pre><code>{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(npm test:*)",
      "Read(**)",
      "Write(src/**)"
    ],
    "deny": [
      "Bash(git push:*)",
      "Write(.env*)"
    ]
  }
}</code></pre>

<h3>Kiro CLI — Agent config</h3>
<pre><code>{
  "tools": ["read", "write", "shell"],
  "allowedTools": ["read"],
  "toolsSettings": {
    "shell": {
      "allowedCommands": ["npm test", "git status"],
      "deniedCommands": ["git push .*", "rm -rf .*"],
      "autoAllowReadonly": true
    },
    "write": {
      "allowedPaths": ["./src/**"],
      "deniedPaths": ["./.env*", "./secrets/**"]
    }
  }
}</code></pre>
<div class="note">Claude Code uses glob-style <code>Tool(pattern)</code> syntax in a centralized permissions object. Kiro uses per-tool settings objects in agent configs, with separate <code>allowedCommands</code>/<code>deniedCommands</code> arrays — more verbose but also more explicit.</div>

<h2>Referencing MCP Tools in Agent Configs</h2>
<table>
<tr><th>Pattern</th><th>Claude Code (skills)</th><th>Kiro CLI (agent JSON)</th></tr>
<tr><td>Specific MCP tool</td><td><code>mcp__jira__create_issue</code></td><td><code>@jira/create_issue</code></td></tr>
<tr><td>All tools from server</td><td><code>mcp__jira__*</code></td><td><code>@jira</code></td></tr>
<tr><td>In skill/agent config</td><td><code>allowed-tools:</code> in SKILL.md frontmatter</td><td><code>"tools":</code> array in agent JSON</td></tr>
</table>
<hr>
<p><small><strong>Sources:</strong> <a href="https://kiro.dev/docs/mcp/">Kiro MCP Documentation</a> · <a href="https://kiro.dev/docs/mcp/configuration/">MCP Configuration Reference</a> · <a href="https://kiro.dev/docs/powers/">Kiro Powers Documentation</a> · Research analysis from kiro-vs-claude-code-technical.md</small></p>
`}
];

// Merge all sections
const ALL_SECTIONS = [...SECTIONS, ...SECTIONS2, ...SECTIONS3, ...SECTIONS4];
