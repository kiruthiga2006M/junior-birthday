/* ===================== CONFIG: PERSONALIZE YOUR WEBSITE =====================
   Change these values before sharing the website.
   birthday: "YYYY-MM-DD" in the person's local date.
   birthdayName: the name shown on the page.
   birthdayMessage / giftMessage: your personal words.
   photos: put image files in the photos folder and use paths like "photos/us.jpg".
============================================================================= */
const CONFIG = {
  birthdayName: "Junior(SARU) 💗",
  birthday: "2026-10-28", // CHANGE THIS to the next birthday date (YYYY-MM-DD)
  birthdayMessage: "🎂✨ Many more happy returns of the day, Junior! 💗 (Chota Gurl 😠, Mental , Loosuuuuuu, Eruma , Rabbit, Monkey ) Stay happy, keep smiling 😊,  💕 May this year bring you lots of happiness, success, beautiful memories, and everything you wish for. ✨🌸 💗",
  giftMessage: "Once again, Happy Birthday, Chota Gurl! 🎉🎂💗 Stay Smile 😊 Always! 🫶🏻✨🥹🎂",
  photos: ["photos/WhatsApp Image 2026-10-25 at 10.10.37 PM.jpeg", "photos/hy.jpeg", "photos/nn.jpeg"] // Example: ["photos/us.jpg", "photos/funny.jpg", "photos/trip.jpg"]
};


const $ = (id) => document.getElementById(id);
$("heroName").textContent = CONFIG.birthdayName + "!";
$("footerName").textContent = CONFIG.birthdayName;
$("heroMessage").textContent = CONFIG.birthdayMessage;
$("giftText").textContent = CONFIG.giftMessage;
document.title = `Happy Birthday, ${CONFIG.birthdayName}! 🎂`;

// Floating decorations
const floaties = $("floaties");
const floatSymbols = ["♡", "✦", "🎀", "✧", "💗", "✿"];
for (let i = 0; i < 22; i++) {
  const el = document.createElement("span");
  el.className = "floaty";
  el.textContent = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
  el.style.left = Math.random() * 100 + "%";
  el.style.fontSize = (14 + Math.random() * 18) + "px";
  el.style.animationDuration = (12 + Math.random() * 15) + "s";
  el.style.animationDelay = (-Math.random() * 25) + "s";
  floaties.appendChild(el);
}

// Optional photos: only local image paths you add to the project are used.
CONFIG.photos.forEach((src, index) => {
  if (!src) return;
  const target = $("photo" + (index + 1));
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Birthday memory ${index + 1}`;
  img.onerror = () => { img.remove(); target.textContent = "📸 Add a photo in the photos folder"; };
  target.textContent = "";
  target.appendChild(img);
});

// Countdown to the configured date; if it passed, count down to the next birthday year.
function getNextBirthday() {
  const parts = CONFIG.birthday.split("-").map(Number);
  const now = new Date();
  let target = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
  if (target.getTime() < now.getTime()) target = new Date(now.getFullYear() + 1, parts[1] - 1, parts[2], 0, 0, 0);
  return target;
}
function updateCountdown() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  $("days").textContent = String(d).padStart(2, "0");
  $("hours").textContent = String(h).padStart(2, "0");
  $("minutes").textContent = String(m).padStart(2, "0");
  $("seconds").textContent = String(s).padStart(2, "0");
  if (d === 0 && h === 0 && m === 0 && s === 0) $("countdown").querySelector(".section-head p").textContent = "It's your special day — let the celebrations begin! 🎉";
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Tiny original melody made with Web Audio API; no music file or external audio is needed.
let audioCtx = null, musicTimer = null, noteIndex = 0;
let musicOn = false;
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5];
function playNote(freq, duration = 0.22) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.075, audioCtx.currentTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + duration + 0.02);
}
function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) { showToast("This browser doesn't support background music."); return; }
  audioCtx = audioCtx || new AudioContextClass();
  audioCtx.resume();
  musicOn = true;
  $("musicBtn").textContent = "♫ Pause music";
  $("musicBtn").setAttribute("aria-pressed", "true");
  playNote(notes[noteIndex++ % notes.length]);
  musicTimer = setInterval(() => {
    if (musicOn) playNote(notes[noteIndex++ % notes.length]);
  }, 330);
}
function stopMusic() {
  musicOn = false;
  clearInterval(musicTimer);
  $("musicBtn").textContent = "♫ Play music";
  $("musicBtn").setAttribute("aria-pressed", "false");
}
$("musicBtn").addEventListener("click", () => musicOn ? stopMusic() : startMusic());

// Canvas confetti + fireworks
const canvas = $("effects"), ctx = canvas.getContext("2d");
let particles = [], animationFrame = null;
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
function burst(x, y, amount = 75, fireworks = false) {
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = fireworks ? 2 + Math.random() * 5 : 2 + Math.random() * 4;
    particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - (fireworks ? 0 : 2),
      size: 3 + Math.random() * 5, life: 70 + Math.random() * 35, maxLife: 105,
      color: ["#ff77a8", "#c9b6ff", "#ffe58a", "#7edbd1", "#ff9f76"][Math.floor(Math.random() * 5)],
      shape: Math.random() > .5 ? "circle" : "rect", gravity: fireworks ? .045 : .09
    });
  }
  if (!animationFrame) animateParticles();
}
function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= .99; p.life--;
    ctx.globalAlpha = Math.min(1, p.life / 25);
    ctx.fillStyle = p.color;
    if (p.shape === "circle") { ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * .08); ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .65); ctx.restore(); }
  });
  ctx.globalAlpha = 1;
  if (particles.length) animationFrame = requestAnimationFrame(animateParticles);
  else { cancelAnimationFrame(animationFrame); animationFrame = null; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
}
function celebration() {
  burst(window.innerWidth * (.2 + Math.random() * .6), window.innerHeight * (.15 + Math.random() * .3), 95, true);
  setTimeout(() => burst(window.innerWidth * (.2 + Math.random() * .6), window.innerHeight * (.18 + Math.random() * .35), 70, true), 220);
  burst(window.innerWidth / 2, window.innerHeight * .35, 120, false);
  showToast("Make a wish, " + CONFIG.birthdayName + "! 💖");
}
$("celebrateBtn").addEventListener("click", celebration);
$("againBtn").addEventListener("click", celebration);
$("giftBtn").addEventListener("click", () => {
  const gift = $("gift"), msg = $("surpriseMessage");
  const opened = msg.classList.toggle("show");
  gift.classList.toggle("open", opened);
  $("giftBtn").textContent = opened ? "Close surprise 💝" : "Unwrap your gift 💝";
  if (opened) celebration();
});
let toastTimer;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
// A small burst when the page opens.
setTimeout(() => burst(window.innerWidth * .5, 100, 35, false), 700);
