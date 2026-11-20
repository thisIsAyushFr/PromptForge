# PromptForge

PromptForge is an open-source browser extension that improves prompts before they are sent to AI platforms.

The goal is simple:

**Write a prompt → Improve it → Get better instructions → Get better results**

PromptForge is being built as a platform-based project, where each AI platform can have its own integration, UI theme, prompt detection, and platform-specific behavior.

## Current Status

### Claude

Claude is the first fully working PromptForge integration.

It supports:

- Automatic prompt detection from the Claude chat input
- Gemini-powered prompt optimization
- Structured optimized prompts
- Editable optimized prompts
- One-click copying to the clipboard
- Light and dark mode
- Claude-specific PromptForge UI

### Gemini

Gemini support has been added with its own blue theme.

It supports:

- Running on `gemini.google.com` (content script registered alongside Claude)
- Gemini-specific blue PromptForge theme

### AI Platform Selection

- AI platform selector in the extension popup
- Automatic detection of the AI platform from the active browser tab

### Coming Soon

PromptForge is planned to support additional AI platforms, including:

- ChatGPT
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

```
PromptForge/
├── Platforms/
│   └── Claude/
│       └── Extension/
│           ├── public/
│           │   └── manifest.json
│           ├── src/
│           │   ├── AISelection.tsx
│           │   ├── App.tsx
│           │   ├── content.ts
│           │   ├── gemini.ts
│           │   ├── index.css
│           │   └── main.tsx
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
```

## Contributors

Thanks to everyone who has contributed to PromptForge:

- [@thisIsAyushFr](https://github.com/thisIsAyushFr) – creator and maintainer; Claude integration, backend, project structure and UI redesign
- [@anaminoor](https://github.com/anaminoor) – Gemini support with blue theme and automatic AI detection from the active tab ([#1](https://github.com/thisIsAyushFr/PromptForge/pull/1))

Want to add support for another AI platform? Pull requests are welcome.
