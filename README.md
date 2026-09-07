# PromptForge

PromptForge is an open-source browser extension that improves prompts before they are sent to AI platforms.

The goal is simple:

**Write a prompt → Improve it → Get better instructions → Get better results**

PromptForge is being built as a platform-based project, where each AI platform can have its own integration, UI theme, prompt detection, and platform-specific behavior.

## Current Status

### Claude

Claude is currently the first fully working PromptForge integration.

It supports:

- Automatic prompt detection from the Claude chat input
- Gemini-powered prompt optimization
- Structured optimized prompts
- Editable optimized prompts
- One-click copying to the clipboard
- Light and dark mode
- Claude-specific PromptForge UI
- AI platform selector

### Coming Soon

PromptForge is planned to support additional AI platforms, including:

- ChatGPT
- Gemini
- Grok
- DeepSeek
- Perplexity
- Lovable
- And more

The project is intended to be open-source, so contributors can help build integrations for different AI platforms.

## Tech Stack

### Extension

- React
- TypeScript
- Vite
- Tailwind CSS
- Chrome/Brave Extension Manifest V3

### Backend

- Node.js
- Express
- TypeScript
- Google Gemini API

## Project Structure

```text
PromptForge/
├── Platforms/
│   └── Claude/
│       └── Extension/
│           ├── public/
│           ├── src/
│           │   ├── App.tsx
│           │   └── content.ts
│           ├── index.html
│           ├── package.json
│           └── vite.config.ts
│
├── Backend/
│   ├── server.ts
│   ├── package.json
│   └── package-lock.json
│
├── README.md
├── LICENSE
└── .gitignore
