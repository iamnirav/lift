import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto automatically detects the deployment platform (Vercel, Netlify, etc.)
    // and configures the adapter accordingly
    adapter: adapter(),

    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
    },
  },

  compilerOptions: {
    runes: true,
  },
}

export default config
