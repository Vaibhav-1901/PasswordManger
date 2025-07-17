import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 👈 this line

export default defineConfig({
  server:{
    host:true,
    port:5173
  },
  plugins: [
    react(),       // 👈 make sure this is here too
    tailwindcss(), // 👈 add this
  ],
});