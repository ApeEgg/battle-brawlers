# Mini Fighters

Mini Fighters is an opinionated monorepo for building multiplayer-friendly browser games with a Svelte frontend and a Bun-powered backend. The project is currently under active development, but the tooling, folder layout, and conventions in this repository are already set up to help you ship experiments quickly and deploy them to modern hosting providers.

## Tech stack

- **Frontend:** [Svelte](https://svelte.dev) + [Vite](https://vitejs.dev) with Tailwind CSS for styling.
- **Backend:** [Bun](https://bun.sh) runtime hosting a websocket-ready API.
- **Database:** [MongoDB](https://www.mongodb.com) for persistence.
- **Deployment:** Ready for [Render](https://render.com) (backend) and [Vercel](https://vercel.com) (frontend).

## Repository layout

| Path | Description |
| --- | --- |
| `src/` | Main Svelte application, routes, stores, and styling helpers. |
| `static/` | Static assets served by the frontend. |
| `scripts/` | Utility scripts that support development and deployment. |
| `svelte-game-server/` | Bun-based websocket server and supporting helpers. |
| `svelte-game-engine/` | Shared engine code that powers core gameplay systems. |

## Prerequisites

- [Node.js](https://nodejs.org) 20 (run `nvm use` to match the `.nvmrc`).
- [Bun](https://bun.sh) 1.x for running the realtime server.
- Access to a MongoDB instance.
- (Optional) Accounts on Render and Vercel if you plan to use the provided deployment pipelines.

## Getting started

### 1. Install dependencies (frontend)

```bash
nvm use
npm install
```

### 2. Run the client locally

```bash
npm run dev
```

By default Vite serves the app on <http://localhost:5173>. The dev server will reload automatically as you edit files inside `src/`.

### 3. Configure environment for the server

Create a `.env` file in the repository root with values similar to the following:

```dotenv
PORT=1337
CORS_ORIGIN=*
NODE_ENV=development
MONGO_CONNECT=mongodb://wsadmin:qwe123@localhost:27017
SUPPORT_EMAIL_PASSWORD=<password>
PASSWORD_RESET_HASH=<custom_hash>
```

### 4. Install dependencies and run the Bun server

```bash
cd svelte-game-server
bun install  # or npm install
bun run dev
```

The server listens on the port specified in your `.env` file and exposes websocket-based APIs consumed by the Svelte client.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build of the frontend. |
| `npm run preview` | Preview the production build locally. |
| `npm run check` | Run SvelteKit sync and type checks. |
| `npm run lint` | Run Prettier in check mode and ESLint. |
| `npm run format` | Apply formatting with Prettier. |

## Features

- ✅ Websocket server built on [`async-await-websockets`](https://github.com/kkortes/async-await-websockets) for realtime communication.
- ✅ Account management: log in, sign up, and password recovery flows.
- ✅ Notification center for surfacing game and account events.
- ✅ Tailwind CSS utilities for rapid UI iteration.
- ✅ Ready-to-use hosting blueprints for Render (backend) and Vercel (frontend).

## Development notes

- Global styling often looks like `:global(.anElement .anotherElement.anotherElement)`. This pattern ensures consistent class scoping between development and production builds.
- Environment files (`.env` for development and `.env.production` for production) are surfaced via `src/constants/ENV_VARS.js`, because directly referencing `import.meta.*` inside `.svelte` files can cause Vite to choke on embedded styles.
- [`sveltekit-autoimport`](https://github.com/yuanchuan/sveltekit-autoimport) is configured in `vite.config.js`. Many imports inside `.svelte` and `.js` files are provided automatically, with commonly used store logic abstracted into `src/store` for easier consumption.

## Contributing

This is an evolving personal project. If you spot a bug or have ideas, feel free to open an issue or fork the repository and experiment.
