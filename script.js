/* ── TÍTULOS DAS FOTOS ── */
const PHOTO_TITLES = [
  "Nossa melhor foto", // Foto 1
  "Seu sorriso maravilhoso", // Foto 2
  "El Mexicano", // Foto 3
  "Pôr do sol (não mais lindo que você)", // Foto 4
  "EITA BIXO SEXO KKKKKK", // Foto 5
  "Palhaço delicia", // Foto 6
  "Lavras Novas <3", // Foto 7
  "Nunca dormi tão bem", // Foto 8
  "Lele moreninha linda!", // Foto 9
  "1 ano atrás, que saudade!", // Foto 10
  "Lele moreninha e um noia", // Foto 11
  "Prado/BA com Lele moreninha", // Foto 12
  "Marombas treino de perna", // Foto 13
  "Titanic em terra firme", // Foto 14
  "Amigões do peito!", // Foto 15
  "Marombas treino de braço", // Foto 16
  "Casal adolescente", // Foto 17
  "KKKKKKKKKKKKKKKKKKKKKKKK", // Foto 18
  "Lele e Lombriga de Oculos", // Foto 19
  "Meia é só no pé, STB/2024", // Foto 20
  "Pokerface", // Foto 21
  "Meu porto seguro", // Foto 22
  "Lele Quilombola, 23/04/1655", // Foto 23
  "Meio Arquiteto", // Foto 24
  "Corridinha Pelado", // Foto 25
  "Date com um nerd - Prado/BA", // Foto 26
  "IXE KKKKKKKKKKKKKKKKKKKK", // Foto 27
];

const PHOTOS = Array.from({ length: 27 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `img/img_${num}.jpg`,
    caption: PHOTO_TITLES[i] || `Momento #${num}`,
  };
});

/* ── CONTROLE DO TEMA (CLARO/ESCURO) ── */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const rootEl = document.documentElement;

const iconMoon =
  '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
const iconSun =
  '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

function updateThemeIcon() {
  if (rootEl.getAttribute("data-theme") === "light") {
    themeIcon.innerHTML = iconMoon; // if light, show moon (to switch to dark)
  } else {
    themeIcon.innerHTML = iconSun; // if dark, show sun
  }
}

themeToggleBtn.addEventListener("click", () => {
  let newTheme =
    rootEl.getAttribute("data-theme") === "light" ? "dark" : "light";
  rootEl.setAttribute("data-theme", newTheme);
  localStorage.setItem("lepica-theme", newTheme);
  updateThemeIcon();
});
updateThemeIcon();

/* ── CONTROLE DO AUDIO E BOAS VINDAS ── */
const welcomeScreen = document.getElementById("welcome-screen");
const btnUnlock = document.getElementById("btn-unlock");
const bgAudio = document.getElementById("bg-audio");
const controlsContainer = document.getElementById("controls-container");
const musicToggleBtn = document.getElementById("music-toggle");

btnUnlock.addEventListener("click", () => {
  bgAudio
    .play()
    .then(() => {
      controlsContainer.classList.add("playing");
    })
    .catch((err) => console.log(err));

  welcomeScreen.classList.add("hidden");
  controlsContainer.classList.remove("hidden");
  document.body.classList.remove("locked");
});

musicToggleBtn.addEventListener("click", () => {
  if (bgAudio.paused) {
    bgAudio.play();
    controlsContainer.classList.add("playing");
  } else {
    bgAudio.pause();
    controlsContainer.classList.remove("playing");
  }
});

