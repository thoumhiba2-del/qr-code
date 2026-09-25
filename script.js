// ---- Bouton "Rejoindre YOM" ----
const joinBtn = document.getElementById('joinBtn');
const joinNote = document.getElementById('joinNote');

if (CONFIG.GOOGLE_FORM_URL && CONFIG.GOOGLE_FORM_URL !== "GOOGLE_FORM_URL_HERE") {
  joinBtn.href = CONFIG.GOOGLE_FORM_URL;
  joinNote.style.display = "none";
} else {
  joinBtn.classList.add('disabled');
  joinBtn.removeAttribute('href');
}

// ---- QR Code ----
const qrTarget = (CONFIG.SITE_URL && CONFIG.SITE_URL !== "GOOGLE_SITE_URL_HERE")
  ? CONFIG.SITE_URL
  : window.location.href; // fallback tant que le site n'est pas encore hébergé

new QRCode(document.getElementById("qrcode"), {
  text: qrTarget,
  width: 220,
  height: 220,
  colorDark: "#111111",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.M
});

// ---- Téléchargement du QR Code en PNG (haute résolution pour impression) ----
document.getElementById('downloadQr').addEventListener('click', () => {
  const canvas = document.querySelector('#qrcode canvas');
  if (!canvas) return;

  // On régénère en plus grande taille pour l'impression
  const printContainer = document.createElement('div');
  new QRCode(printContainer, {
    text: qrTarget,
    width: 1000,
    height: 1000,
    colorDark: "#111111",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });

  setTimeout(() => {
    const bigCanvas = printContainer.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'YOM-QRCode.png';
    link.href = bigCanvas.toDataURL('image/png');
    link.click();
  }, 150);
});
