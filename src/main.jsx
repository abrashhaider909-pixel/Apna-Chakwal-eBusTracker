import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Analytics } from "@vercel/analytics/next"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('SW registered:', reg.scope))
      .catch((err) => console.log('SW registration failed:', err))
  })
}

// PWA Install Button
let deferredInstallPrompt = null
const installBtn = document.getElementById('installAppBtn')

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  deferredInstallPrompt = event
  installBtn?.classList.add('show')
})

installBtn?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return
  deferredInstallPrompt.prompt()
  await deferredInstallPrompt.userChoice
  deferredInstallPrompt = null
  installBtn.classList.remove('show')
})

window.addEventListener('appinstalled', () => {
  installBtn?.classList.remove('show')
  console.log('PWA installed successfully')
})
