# React + TypeScript + Vite Project Setup

## Overview
This is a modern React application built with TypeScript and Vite, providing a fast development experience with Hot Module Reloading (HMR) and strict ESLint rules.

## Project Structure
```
task6_reack/
├── src/                    # Source code directory
├── public/                 # Static assets
├── index.html             # Entry HTML file
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript root configuration
├── tsconfig.app.json      # TypeScript app configuration
├── tsconfig.node.json     # TypeScript Node configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project dependencies
└── README.md              # Documentation
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts the Vite development server with HMR enabled.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality.

## Technology Stack
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool and dev server
- **ESLint** - Code quality and style enforcement

## Available Plugins

### @vitejs/plugin-react
Uses [Oxc](https://oxc.rs) for JSX transformation.

### @vitejs/plugin-react-swc
Uses [SWC](https://swc.rs/) for faster JSX compilation (alternative).

## ESLint Configuration

### Type-Aware Linting
For production applications, enable type-aware lint rules by updating `eslint.config.js`:

```js
tsel eslint.configs.recommendedTypeChecked  // Basic type checking
tsel eslint.configs.strictTypeChecked       // Stricter rules
tsel eslint.configs.stylisticTypeChecked    // Style-related rules
```

### React Plugin Extensions
Install and configure React-specific linting:

```bash
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
```

Then add to your ESLint config:
```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  {
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])
```

## React Compiler

The React Compiler is not enabled by default due to performance impacts. To enable it, see the [React Compiler Installation Guide](https://react.dev/learn/react-compiler/installation).

## Project Dependencies
See `package.json` for complete dependency list and versions.

## Contributing
1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Build for production: `npm run build`
5. Submit a pull request

## License
Check the repository for license information.

## Support
For issues or questions, please open an issue in the repository.
