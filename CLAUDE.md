# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build → /dist
npm run preview      # Serve production build locally
```

No test runner or linter is configured.

## Environment

Copy `.env.example` to `.env` and set:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

## Architecture

**React 18 + Vite + Tailwind CSS** SPA that calls the Anthropic API directly from the browser (`dangerouslyAllowBrowser: true` — intended for local use only).

### Two independent apps in one repo

`src/main.jsx` routes based on `window.location.pathname`:
- `/` → `App.jsx` — the ENEM essay corrector
- `/funil` → `funil/FunilApp.jsx` — an 11-screen sales funnel

### Essay corrector flow (`App.jsx`)

Three sequential screens managed by a `currentScreen` state: `form` → `loading` → `result`.

- **EssayForm** — collects theme (min 5 chars) and essay text (100–3000 chars)
- **LoadingScreen** — animated status messages while the API call runs
- **ResultScreen** — displays total score (0–1000) and per-competency breakdown

### AI services

| File | Purpose |
|------|---------|
| `src/services/anthropic.js` | Full ENEM scoring — detailed system prompt, returns 5 competency scores (multiples of 40, 0–200 each) + feedback |
| `src/services/anthropicDemo.js` | Simplified version used in the funnel demo screens |

The API key is read from `import.meta.env.VITE_ANTHROPIC_API_KEY`.

### Funnel (`src/funil/`)

`FunilApp.jsx` orchestrates 11 numbered screens (`Tela1.jsx`–`Tela11.jsx`) plus `DemoScreen`, `DiagnosticoScreen`, `PitchScreen`, and `QuizScreen`. State flows forward through the screens; the funnel includes a demo correction step using `anthropicDemo.js`.

### Styling

Custom Tailwind brand colors (purple palette `#f5f3ff`→`#4c1d95`) defined in `tailwind.config.js`. Reusable utility classes (`.btn-primary`, `.card`, `.input-base`) and animations (`fadeSlideUp`, `score-fill`) are in `src/index.css`.

### ENEM scoring rules

Each of the 5 competencies scores 0–200 in multiples of 40. Total is the sum (0–1000). ENEM 2026 reference date: November 8, 2026.
