---
title: Tailwind CSS Installation Guide for Astro
description: This guide outlines the steps to integrate Tailwind CSS into your Astro project, providing a collection of useful and readily accessible free online resources to aid in web or software development.
---

This guide outlines the steps to integrate Tailwind CSS into your Astro project, providing a collection of useful and readily accessible free online resources to aid in web or software development.

## 1. Create a New Astro Project

First, create a new Astro project and navigate into its directory using your terminal:

```
npm create astro@latest my-project
cd my-project
```

## 2. Install Tailwind CSS and Dependencies

Next, install `tailwindcss` and its required peer dependencies using npm:

```
npm install tailwindcss @tailwindcss/vite
```

## 3. Configure Astro

Open your Astro configuration file (`astro.config.mjs`) and add the `@tailwindcss/vite` plugin to your Vite plugins.

```
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
```

## 4. Create Your CSS File

Create a new CSS file, for example, `./src/styles/global.css`, and add the Tailwind CSS `@import` directives:

```
/* ./src/styles/global.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## 5. Run Your Build Process

Start your development server to compile your Tailwind CSS:

```
npm run dev
```

## 6. Start Using Tailwind

Now you can import your `global.css` file into your Astro components or layouts and begin using Tailwind's utility classes to style your content:

```astro
---
// Import CSS in the frontmatter
import '../styles/global.css';
---

<h1 class="text-3xl font-bold underline">
  Hello, Tailwind CSS!
</h1>
```
