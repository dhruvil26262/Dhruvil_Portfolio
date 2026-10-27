/* =========================================================
   PORTFOLIO SCRIPT  -  Dhruvil Valand
   Each feature is a small, separate block. Edit the
   "SETTINGS" section below for the things you change often.
   ========================================================= */

/* ---------- SETTINGS (edit these) ---------- */
const CONTACT_EMAIL = "dhruvilvaland047@gmail.com";   // where the contact form sends mail
const TYPED_WORDS = [                                  // words that type in the hero
  "React Developer",
  "Django Developer",
  "Problem Solver",
  "Fast Learner",
];

/* ---------- 1. Mobile menu ---------- */
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));
// Close the menu after a link is clicked
navMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("open"))
);

/* ---------- 2. Dark / light theme (remembers your choice) ---------- */
const themeBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) { /* storage not available - ignore */ }

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ---------- 3. Header shadow + back-to-top button on scroll ---------- */
const header = document.getElementById("header");
const toTop = document.getElementById("to-top");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 4. Highlight the active menu link ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => sectionObserver.observe(section));

/* ---------- 5. Fade-in animation when scrolling ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- 6. Typing effect in the hero ---------- */
const typedEl = document.getElementById("typed");
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = TYPED_WORDS[wordIndex];
  charIndex += deleting ? -1 : 1;
  typedEl.textContent = word.slice(0, charIndex);

  let delay = deleting ? 50 : 100;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % TYPED_WORDS.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ---------- 7. Contact form -> opens the visitor's email app ---------- */
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim() || "Portfolio enquiry";
  const message = form.message.value.trim();

  // Simple validation
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  form.name.classList.toggle("invalid", !name);
  form.email.classList.toggle("invalid", !emailOk);
  form.message.classList.toggle("invalid", !message);

  if (!name || !emailOk || !message) {
    note.textContent = "Please fill in your name, a valid email and a message.";
    note.className = "form-note error";
    return;
  }

  const body = `${message}\n\n- ${name} (${email})`;
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  note.textContent = "Opening your email app...";
  note.className = "form-note ok";
  form.reset();
});

/* ---------- 8. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
