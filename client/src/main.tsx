import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import env from './config/env';

function render() {
  if (env.environment === 'development') {
    return (
      < StrictMode > 
        <App />
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
