# GEMINI.md

## Project Overview

This is a Hydrogen project, a Shopify stack for headless commerce. It uses Remix as its underlying framework. The project is set up with a minimal set of components, queries, and tooling to get started with Hydrogen.

**Main Technologies:**

*   **Hydrogen:** Shopify's stack for headless commerce.
*   **Remix:** A full-stack web framework.
*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A build tool that provides a faster and leaner development experience.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **GraphQL:** A query language for APIs.
*   **TypeScript:** A typed superset of JavaScript.

**Architecture:**

The project follows a standard Remix application structure. The entry point for the server is `server.ts`, which creates a Hydrogen context and handles requests. The main application code is in the `app` directory, with the root component being `app/root.tsx`. The project uses file-based routing, with routes defined in the `app/routes` directory.

## Building and Running

**Development:**

To run the project in development mode, use the following command:

```bash
npm run dev
```

**Production:**

To build the project for production, use the following command:

```bash
npm run build
```

**Linting:**

To lint the project, use the following command:

```bash
npm run lint
```

**Type Checking:**

To perform type checking, use the following command:

```bash
npm run typecheck
```

## Shopify Hydrogen Documentation

This section provides a brief overview of important commands and concepts for working with Shopify Hydrogen. For more detailed information, please refer to the official [Hydrogen repository](https://github.com/Shopify/hydrogen).

### Getting Started

To create a new Hydrogen project, you can use one of the following commands, depending on your needs:

*   **Default template:** `npm create @shopify/hydrogen@latest`
*   **B2B template:** `npm create @shopify/hydrogen@latest -- --template b2b`
*   **Multipass template:** `npm create @shopify/hydrogen@latest -- --template multipass`

### Important Packages

When working with Hydrogen, you may need to install the following packages:

*   **`@shopify/hydrogen`:** Provides opinionated tools and utilities for building commerce applications with Remix.
*   **`@shopify/hydrogen-react`:** Offers unopinionated and performant Shopify-specific commerce components, hooks, and utilities.
*   **`@shopify/cli-hydrogen`:** The Hydrogen extension for the Shopify CLI, used for managing Hydrogen projects.
*   **`@shopify/mini-oxygen`:** A local runtime for Hydrogen apps that simulates the Oxygen production environment.

### Development

To start the local development server, run the following command:

```bash
npm run dev
```
