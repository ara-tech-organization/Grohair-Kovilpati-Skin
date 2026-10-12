import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  /*
   * WHERE THE APP IS MOUNTED. Getting it wrong produces a blank white page: the
   * HTML loads, asks the wrong directory for /assets/index-<hash>.js, gets a
   * 404 instead of the bundle, and nothing ever mounts.
   *
   * Default `/` — Hostinger, served from the root of
   * https://adgrohairgloskinkovilpatti.com/. Upload the contents of dist/ to
   * public_html; public/.htaccess (RewriteBase /) has to agree with this.
   *
   * Override — GitHub Pages serves a *project* site from /<repo>/, so the
   * workflow sets BASE_PATH from the repository name.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
