# Frontend folder

This directory contains all the relevant source code important to the software.

```
📁 Frontend/ → The core engine — all logic lives here:
├── components/ → All shared components that are used across the entire application
│
├── composables/ → All shared composables
│
├── config/ → Application configuration files
│
├── features/ → Contains all the application features. We want to keep most of the application code inside here
│
├── layouts/ → Different layouts for the pages
│
├── lib/ → Configurations for different third-party libraries that are used in our application
│
├── pages/ → The pages of our application
│
├── services/ → Shared application services and providers
│
├── stores/ →  Global state stores
│
├── types/ → Shared TypeScript type definitions
│
└── utils/ → Shared utility functions

```

This is detailed folder structure for the frontend application: ![Frontend Folder Structure](/doc/images/frontend_folder_structure.webp)

## Development

To get started, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

## Linting

To run the linter, use the following command:

```bash
npm run lint
```

## Testing

To run the tests, use the following command:

```bash
npm run test
```

**Note:** The tests are currently not running due to a known environment issue. See `AGENTS.md` for more details.