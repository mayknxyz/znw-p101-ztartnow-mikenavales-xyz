// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Ztart Now",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/mayknxyz/znw-p101-ztartnow-mikenavales-xyz",
				},
			],
			sidebar: [
				{
					label: "Artificial Intelligence",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Example Guide",
							slug: "artificial-intelligence/example",
						},
					],
				},
				{
					label: "Mobile Development",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Example Guide",
							slug: "mobile-development/example",
						},
					],
				},
				{
					label: "No-Code Development",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Example Guide",
							slug: "nocode-development/example",
						},
					],
				},
				{
					label: "No-Code Automation",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Example Guide",
							slug: "nocode-automation/example",
						},
					],
				},
				{
					label: "Web Development",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Example Guide",
							slug: "web-development/example",
						},
					],
				},
				{
					label: "Web Development: Astro",
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: "Astro Coding Guidelines (For Review)",
							slug: "web-development-astro/astro-coding-guidelines",
						},
						{
							label: "Tailwind CSS Installation Guide for Astro (For Review)",
							slug: "web-development-astro/astro-tailwind-css-v4-installation-guide",
						},
						{
							label: "Deploying a Static Astro Project on Cloudflare Workers (For Review)",
							slug: "web-development-astro/astro-deploy-on-cloudflare-workers",
						},
					],
				},
				// {
				// 	label: "Reference",
				// 	autogenerate: { directory: "reference" },
				// },
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
