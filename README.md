# Cards

A minimalist web application that helps readers discover high-quality Substack essays. Each time you open the app, it displays a different "card" featuring a title, short blurb, author, and link to the full piece.

## Features

- Clean, distraction-free interface
- Random essay selection on each load
- Direct links to original Substack posts
- Offline support with fallback content

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Getting Started

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

## Project Structure

```
src/
  ├── app/              # Next.js app directory
  ├── components/       # React components
  ├── data/            # Static JSON data
  └── lib/             # Utility functions
```

## Deployment

This project is optimized for deployment on Vercel. Simply connect your repository and deploy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
