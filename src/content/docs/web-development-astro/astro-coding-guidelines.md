---
title: Astro Coding Guideline
description: This document outlines the coding guidelines for Astro projects, designed to promote consistency, maintainability, and leverage Astro's unique performance characteristics. Adhering to these guidelines will help ensure high-quality, scalable, and performant web experiences.
---

This document outlines the coding guidelines for Astro projects, designed to promote consistency, maintainability, and leverage Astro's unique performance characteristics. Adhering to these guidelines will help ensure high-quality, scalable, and performant web experiences.

## 1. Core Astro Principles

Astro's philosophy is "web first" and "performance by default." These guidelines emphasize:

-   **Islands Architecture:** Ship minimal JavaScript to the client. Interactivity should be isolated to "islands" (framework components) where necessary.
-   **Content-Driven:** Astro excels at delivering static, content-rich pages.
-   **Server-First Rendering:** Prefer fetching and rendering content on the server (build time or SSR) whenever possible.

## 2. Project Structure & Naming Conventions

Maintain a consistent and logical file structure.

-   **`src/pages/`**: Contains `.astro` files that become routes.
    -   **Naming:** Use `kebab-case` for file names (e.g., `about-us.astro`, `blog/[slug].astro`).
    -   **Index Files:** `index.astro` for the root of a directory.
-   **`src/layouts/`**: Contains `.astro` files for shared page layouts.
    -   **Naming:** Use `PascalCase` for component names (e.g., `BaseLayout.astro`, `BlogLayout.astro`).
-   **`src/components/`**: Contains reusable Astro components (`.astro`) and framework components (e.g., `.jsx`, `.vue`).
    -   **Astro Components Naming:** Use `PascalCase` for component names (e.g., `Card.astro`, `HeroSection.astro`).
    -   **Framework Components Naming:** Use `PascalCase` for component names (e.g., `InteractiveMap.jsx`, `AddToCartButton.vue`).
-   **`src/content/`**: For content collections (e.g., Markdown, MDX).
    -   **Naming:** Use `kebab-case` for collection directories and individual content files (e.g., `src/content/blog/my-first-post.md`).
-   **`src/styles/`**: For global CSS files or shared utility styles.
    -   **Naming:** Use `kebab-case` (e.g., `global.css`, `variables.css`).
