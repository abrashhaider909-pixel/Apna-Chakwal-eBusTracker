import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* ── PWA Installation Listener Handlers ── */
let deferredInstallPrompt = null;
const installBtn = document.getElementById('installAppBtn');

if (installBtn) {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.classList.add('show');
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.remove('show');
  });

  window.addEventListener('appinstalled', () => installBtn.classList.remove('show'));
}

if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  // Optional SW Registration can be done safely here
}