// Listen for the install prompt event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();  // Prevent the default mini-infobar
  deferredPrompt = e;   // Save the event for later

  // Show your install button
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();  // Show the install prompt

  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  }

  deferredPrompt = null;

  // Hide the install button after prompt
  document.getElementById('installBtn').style.display = 'none';
});