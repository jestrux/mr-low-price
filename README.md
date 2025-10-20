# Massawe Mr. Low Price

A simple, clean phone price listing app built with React, TypeScript, and Tailwind CSS.

## Features

- Clean black and white UI design
- Responsive layout that works on mobile and desktop
- Grouped phone listings by brand with sticky headers
- Filter options for Vioo and System Charge
- Price display in Tanzanian Shillings (TSH)

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment Setup

1. Go to your repository Settings
2. Navigate to Pages
3. Under "Build and deployment", select "GitHub Actions" as the source

The app will be available at: `https://yourusername.github.io/mr-low-price/`

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Tailwind directives
├── public/              # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
└── index.html           # HTML template
```

## License

MIT
