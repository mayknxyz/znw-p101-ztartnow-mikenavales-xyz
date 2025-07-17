---
title: Deploying a Static Astro Project on Cloudflare Workers
description: This guide provides steps for deploying an existing, entirely pre-rendered Astro project as a static site on Cloudflare Workers, serving as a useful resource for web developers.
---

This guide provides steps for deploying an existing, entirely pre-rendered Astro project as a static site on Cloudflare Workers, serving as a useful resource for web developers.

## 1. Add a Wrangler Configuration File

In the root directory of your Astro project, create a file named `wrangler.jsonc` with the following content:

```
// wrangler.jsonc
{
  "name": "my-astro-app",
  // Update to today's date
  "compatibility_date": "2025-07-17",
  "assets": {
    "directory": "./dist"
  }
}
```

### Understanding the Configuration

The crucial part of this configuration is the `"assets"` field. This field instructs Wrangler (Cloudflare's CLI tool for Workers) where to locate your static assets. In this example, it's set to `./dist`, which is the default output directory for Astro builds. If your project's build output is in a different directory, you should update the `"directory"` value accordingly.

Notice the absence of a `"main"` field in this configuration. This is because you are deploying a purely static site, meaning no Worker code is required for on-demand rendering or Server-Side Rendering (SSR).

## 2. Build and Deploy Your Project

You can deploy your project to a `*.workers.dev` subdomain or a custom domain directly from your local machine or through any CI/CD system (including Workers Builds).

Use the following commands to build your Astro project and then deploy it using Wrangler:

````
npx astro build
```bash
npx wrangler@latest deploy
````

If you are using a Continuous Integration (CI) service for your deployment pipeline, remember to update your "deploy command" within your CI configuration to reflect these commands.
