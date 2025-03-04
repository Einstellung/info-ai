# Info AI

A powerful canvas-based AI workspace for creative projects.

## Features

- Interactive canvas with drag-and-drop functionality
- Node-based workflow creation
- Modern UI with Ant Design components
- Responsive layout

## Getting Started

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Project Structure

```
info-ai/
├── apps/
│   └── web/                 # Web application
│       ├── src/
│       │   ├── components/  # Reusable components
│       │   ├── pages/       # Page components
│       │   ├── routes/      # Routing configuration
│       │   ├── stores/      # State management
│       │   ├── utils/       # Utility functions
│       │   ├── App.tsx      # Main App component
│       │   └── main.tsx     # Entry point
│       └── index.html       # HTML template
├── packages/                # Shared packages (future)
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Canvas Features

The canvas is built using ReactFlow and provides:

- Node creation and connection
- Drag-and-drop functionality
- Node customization
- Workflow visualization

## Future Enhancements

- Custom node types
- Node data persistence
- AI integration for content generation
- Collaboration features 