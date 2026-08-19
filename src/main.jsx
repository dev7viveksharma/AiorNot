import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from 'axios';
import App from './App.jsx'
import AuthProvider from "./AuthProvider.jsx";
import './index.css';

axios.defaults.baseURL = import.meta.env.PROD
    ? import.meta.env.VITE_SERVER_URL
    : "";

axios.defaults.withCredentials = true;

const queryclient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryclient}>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </QueryClientProvider>
  </StrictMode>, 
)
