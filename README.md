# Kiro CLI Tutorial

An interactive web-based tutorial for learning [Kiro CLI](https://github.com/evilsquid888/kiro-cli), an AI-powered coding assistant that runs in your terminal.

## Features

- Step-by-step walkthrough of all Kiro CLI commands and concepts
- Interactive progress tracking with localStorage persistence
- Sidebar navigation with completion indicators
- Keyboard shortcut reference, slash command docs, agent configuration, MCP servers, and more
- Dark-themed UI optimized for developer readability
- Responsive design with mobile support

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)

### Installation

```bash
npm install
```

### Running Locally

Serve the static files with any HTTP server. For example, using the included `serve` dependency:

```bash
npx serve .
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── index.html              # Main HTML entry point
├── app.js                  # Application logic (navigation, progress tracking)
├── data.js                 # Tutorial content (all sections and text)
├── style.css               # Styling (dark theme)
├── tests/
│   └── tutorial.spec.js    # Playwright end-to-end tests
├── package.json
└── playwright.config.js    # Playwright test configuration
```

## Running Tests

Tests use [Playwright](https://playwright.dev/) for end-to-end browser testing.

```bash
npx playwright install
npx playwright test
```

## Tutorial Sections

The tutorial covers:

- **Getting Started** — Installation, starting sessions, keyboard shortcuts
- **Slash Commands** — All available commands (`/help`, `/context`, `/model`, `/agent`, `/tools`, `/mcp`, `/code`, etc.)
- **Steering Files** — Configuring project, tech, and structure docs
- **Agent Configuration** — Creating and customizing agents
- **MCP Servers** — Setting up Model Context Protocol integrations
- **Settings** — Configuring Kiro CLI behavior
- **Kiro CLI vs Claude Code** — Feature comparison reference

## License

ISC
