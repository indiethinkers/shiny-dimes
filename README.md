# Shiny Dimes

A dual-platform application for discovering high-quality Substack essays, available as both a web application and Chrome extension. Each time you open the app, it displays a different "card" featuring a carefully curated essay with its title, short blurb, author, and link to the full piece.

## Features

- Clean, distraction-free interface optimized for both web and browser extension
- Random essay selection on each load
- Direct links to original Substack posts
- Offline support with fallback content
- Chrome extension for quick access while browsing

## Tech Stack

### Web Application
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Chrome Extension
- Vanilla JavaScript
- HTML/CSS

## Getting Started

### Web Application
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Chrome Extension
1. Navigate to the `chrome-extension` directory
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `chrome-extension` directory

## Project Structure

```
├── src/                  # Web application source
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── data/            # Static JSON data
│   └── lib/             # Utility functions
└── chrome-extension/     # Chrome extension source
    ├── icons/           # Extension icons
    ├── app.js           # Extension logic
    ├── stories.js       # Content data
    └── styles.css       # Extension styles
```

## Deployment

This project is optimized for deployment on Vercel. Simply connect your repository and deploy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
