const typedNameEl = document.getElementById("typed-name");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("nav-menu");
const yearEl = document.getElementById("year");

function runTypingEffect(text, speed = 95) {
  let i = 0;
  function type() {
    if (i <= text.length) {
      typedNameEl.textContent = text.slice(0, i);
      i += 1;
      setTimeout(type, speed);
    }
  }
  type();
}

function initMenu() {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const chars = "DeepakJaildar";
  let drops = [];
  const fontSize = 16;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));
  }

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    drops.forEach((drop, index) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, index * fontSize, drop * fontSize);
      if (drop * fontSize > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      }
      drops[index] += 1;
    });
  }

  resize();
  window.addEventListener("resize", resize);
  setInterval(draw, 35);
}

runTypingEffect("Deepak");
initMenu();
initReveal();
initMatrix();
yearEl.textContent = new Date().getFullYear();
