import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './services/queryClient.ts'
import './index.css'
import App from './App.tsx'
import env from './config/env';

function render() {
  if (env.environment === 'development') {
    return (
      < StrictMode > 
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ StrictMode>
    )
  }

  return (
      <App />
  )
}

createRoot(document.getElementById('root')!).render(
  render(),
)
