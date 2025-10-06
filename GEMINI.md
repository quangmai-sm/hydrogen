# Gemini Code Analysis: Shopify Hydrogen Storefront

## Project Overview

This project is a Shopify Hydrogen storefront, built with the Skeleton template. It serves as a minimal starting point for developing a headless commerce experience. The application is built using React, TypeScript, and Vite, with routing handled by React Router. It leverages Shopify's Storefront API via GraphQL for product data and customer accounts. Styling is implemented with Tailwind CSS.

The project is structured to work with Oxygen, Shopify's deployment platform for Hydrogen storefronts.

**Key Technologies:**

*   **Framework:** Shopify Hydrogen / React Router
*   **Language:** TypeScript
*   **UI Library:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **API:** GraphQL (Shopify Storefront API)
*   **Deployment:** Shopify Oxygen

## Documentation
https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started

## Building and Running

The following commands are available in `package.json` to manage the application lifecycle:

*   **Development:** To start the local development server with hot-reloading and code generation.
    ```bash
    npm run dev
    ```

*   **Build:** To build the application for production. This includes code generation.
    ```bash
    npm run build
    ```

*   **Preview:** To preview the production build locally.
    ```bash
    npm run preview
    ```

*   **Linting:** To run ESLint and check for code quality issues.
    ```bash
    npm run lint
    ```

*   **Type Checking:** To run the TypeScript compiler and check for type errors.
    ```bash
    npm run typecheck
    ```

*   **Code Generation:** To manually generate TypeScript types from the GraphQL schema.
    ```bash
    npm run codegen
    ```

## Development Conventions

*   **Code Style:** The project uses Prettier for automated code formatting, with the configuration defined in `package.json` (`@shopify/prettier-config`).
*   **Linting:** ESLint is configured in `eslint.config.js` to enforce code quality and consistency.
*   **File-based Routing:** The application uses a file-based routing system managed by React Router. Routes are defined in the `app/routes/` directory.
*   **GraphQL:** GraphQL queries and mutations are located in the `app/graphql/` directory. The project is configured to automatically generate TypeScript types from these GraphQL operations.
*   **Component Structure:** Reusable React components are located in the `app/components/` directory.
