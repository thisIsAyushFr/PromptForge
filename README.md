# PromptForge

PromptForge is a browser extension that helps improve prompts before sending them to AI.

## Current MVP

PromptForge currently supports:

- Claude as the target AI platform
- Automatic prompt detection from the Claude chat input
- Gemini-powered prompt optimization
- Copy optimized prompts directly to the clipboard
- Light and dark mode
- Claude, ChatGPT, and Gemini selector UI
- ChatGPT and Gemini support marked as coming soon

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
├── Extension/
│   ├── public/
│   └── src/
│       ├── App.tsx
│       ├── content.ts
│       └── gemini.ts
│
├── Backend/
│   ├── server.ts
│   ├── package.json
│   └── package-lock.json
│
└── README.md