/* ── CANVAS PARTICLES ── */
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class HeartParticle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 8 + 5;
    this.speed = Math.random() * 0.8 + 0.3;
    this.opacity = Math.random() * 0.2 + 0.05;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.swayWidth = Math.random() * 15 + 5;
  }
  update() {
    this.y -= this.speed;
    this.swayOffset += this.swaySpeed;
    this.xOffset = Math.sin(this.swayOffset) * this.swayWidth;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x + this.xOffset, this.y);
    ctx.beginPath();
    // Adjust color based on theme
    const isLight = rootEl.getAttribute("data-theme") === "light";
    ctx.fillStyle = isLight
      ? `rgba(43, 128, 81, ${this.opacity + 0.1})`
      : `rgba(110, 231, 183, ${this.opacity})`;

    const size = this.size;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
    ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) particles.push(new HeartParticle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── CONTADOR PROGRESSIVO DINÂMICO ── */
const START = new Date(2024, 4, 25, 1, 0, 0);

function pad(n) {
  return String(n).padStart(2, "0");
}
function fmt(n) {
  return n.toLocaleString("pt-BR");
}
function plural(val, singular, pluralStr) {
  return val === 1 ? singular : pluralStr;
}

let prevSeg = -1;

function tick() {
  const now = new Date();
  const diff = now - START;

  const tSeg = Math.floor(diff / 1000);
  const tMin = Math.floor(diff / 60000);
  const tHora = Math.floor(diff / 3600000);
  const tDia = Math.floor(diff / 86400000);
  const tSemana = Math.floor(diff / (86400000 * 7));

  let anos = now.getFullYear() - START.getFullYear();
  let meses = now.getMonth() - START.getMonth();
  let dias = now.getDate() - START.getDate();
  let horas = now.getHours() - START.getHours();
  let min = now.getMinutes() - START.getMinutes();
  let seg = now.getSeconds() - START.getSeconds();

  if (seg < 0) {
    seg += 60;
    min--;
  }
  if (min < 0) {
    min += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    dias += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  document.getElementById("c-anos").textContent = anos;
  document.getElementById("c-meses").textContent = pad(meses);
  document.getElementById("c-dias").textContent = pad(dias);
  document.getElementById("c-horas").textContent = pad(horas);
  document.getElementById("c-min").textContent = pad(min);

  // Atualizar Labels de Pluralidade (Contador Principal)
  document.getElementById("c-label-anos").textContent = plural(
    anos,
    "Ano",
    "Anos",
  );
  document.getElementById("c-label-meses").textContent = plural(
    meses,
    "Mês",
    "Meses",
  );
  document.getElementById("c-label-dias").textContent = plural(
    dias,
    "Dia",
    "Dias",
  );
  document.getElementById("c-label-horas").textContent = plural(
    horas,
    "Hora",
    "Horas",
  );
  document.getElementById("c-label-min").textContent = plural(
    min,
    "Minuto",
    "Minutos",
  );
  document.getElementById("c-label-seg").textContent = plural(
    seg,
    "Segundo",
    "Segundos",
  );

  const segEl = document.getElementById("c-seg");
  if (seg !== prevSeg) {
    segEl.textContent = pad(seg);
    segEl.classList.remove("tick");
    void segEl.offsetWidth;
    segEl.classList.add("tick");
    prevSeg = seg;
  }

  document.getElementById("t-dias").textContent = fmt(tDia);
  document.getElementById("t-horas").textContent = fmt(tHora);
  document.getElementById("t-min").textContent = fmt(tMin);
  document.getElementById("t-seg").textContent = fmt(tSeg);

  // Atualizar Labels de Pluralidade (Totais)
  document.getElementById("t-label-dias").textContent =
    `Total de ${plural(tDia, "dia", "dias")}`;
  document.getElementById("t-label-horas").textContent =
    `Total de ${plural(tHora, "hora", "horas")}`;
  document.getElementById("t-label-min").textContent =
    `Total de ${plural(tMin, "minuto", "minutos")}`;
  document.getElementById("t-label-seg").textContent =
    `Total de ${plural(tSeg, "segundo", "segundos")}`;

  document.getElementById("text-seg").textContent = fmt(tSeg);
  document.getElementById("text-min").textContent = fmt(tMin);
  document.getElementById("text-horas").textContent = fmt(tHora);
  document.getElementById("text-dias").textContent = fmt(tDia);
  document.getElementById("text-semanas").textContent = fmt(tSemana);

  const totalMeses =
    (now.getFullYear() - START.getFullYear()) * 12 +
    now.getMonth() -
    START.getMonth() +
    (now.getDate() >= START.getDate() ? 0 : -1);
  document.getElementById("text-meses").textContent = fmt(totalMeses);
  document.getElementById("text-anos").textContent = fmt(
    Math.floor(totalMeses / 12),
  );
}
tick();
setInterval(tick, 500);

/* ── MURAL DE FOTOS E LIGHTBOX ── */
function ph(img, n) {
  const placeholder = document.createElement("div");
  placeholder.className = "photo-placeholder";
  placeholder.innerHTML = `<i>◻</i><small>Foto ${n}</small>`;
  img.replaceWith(placeholder);
}

let visiblePhotosCount = (window.innerWidth >= 768) ? 9 : 4;
function renderPhotos() {
  const grid = document.getElementById("photos-grid-v2");
  grid.innerHTML = "";
  const toShow = PHOTOS.slice(0, visiblePhotosCount);

  toShow.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = "polaroid reveal";
    const initRot = (Math.random() * 6 - 3).toFixed(1);
    const hoverRot = (Math.random() * 4 - 2).toFixed(1);
    card.style.setProperty("--r-init", `${initRot}deg`);
    card.style.setProperty("--r-hover", `${hoverRot}deg`);
    card.style.transform = `rotate(${initRot}deg)`;

    card.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" onerror="ph(this, ${index + 1})">
      <span class="polaroid-caption">${photo.caption}</span>
    `;
    card.addEventListener("click", () => openLightbox(index));
    grid.appendChild(card);
  });

  const btnLoadMore = document.getElementById("btn-load-more");
  btnLoadMore.style.display =
    visiblePhotosCount >= PHOTOS.length ? "none" : "inline-block";

  if (typeof obs !== "undefined") {
    document
      .querySelectorAll(".polaroid.reveal")
      .forEach((el) => obs.observe(el));
  }
}

document.getElementById("btn-load-more").addEventListener("click", () => {
  visiblePhotosCount = Math.min(visiblePhotosCount + ((window.innerWidth >= 768) ? 9 : 4), PHOTOS.length);
  renderPhotos();
});

let currentPhotoIndex = 0;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const currentSp = document.getElementById("lightbox-current");
const totalSp = document.getElementById("lightbox-total");

function openLightbox(index) {
  currentPhotoIndex = index;
  lightboxImg.src = PHOTOS[index].src;
  lightboxCaption.textContent = PHOTOS[index].caption;
  currentSp.textContent = index + 1;
  totalSp.textContent = PHOTOS.length;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = welcomeScreen.classList.contains("hidden")
    ? ""
    : "hidden";
}

function updateLightboxContent() {
  lightboxImg.style.opacity = "0";
  setTimeout(() => {
    lightboxImg.src = PHOTOS[currentPhotoIndex].src;
    lightboxCaption.textContent = PHOTOS[currentPhotoIndex].caption;
    currentSp.textContent = currentPhotoIndex + 1;
    lightboxImg.style.opacity = "1";
  }, 150);
}

document
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
document.querySelector(".lightbox-next").addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % PHOTOS.length;
  updateLightboxContent();
});
document.querySelector(".lightbox-prev").addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex - 1 + PHOTOS.length) % PHOTOS.length;
  updateLightboxContent();
});
lightbox.addEventListener("click", (e) => {
  if (
    e.target === lightbox ||
    e.target.classList.contains("lightbox-content-container")
  )
    closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight")
      document.querySelector(".lightbox-next").click();
    if (e.key === "ArrowLeft") document.querySelector(".lightbox-prev").click();
  }
});

let touchStartX = 0;
let touchEndX = 0;
lightbox.addEventListener(
  "touchstart",
  (e) => (touchStartX = e.changedTouches[0].screenX),
  { passive: true },
);
lightbox.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50)
      document.querySelector(".lightbox-next").click();
    if (touchEndX > touchStartX + 50)
      document.querySelector(".lightbox-prev").click();
  },
  { passive: true },
);

/* ── REVEAL OBSERVER ── */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

renderPhotos();
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
