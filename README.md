# AI Chat Application UI

A production-quality ChatGPT/Gemini-style chat interface built with React + Vite.

## Features
- Live AI responses via Anthropic Claude API
- Typewriter streaming animation
- Full Markdown rendering (bold, italic, tables, lists, blockquotes)
- Syntax-highlighted code blocks with Copy button
- Chat history with rename & delete (persisted in localStorage)
- Dark / Light theme toggle
- Responsive sidebar with collapse
- Grouped history (Today / Yesterday / Older)
- Settings modal for API key

## Tech Stack
- React 18 + Vite
- react-markdown + remark-gfm
- react-syntax-highlighter (Prism)
- lucide-react (icons)
- CSS custom properties (no Tailwind needed)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Add your API key
- Click the ⚙️ Settings icon (top right)
- Paste your Anthropic API key (`sk-ant-...`)
- Get one free at https://console.anthropic.com

### 4. Build for production
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx / .css        ← Chat history sidebar
│   ├── TopBar.jsx / .css         ← Header with theme toggle
│   ├── ChatWindow.jsx / .css     ← Main chat area + logic
│   ├── Message.jsx / .css        ← Individual message + markdown
│   ├── CodeBlock.jsx / .css      ← Syntax highlighted code
│   ├── TypingIndicator.jsx / .css← Animated typing dots
│   ├── WelcomeScreen.jsx / .css  ← Empty state + suggestions
│   ├── InputBox.jsx / .css       ← Message input
│   └── ApiKeyModal.jsx / .css    ← Settings modal
├── context/
│   ├── ThemeContext.jsx           ← Dark/light theme
│   └── ChatContext.jsx            ← Global chat state
├── utils/
│   └── api.js                     ← Anthropic API calls
├── styles/
│   ├── global.css                 ← Variables, resets, animations
│   └── app.css                    ← Layout
└── main.jsx
```

## Notes
- API key is stored in `localStorage` (browser only, never sent anywhere else)
- Chat history stored in `localStorage`
- No backend required — fully frontend
