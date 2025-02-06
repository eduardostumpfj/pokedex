import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base:'/pokedex',
  esbuild: {
    jsx: "automatic", // Ensures JSX works in .js files
    loader: "tsx",
    include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
