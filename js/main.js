"use strict";

const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";

const I18N = {
  en: {
    skip: "Skip to content",
    lang_label: "PT",
    nav_label: "Main navigation",
    footer_nav_label: "Footer links",
    menu_open: "Open menu",
    nav_home: "Home",
    nav_about: "About",
    nav_journey: "Journey",
    nav_projects: "Projects",
    avatar_alt: "Kayke's GitHub avatar",
    qr_alt: "QR Code for this digital card",
    tagline: 'Studying to become a <strong>Data Analyst</strong>',
    hero_intro: "Python from zero, with every step documented in Python-Journey — one day at a time, no shortcuts.",
    moto: "Consistency &gt; intensity.",
    hero_note: "85 exercises solved · 5 chapters done",
    hero_note_open: "ex105 pending",
    art_exercises_alt: "Strip of 86 squares: 85 filled and the last one open",
    art_exercises_caption: "86 exercises in Python-Journey: 85 solved, 1 open.",
    art_map_alt: "Map of seven chapters: five completed, the sixth in progress and the seventh reserved",
    art_map_caption: "Chapter map — 5 completed, 06 in progress, 07 reserved.",
    art_tech_alt: "Illustration of a Python terminal, a spreadsheet and a slide deck",
    art_tech_caption: "Everyday tools — Python, spreadsheets and slides.",
    code_caption: "Real excerpt from Ex103 — chapter 06, functions.",
    cover_journey_alt: "Illustrated cover of Python-Journey with the chapter tree and 85 of 86 exercises",
    cover_hub_alt: "Illustrated preview of Kayke Hub with the name Kayke and the site tagline",
    sobre_title: "About",
    fact_focus: "Python · data analysis",
    fact_base: "Curso em Vídeo, reorganized into chapters",
    fact_now: "chapter 06 · functions (ex105 left)",
    fact_next: "OOP · databases · data analysis",
    sobre_p1: "I am starting out in programming. No career to show off yet — just an honest study log: every folder in the repository is a concept practiced, debugged and explained, in the order I learned it.",
    sobre_p2: 'Python is where I invest most. I follow the <strong>Curso em Vídeo</strong> base, organizing everything into chapters in <a href="https://github.com/kayke-dados/Python-Journey" target="_blank" rel="noopener">Python-Journey</a> — today with 85 exercises solved and chapter 06 nearly closed.',
    sobre_p3: 'The goal is clear: to work with <strong>data analysis</strong>. Along the way I collect tools — Excel, Word and PowerPoint for everyday work, Windows as my environment, and the next steps already planned: OOP, databases and real data analysis.',
    jornada_title: "Learning journey",
    jornada_intro: "Chapters of Python-Journey — the number is how many exercises are solved in each one.",
    track_1: "01 — fundamentals",
    track_2: "02 — conditions",
    track_3: "03 — loops & logic",
    track_4: "04 — lists & tuples",
    track_5: "05 — dictionaries",
    track_6: "06 — functions",
    track_7: "07 — next up",
    status_done: "done",
    status_partial: "in progress",
    status_planned: "reserved slot",
    trail_note: "Chapter 06 needs just one exercise (<code>ex105</code>) to be complete — data updated by hand.",
    projects_title: "Projects",
    projects_p1: "Real projects, with real status and technology — and what is still ahead, clearly separated.",
    proj_1_name: "Python-Journey",
    proj_1_status: " in the making",
    proj_1_desc: "85 of 86 exercises · five chapters done · one left (<code>ex105</code>) in chapter 06",
    proj_tech: "stack",
    link_repo: "repository →",
    proj_2_name: "Kayke Hub",
    proj_2_status: " live",
    proj_2_desc: "This site — my static digital card, published on GitHub Pages",
    link_demo: "see it live →",
    future_projects_title: "In development",
    future_proj_1: "data portfolio",
    future_proj_2: "data analysis project",
    future_proj_3: "indicators dashboard",
    tech_title: "Technologies",
    tech_now_title: "Current knowledge",
    tech_cat_prog: "Programming",
    chip_note_prog: "learning",
    tech_cat_system: "System & environment",
    tech_cat_office: "Productivity",
    chip_note_office: "basic level",
    tech_learning_title: "Learning now",
    learn_1: "functions · chapter 06",
    learn_2: "OOP · next step",
    future_title: "Next on the radar",
    future_1: "databases · SQLite",
    future_2: "data analysis",
    future_3: "web · Flask/Django",
    contact_title: "Networks and contact",
    contact_p1: "This card is my fixed address on the internet. Write to me or find me on the networks:",
    link_github: "GitHub",
    link_github_desc: "/code and ship's log",
    link_instagram: "Instagram",
    link_instagram_desc: "@kayke.dados",
    link_email: "E-mail",
    link_email_desc: "kayke0812@proton.me",
    share_title: "Share this card",
    btn_copy: "Copy address",
    btn_share: "Share",
    share_hint: "Scan the code or copy the address.",
    footer_note: "made at the pace of someone who is learning · ",
    ai_note: 'This site\'s code was developed with 100% AI assistance — <a href="https://github.com/kayke-dados/kayke-hub" target="_blank" rel="noopener">documented in the repository</a>.',
  },
};

