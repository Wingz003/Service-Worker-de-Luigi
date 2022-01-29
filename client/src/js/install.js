const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
    console.log(`'beforeinstallprompt' event was fired.`);

});


window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
});


butInstall.addEventListener('click', async () => {

    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            butInstall.classList.toggle('hidden', true);
            deferredPrompt = null;
        }
    }
});


