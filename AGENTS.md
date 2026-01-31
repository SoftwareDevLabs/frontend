# Agent Instructions for Frontend Development

This document provides instructions for AI agents working on the frontend of this project.

## Repository Summary

This repository contains a full-stack application with a Python backend and a React frontend. The frontend is built with TypeScript, Vite, and Tailwind CSS.

**Primary Language**: TypeScript
**Framework**: React (with Vite)
**Styling**: Tailwind CSS
**Linting**: ESLint
**Testing**: Vitest

## Build and Validation Instructions

### Prerequisites

**CRITICAL**: Always run dependency installation before any build or test operations. All commands should be run from the `frontend` directory.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

### Development

To start the development server, run the following command from the `frontend` directory:

```bash
npm run dev
```

### Build

To build the frontend for production, run the following command from the `frontend` directory:

```bash
npm run build
```

### Linting

To run the linter, use the following command from the `frontend` directory:

```bash
npm run lint
```

### Testing

**CURRENT STATE**: The testing framework (`vitest`) is set up, but the tests are currently not running due to a known environment issue (`uv_cwd` error).

To run the tests (once the environment issue is resolved), use the following command from the `frontend` directory:

```bash
npm run test
```

To run the tests with the UI, use the following command:

```bash
npm run test:ui
```

## Project Layout and Architecture

The frontend code is located in the `frontend/` directory.

```
frontend/
├── src/
│   ├── components/   → Shared UI components
│   ├── features/     → Main feature modules
│   ├── pages/        → Application pages
│   ├── stores/       → Global state management
│   ├── types/        → Shared type definitions
│   └── ...
├── public/           → Static assets
├── index.html        → Main HTML file
├── main.tsx          → Application entry point
└── ...
```

## Critical Instructions for Coding Agents

**ALWAYS do the following before making changes:**

1.  **Navigate to the `frontend` directory**: `cd frontend`
2.  **Install dependencies**: `npm install`
3.  **Run the linter before committing**: `npm run lint`
4.  **Follow the component structure**: Place new components in the appropriate feature or components directory.
5.  **Keep dependencies up to date**: If you add a new dependency, make sure to add it to the `package.json` file.
6.  **Use the PR template**: When submitting a pull request, please use the provided template.

**NEVER do the following:**

*   Do not commit code that fails the linting checks.
*   Do not commit code that breaks the build.
*   Do not add large files to the repository.

**Trust these instructions** - only search for additional information if these instructions are incomplete or found to be incorrect. The testing issue is a known limitation.