const ARIA_LABELS = {
  pt: {
    lang_label: "Mudar para inglês",
    menu_open: "Abrir menu",
    menu_close: "Fechar menu",
  },
  en: {
    lang_label: "Switch to Portuguese",
    menu_open: "Open menu",
  },
};

const MESSAGES = {
  pt: {
    toast_copied: "Endereço copiado!",
    toast_fail: "Não foi possível copiar — o endereço é " + SITE_URL,
  },
  en: {
    toast_copied: "Address copied!",
    toast_fail: "Could not copy — the address is " + SITE_URL,
  },
};

/* storage seguro: modo restrito/privado não pode derrubar o script */
function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* sem persistência: segue sem quebrar */
  }
}

let currentLang = storageGet("kd-lang") || "pt";

function applyLang(lang) {
  currentLang = lang;
  storageSet("kd-lang", lang);
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = lang === "en" ? I18N.en[key] : el.getAttribute("data-default-pt");
    if (value != null) el.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key === "lang_label") {
      el.setAttribute("aria-label", ARIA_LABELS[lang].lang_label);
      return;
    }
    const value = lang === "en" ? I18N.en[key] : el.getAttribute("data-default-aria");
    if (value != null) el.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    const value = lang === "en" ? I18N.en[key] : el.getAttribute("data-default-alt");
    if (value != null) el.setAttribute("alt", value);
  });
  document.getElementById("lang-toggle").textContent = lang === "en" ? "PT" : "EN";
  syncNavToggle();
}

function cacheDefaults() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (!el.hasAttribute("data-default-pt")) {
      el.setAttribute("data-default-pt", el.innerHTML);
    }
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    if (!el.hasAttribute("data-default-aria")) {
      el.setAttribute("data-default-aria", el.getAttribute("aria-label") || "");
    }
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    if (!el.hasAttribute("data-default-alt")) {
      el.setAttribute("data-default-alt", el.getAttribute("alt") || "");
    }
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (toast.hidden = true), 2400);
}

async function copyLink() {
  const msgs = MESSAGES[currentLang] || MESSAGES.pt;
  try {
    await navigator.clipboard.writeText(SITE_URL);
    showToast(msgs.toast_copied);
  } catch (err) {
    fallbackCopy(msgs.toast_copied);
  }
}

function fallbackCopy(okMessage) {
  const previous = document.activeElement;
  const tmp = document.createElement("textarea");
  tmp.value = SITE_URL;
  tmp.setAttribute("aria-hidden", "true");
  tmp.style.position = "fixed";
  tmp.style.opacity = "0";
  document.body.appendChild(tmp);
  tmp.select();
  let done = false;
  try {
    done = document.execCommand('copy');
  } catch (e) {
    done = false;
  }
  document.body.removeChild(tmp);
  if (previous && typeof previous.focus === "function") previous.focus();
  showToast(done ? okMessage : (MESSAGES[currentLang] || MESSAGES.pt).toast_fail);
}

async function shareCard() {
  const shareData = {
    title: currentLang === "en" ? "Kayke Hub | Python & Data" : "Kayke Hub | Python e Dados",
    text: document.querySelector(".hero-role").textContent,
    url: SITE_URL,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }
  copyLink();
}

/* ---- menu mobile ---- */

function syncNavToggle() {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("nav-toggle");
  if (!nav || !toggle) return;
  const open = nav.classList.contains("open");
  const labels = ARIA_LABELS[currentLang] || ARIA_LABELS.pt;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? labels.menu_close : labels.menu_open);
}

function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("nav-toggle");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    syncNavToggle();
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      syncNavToggle();
    });
  });
  syncNavToggle();
}

/* ---- seção ativa na navegação ---- */

function initActiveSection() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => {
        l.classList.remove("is-active");
        l.removeAttribute("aria-current");
      });
      const link = byId.get(entry.target.id);
      if (link) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "location");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["inicio", "sobre", "jornada", "projetos"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---- reveals de entrada (só quando o JS liga) ---- */

function initReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = document.querySelectorAll("section h2, section .section-intro, .trail, .proj, .tech-block, .contact-grid > *, .hero-identity > *, .hero-art, .caderno, .mapa, .tech-art");
  if (!targets.length || !("IntersectionObserver" in window)) return;
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.setProperty("--d", (Array.from(el.parentNode.children).indexOf(el) % 6) * 70 + "ms");
      el.classList.add("in");
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  targets.forEach((el) => io.observe(el));
}

function init() {
  cacheDefaults();
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("btn-copy").addEventListener("click", copyLink);
  document.getElementById("btn-share").addEventListener("click", shareCard);
  document.getElementById("lang-toggle").addEventListener("click", () => {
    applyLang(currentLang === "en" ? "pt" : "en");
  });
  initNav();
  initActiveSection();
  initReveals();
  applyLang(currentLang);
}

document.addEventListener("DOMContentLoaded", init);