-   **`src/assets/`**: For static assets that might be processed by Vite (e.g., images, fonts, icons that aren't in `public`).
-   **`public/`**: For static assets that are served directly without processing (e.g., `favicon.ico`, `robots.txt`, images that don't need optimization).
-   **`src/actions/`**: For Astro Actions (server-side functions callable from the client).
    -   **Naming:** Use `camelCase` for action names (e.g., `submitForm.ts`).
-   **`src/lib/` or `src/utils/`**: For reusable utility functions, helper modules, or API client configurations.
    -   **Naming:** Use `camelCase` for file names (e.g., `apiClient.ts`, `dateUtils.ts`).

## 3. Astro Components (`.astro` files)

Astro components are the building blocks of your Astro project.

### 3.1. Frontmatter (Code Fence `---`)

-   **Purpose:** This section is for JavaScript/TypeScript code that runs **only on the server** (build time or SSR).
-   **Imports:** Place all `import` statements at the top of the frontmatter.
-   **Data Fetching:** Prefer `await fetch()` or database queries directly in the frontmatter for static or server-rendered data.

    ```
    ---
    import BaseLayout from '../layouts/BaseLayout.astro';
    import Card from '../components/Card.astro';

    // Fetch data on the server (build time or SSR)
    const response = await fetch('https://api.example.com/products');
    const products = await response.json();

    const pageTitle = "Our Products";
    ---
    ```

-   **TypeScript:** Always use TypeScript in your frontmatter for type safety. Define props clearly.

    ```
    ---
    interface Props {
      title: string;
      description?: string;
    }

    const { title, description } = Astro.props;
    ---
    ```

-   **Minimal Logic:** Keep frontmatter logic focused on data preparation for the template. Complex business logic should reside in separate utility files or API endpoints.

### 3.2. Template (HTML/JSX-like)

-   **HTML First:** Write as much standard HTML as possible. Astro's strength is shipping minimal JavaScript.
-   **Component Usage:** Use Astro components with PascalCase tags.
    ```
    <BaseLayout title={pageTitle}>
      <Card title="Product A" price={19.99} />
    </BaseLayout>
    ```
-   **Slots:** Use `<slot />` for injecting content into layouts or wrapper components.
    -   Default slot: `<slot />`
    -   Named slots: `<slot name="header" />`, `<slot name="footer" />`
    ````
    <!-- In BaseLayout.astro -->
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer><slot name="footer" /></footer>
    ```astro
    <!-- In a page using BaseLayout -->
    <BaseLayout>
      <Fragment slot="header">
        <h1>My Custom Header</h1>
      </Fragment>
      <p>Main content goes here.</p>
      <Fragment slot="footer">
        <p>Custom Footer Text</p>
      </Fragment>
    </BaseLayout>
    ````
-   **Conditional Rendering:** Use standard JavaScript ternary operators or logical AND (`&&`) for simple conditionals. For more complex logic, prepare variables in the frontmatter.
    ```
    ---
    const isLoggedIn = true;
    ---
    {isLoggedIn ? <p>Welcome back!</p> : <a href="/login">Login</a>}
    ```
-   **List Rendering:** Use `Array.prototype.map()` for rendering lists of items. Remember to use a `key` prop when rendering framework components in a list.
    ```
    <ul>
      {products.map(product => (
        <li>{product.name} - ${product.price}</li>
      ))}
    </ul>
    ```

### 3.3. Styling

-   **Scoped Styles:** Use `<style>` tags within `.astro` components for component-specific CSS. These styles are automatically scoped to the component.
    ```
    <style>
      h1 {
        color: navy;
      }
    </style>
    ```
-   **Global Styles:** For global styles (e.g., base typography, utility classes, Tailwind CSS imports), create CSS files in `src/styles/` and import them into your main layout.
    ````
    /* src/styles/global.css */
    body {
      font-family: sans-serif;
    }
    ```astro
    <!-- In BaseLayout.astro -->
    <style is:global>
      @import '../styles/global.css';
    </style>
    ````
-   **Tailwind CSS:** If using Tailwind, prefer its utility classes directly in your HTML for styling. This aligns well with Astro's zero-JS philosophy.

## 4. Framework Components (Islands)

Use framework components (React, Vue, Svelte, etc.) only when interactivity is required.

-   **Purpose:** These are "islands" of interactivity. They should be as small and self-contained as possible.
-   **Client Directives:** Always specify a `client:` directive to control when the component hydrates (becomes interactive on the client).
    -   `client:load`: Hydrates immediately on page load. Use sparingly for critical interactive components.
    -   `client:idle`: Hydrates when the browser is idle. Good for non-critical interactive elements.
    -   `client:visible`: Hydrates when the component enters the viewport. Ideal for components "below the fold."
    -   `client:media={query}`: Hydrates when a specific media query is met.
    -   `client:only={framework}`: Hydrates only on the client, useful for components that rely heavily on browser APIs or have no server-side rendering equivalent.
    ```
    <AddToCartButton client:load product={productData} />
    <ImageCarousel client:visible images={galleryImages} />
    ```
-   **Data Flow:** Pass data to framework components via props from the Astro parent component. Avoid fetching data inside framework components if it can be fetched in Astro's frontmatter.
-   **State Management:** Keep component state local to the island. For shared state across multiple islands, consider a lightweight global state solution (e.g., React Context, Zustand, or a simple Pub/Sub pattern) but evaluate if it's truly necessary to avoid over-hydration.

## 5. Data Fetching

Prioritize performance by fetching data at the optimal stage.

-   **Server-Side Fetching (Build Time/SSR):**
    -   **When:** For static content, content from a headless CMS, or data that doesn't change frequently.
    -   **Where:** Directly in the Astro component's frontmatter (`.astro` file) or within Astro API Endpoints.
    -   **Benefits:** Faster initial page load, better SEO, less client-side JavaScript.
-   **Client-Side Fetching (Hydrated Islands):**
    -   **When:** For highly dynamic content that changes frequently, user-specific data, or data that is only needed after user interaction.
    -   **Where:** Inside a hydrated framework component (e.g., `useEffect` in React, `onMounted` in Vue).
    -   **Considerations:** Can impact Core Web Vitals if not managed carefully. Use loading states and skeleton UIs.

## 6. API Endpoints (`src/pages/api/`)

Astro's API endpoints provide server-side functionality.

-   **Purpose:** Handle form submissions, interact with databases, integrate with third-party APIs (like Stripe), and perform any logic that requires server-side execution or sensitive keys.
-   **Security:**
    -   **Never expose sensitive API keys (e.g., Stripe Secret Key) directly in client-side code.** All calls requiring these must go through an API endpoint.
    -   Validate all incoming data from the client.
-   **`export const prerender = false;`:** For any API endpoint that needs to be dynamic (i.e., not pre-built at compile time), you **must** include this line in its frontmatter.

    ```
    ---
    export const prerender = false;

    import type { APIRoute } from 'astro';
    import Stripe from 'stripe';

    const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-09-30', // Use your desired API version
    });

    export const POST: APIRoute = async ({ request }) => {
      // Logic to create Stripe Checkout Session or PaymentIntent
      return new Response(JSON.stringify({ success: true }));
    };
    ---
    ```

-   **Error Handling:** Implement robust error handling and return appropriate HTTP status codes.

## 7. Performance Optimization

Astro's core strength is performance.

-   **Default to Static:** Always strive to render as much as possible as static HTML.
-   **Minimize Client-Side JS:** Only hydrate components that absolutely need interactivity. Avoid `client:load` unless essential for above-the-fold content.
-   **Image Optimization:** Use Astro's built-in `Image` component (`astro:assets`) for responsive images and automatic optimization.
-   **Font Loading:** Optimize font loading to prevent layout shifts (e.g., `font-display: swap`).
-   **Third-Party Scripts:** Be mindful of third-party scripts (analytics, ads). Use `is:inline` sparingly and consider tools like Partytown for offloading scripts to a web worker.

## 8. Accessibility (A11y)

Build inclusive web experiences.

-   **Semantic HTML:** Use appropriate HTML5 semantic elements (e.g., `<nav>`, `<main>`, `<aside>`, `<footer>`, `<button>`, `<form>`).
-   **ARIA Attributes:** Use ARIA attributes (`aria-label`, `aria-describedby`, `role`, etc.) when semantic HTML isn't sufficient to convey meaning to assistive technologies.
-   **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible and have clear focus indicators.
-   **Color Contrast:** Maintain sufficient color contrast for text and interactive elements.
-   **Image Alt Text:** Provide meaningful `alt` text for all images.

## 9. Tooling & Automation

Leverage tools to enforce guidelines and improve developer experience.

-   **ESLint:** Use ESLint with the official `@astrojs/eslint-plugin` to catch common Astro-specific issues and enforce code quality.
-   **Prettier:** Integrate Prettier for consistent code formatting across all files (HTML, CSS, JS, TS, Astro, Markdown). Configure it to run on save or via pre-commit hooks.
-   **TypeScript:** Use TypeScript for type safety in all JavaScript/TypeScript files, including Astro frontmatter and API endpoints.
-   **Lint-Staged & Husky:** Use these tools to run linters and formatters on staged Git files before committing, ensuring code quality before it enters the repository.

## 10. Comments & Documentation

Write clear and concise comments and documentation.

-   **Code Comments:** Explain complex logic, algorithms, or non-obvious decisions. Avoid commenting on obvious code.
-   **Component Props:** Document the purpose, type, and expected values of component props.
-   **README.md:** Maintain a comprehensive `README.md` file with project setup instructions, development scripts, deployment information, and any specific project conventions.
-   **Changelog:** Maintain a `CHANGELOG.md` file following the Keep a Changelog format.

By following these guidelines, your Astro projects will be more consistent, easier to maintain, performant, and a pleasure to work with for your entire team.
