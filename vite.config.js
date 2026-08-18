import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.SERVER_URL,
        changeOrigin: true,
        secure: false
      },
      "/auth": {
        target: process.env.SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
      "/File": {
        target: process.env.SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
      "/report" :{
        target : process.env.SERVER_URL,
        changeOrigin : true,
        secure : false,
      },
    }
  }
});

