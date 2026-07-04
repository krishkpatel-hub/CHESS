# NeoChess

NeoChess is a futuristic React chess interface built on top of the original Java
terminal chess project. The Java source remains in `Chess/` for reference, while
the modern frontend lives at the repository root.

## Features

- React + Vite frontend
- TailwindCSS styling
- Framer Motion animations
- lucide-react icons
- Futuristic glassmorphism game layout
- CSS-designed sci-fi chess pieces, no external images
- Two-player local interaction
- Legal move validation for standard chess pieces
- Legal move highlighting
- Current turn display
- Move history
- Captured pieces panel
- Check, checkmate, and stalemate detection
- Game-over overlay with rematch/reset

## Project Structure

```text
.
├── Chess/                 # Original Java terminal chess project
├── src/
│   ├── components/        # React UI components
│   ├── game/              # Chess state, rules, and move logic
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

This version focuses on a polished frontend experience and core chess status
detection. Advanced rules such as castling, en passant, pawn promotion, and draw
conditions beyond stalemate are not implemented yet.
