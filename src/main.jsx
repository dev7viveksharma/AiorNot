import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx'
import AuthProvider from "./AuthProvider.jsx";
import './index.css';

const queryclient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={queryclient}>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </QueryClientProvider>
  // </StrictMode>, 
)
