"use strict";

const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";
const GITHUB_USER = "kayke-dados";
const GITHUB_API = "https://api.github.com/users/kayke-dados/repos?sort=pushed&per_page=6";
const GITHUB_CACHE_KEY = "kd-gh-repos-v1";
const GITHUB_CACHE_TTL = 10 * 60 * 1000;

const I18N = {
  en: {
    about_figure_caption: "GitHub portrait, updated by me.",
    agora_1_text: "Parameters, return and scope. ex105 is the next exercise.",
    agora_1_title: "Python · chapter 06",
    agora_2_text: "Every Python-Journey exercise is a small dose of logic.",
    agora_2_title: "Programming logic",
    agora_3_text: "The goal. The fundamentals come after closing the Python base.",
    agora_3_title: "Data analysis",
    agora_title: "Now",
    ai_note: 'This site\'s code was developed with 100% AI assistance, <a href="https://github.com/kayke-dados/kayke-hub" target="_blank" rel="noopener">documented in the repository</a>.',
    art_exercises_alt: "Strip of 86 squares: 85 filled and the last one open",
    art_exercises_caption: "86 exercises in Python-Journey: 85 solved, 1 open.",
    avatar_alt: "Kayke's GitHub avatar",
    back_top: "Back to top ↑",
    btn_copy: "Copy address",
    btn_journey: "My journey",
    btn_projects: "See projects",
    btn_share: "Share",
    chapter_1_desc: "Variables, types, operators, input and output.",
    chapter_1_name: "Fundamentals",
    chapter_2_desc: "if, elif and else: decisions inside the program.",
    chapter_2_name: "Conditions",
    chapter_3_desc: "for, while and break: repetition with a purpose.",
    chapter_3_name: "Loops and logic",
    chapter_4_desc: "Collections, indexes and unpacking.",
    chapter_4_name: "Lists and tuples",
    chapter_5_desc: "Key-value structures, methods and iteration.",
    chapter_5_name: "Dictionaries",
    chapter_6_desc: "Parameters, return and scope; ex105 is still open.",
    chapter_6_name: "Functions",
    chapter_7_desc: "OOP, databases and data analysis.",
    chapter_7_name: "Next up",
    code_caption: "Real excerpt from Ex103, chapter 06: functions.",
    contact_intro: "Open to conversations about Python, data and learning.",
    contact_title: "Let's talk.",
    cover_hub_alt: "Illustrated preview of Kayke Hub with the name Kayke and the site tagline",
    cover_journey_alt: "Illustrated cover of Python-Journey with the chapter tree and 85 of 86 exercises",
    cover_stamp: "in progress",
    diario_intro: "Real learning milestones, with no invented dates: what I studied, what I learned and what I am still trying to understand. New entries go in when they happen.",
    diario_note: "No comments, likes or database: just the record of what happened.",
    diario_title: "Diary",
    diary_1_learned: "Functions with optional parameters and return.",
    diary_1_subject: "Python-Journey",
    diary_1_summary: "Chapter 06 reached 9 of 10 exercises; ex105 is left.",
    diary_1_title: "85 of 86 exercises solved",
    diary_2_learned: "Key-value structures, methods and iteration.",
    diary_2_subject: "Python",
    diary_2_summary: "Five exercises closed the dictionaries chapter.",
    diary_2_title: "Chapter 05 done: dictionaries",
    diary_3_learned: "Semantic HTML, CSS, plain JavaScript and publishing on Pages.",
    diary_3_subject: "Web",
    diary_3_summary: "The site was published on GitHub Pages as a static page.",
    diary_3_title: "Kayke Hub is live",
    diary_learned_label: "What I learned:",
    diary_link: "see it in the repository →",
    diary_link_live: "see it live →",
    fact_base: "Curso em Vídeo, in chapters",
    fact_base_label: "Base",
    fact_focus: "Python and data analysis",
    fact_focus_label: "Focus",
    fact_next: "OOP, databases and data analysis",
    fact_next_label: "Next",
    fact_now: "Chapter 06, functions (ex105 open)",
    fact_now_label: "Now",
    footer_find: "Where to find me",
    footer_imprint: "Kayke Hub · HTML, CSS and JavaScript",
    footer_note: "Consistency > intensity.",
    footer_sign: "Made at the pace of someone who is learning.",
    future_1: "data portfolio",
    future_2: "data analysis project",
    future_3: "indicators dashboard",
    future_intro: "Ideas on the radar, no public code yet.",
    future_note: "Nothing here is published: these are the next notebooks, still blank.",
    future_title: "In development",
    github_all: "See all on GitHub →",
    github_intro: "Public repositories loaded straight from the GitHub API, with local cache and a link fallback.",
    github_loading: "Loading public repositories…",
    github_title: "From GitHub",
    goal_text: "Close chapter 06 with ex105 and move on to OOP.",
    goal_title: "Next goal",
    hero_intro: "I am building my path in technology, one exercise at a time. Here are my projects, my journey and what I am learning now.",
    hero_motto: "Consistency > intensity.",
    hero_name_1: "Kayke",
    hero_name_2: "Hub",
    hero_role: "Student · technology, programming and data analysis",
    hero_status: "85 of 86 exercises",
    hero_status_2: "5 chapters completed",
    hero_status_3: "ex105 open",
    jornada_intro: "The path so far, with no invented dates: five chapters completed and the sixth in progress.",
    jornada_title: "Journey",
    lang_label: "Switch to Portuguese",
    link_demo: "see it live →",
    link_email: "Email",
    link_email_desc: "kayke0812@proton.me",
    link_github: "GitHub",
    link_github_desc: "/kayke-dados",
    link_instagram: "Instagram",
    link_instagram_desc: "@kayke.dados",
    link_repo: "repository →",
    menu_open: "Open menu",
    nav_about: "About",
    nav_contact: "Contact",
    nav_diary: "Diary",
    nav_journey: "Journey",
    nav_label: "Main navigation",
    nav_projects: "Projects",
    pj_map_alt: "Map of seven chapters: five completed, the sixth in progress and the seventh reserved",
    pj_map_caption: "Chapter map: 5 completed, 06 in progress, 07 reserved.",
    pj_note: "Chapter 06 needs just one exercise (ex105) to be complete; data updated by hand.",
    pj_progress_aria: "85 of 86 exercises solved",
    pj_title: "Python Journey",
    pj_total: "exercises solved",
    proj_1_desc: "My Python study log: every Curso em Vídeo exercise, organized by chapter, in the order I learned it.",
    proj_1_learned: "Logic, conditions, loops, lists, tuples, dictionaries and functions.",
    proj_1_name: "Python-Journey",
    proj_1_objective: "Practice logic and data structures with small exercises, committed one at a time.",
    proj_1_role: "Author and maintainer: exercises, folder organization and commits.",
    proj_1_status: "In the making",
    proj_1_tech: "Python",
    proj_2_desc: "This site: portfolio and learning diary on a static page, published on GitHub Pages.",
    proj_2_learned: "Semantic HTML, CSS, accessibility, i18n and static publishing.",
    proj_2_name: "Kayke Hub",
    proj_2_objective: "Bring projects, journey and contact together at a fixed address, without a backend.",
    proj_2_role: "Author and maintainer of the content, design and code.",
    proj_2_status: "Live",
    proj_2_tech: "HTML, CSS and JavaScript",
    proj_learned_label: "What I learned",
    proj_objective_label: "Goal",
    proj_role_label: "My role",
    proj_tech_label: "Technologies",
    projects_intro: "Two real projects, with what already exists and what is still being built.",
    projects_title: "Projects",
    qr_alt: "QR Code for this site",
    radar_1: "OOP",
    radar_2: "databases · SQLite",
    radar_3: "data analysis",
    radar_4: "web · Flask/Django",
    radar_title: "On the radar",
    share_hint: "Scan the code or copy the address.",
    share_title: "Share this site",
    skip: "Skip to content",
    sobre_intro: "Who is behind the notebook, in first person and without shortcuts.",
    sobre_p1: "I am Kayke. I started programming without rushing and without shortcuts: every concept I study becomes an exercise solved, corrected and explained in Python-Journey.",
    sobre_p2: 'Python is where I invest most. I follow the <strong>Curso em Vídeo</strong> base and organize everything into chapters, in the order I learn. Today there are 85 exercises solved and chapter 06, on functions, nearly closed.',
    sobre_p3: 'My goal is to work with <strong>data analysis</strong>. Every day I use Excel, Word and PowerPoint at a basic level; the next steps are already planned: OOP, databases and real data analysis.',
    sobre_p4: "I use artificial intelligence as a study and development tool: I test, analyse and understand what goes into the project. This site's code is part of that process, documented in the repository.",
    sobre_sign: "Kayke, student",
    sobre_title: "About",
    status_done: "done",
    status_partial: "in progress",
    status_planned: "reserved slot",
    tagline: "Python & data portfolio",
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
    menu_close: "Close menu",
  },
};

const MESSAGES = {
  pt: {
    toast_copied: "Endereço copiado!",
    toast_fail: "Não foi possível copiar; o endereço é " + SITE_URL,
  },
  en: {
    toast_copied: "Address copied!",
    toast_fail: "Could not copy; the address is " + SITE_URL,
  },
};

const GITHUB_TEXT = {
  pt: {
    loading: "Carregando repositórios públicos…",
    empty: "Nenhum repositório público encontrado.",
    error: "Não foi possível carregar os repositórios agora.",
    no_desc: "Sem descrição.",
    no_lang: "sem linguagem",
    view: "Ver no GitHub →",
  },
  en: {
    loading: "Loading public repositories…",
    empty: "No public repositories found.",
    error: "Could not load the repositories right now.",
    no_desc: "No description.",
    no_lang: "no language",
    view: "See it on GitHub →",
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
let githubRepos = null;
let githubState = "idle";

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
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) langToggle.textContent = lang === "en" ? "PT" : "EN";
  syncNavToggle();
  if (githubState !== "idle") renderGithub();
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
  if (!toast) return;
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
  const role = document.querySelector(".cover-role");
  const shareData = {
    title: currentLang === "en" ? "Kayke Hub | Python & Data" : "Kayke Hub | Python e Dados",
    text: role ? role.textContent : "Kayke Hub",
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
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["inicio", "sobre", "projetos", "jornada", "diario", "contato"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---- reveals de entrada (só quando o JS liga) ---- */

function initReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = document.querySelectorAll(
    "section .section-head, .about-grid, .code-plate, .folder, .github-sheet, .progress-sheet, .goal-slip, .diary-sheet, .coupon, .footer-letter, .footer-address, .footer-bottom"
  );
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
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));
}

/* ---- GitHub: API pública, sem token, com cache e fallback ---- */

function cleanText(value) {
  if (!value) return "";
  return value
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(currentLang === "en" ? "en-US" : "pt-BR", {
    year: "numeric",
    month: "short",
  });
}

function readGithubCache() {
  try {
    const raw = sessionStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.repos)) return null;
    if (Date.now() - parsed.at > GITHUB_CACHE_TTL) return null;
    return parsed.repos;
  } catch (e) {
    return null;
  }
}

function writeGithubCache(repos) {
  try {
    sessionStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch (e) {
    /* sem cache: segue sem quebrar */
  }
}

function renderGithub() {
  const root = document.getElementById("github-repos");
  if (!root) return;
  const text = GITHUB_TEXT[currentLang] || GITHUB_TEXT.pt;
  root.replaceChildren();
  root.dataset.state = githubState;

  if (githubState === "idle" || githubState === "loading") {
    const status = document.createElement("p");
    status.className = "github-status";
    status.textContent = text.loading;
    root.append(status);
    return;
  }

  if (githubState === "error") {
    const status = document.createElement("p");
    status.className = "github-status";
    status.textContent = text.error + " ";
    const link = document.createElement("a");
    link.href = "https://github.com/" + GITHUB_USER + "?tab=repositories";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = text.view;
    status.append(link);
    root.append(status);
    return;
  }

  if (!githubRepos || !githubRepos.length) {
    const status = document.createElement("p");
    status.className = "github-status";
    status.textContent = text.empty;
    root.append(status);
    return;
  }

  const list = document.createElement("ul");
  list.className = "repo-list";
  githubRepos.forEach((repo) => {
    const item = document.createElement("li");
    item.className = "repo";
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener";

    const name = document.createElement("span");
    name.className = "repo-name";
    name.textContent = repo.name;

    const desc = document.createElement("span");
    desc.className = "repo-desc";
    desc.textContent = cleanText(repo.description) || text.no_desc;

    const meta = document.createElement("span");
    meta.className = "repo-meta";
    meta.textContent = (repo.language || text.no_lang) + " · " + formatDate(repo.pushed_at);

    link.append(name, desc, meta);
    item.append(link);
    list.append(item);
  });
  root.append(list);
}

async function loadGithub() {
  if (githubState === "loading" || githubState === "done") return;

  const cached = readGithubCache();
  if (cached) {
    githubRepos = cached;
    githubState = "done";
    renderGithub();
    return;
  }

  githubState = "loading";
  renderGithub();

  try {
    const response = await fetch(GITHUB_API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    githubRepos = Array.isArray(data)
      ? data.filter((repo) => !repo.fork).slice(0, 6)
      : [];
    writeGithubCache(githubRepos);
    githubState = "done";
    renderGithub();
  } catch (error) {
    githubState = "error";
    renderGithub();
  }
}

function initGithub() {
  const root = document.getElementById("github-repos");
  if (!root) return;
  if (!("IntersectionObserver" in window)) {
    loadGithub();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      io.disconnect();
      loadGithub();
    }
  }, { rootMargin: "300px" });
  io.observe(root);
}

function init() {
  cacheDefaults();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const copyBtn = document.getElementById("btn-copy");
  const shareBtn = document.getElementById("btn-share");
  const langBtn = document.getElementById("lang-toggle");
  if (copyBtn) copyBtn.addEventListener("click", copyLink);
  if (shareBtn) shareBtn.addEventListener("click", shareCard);
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLang(currentLang === "en" ? "pt" : "en");
    });
  }
  initNav();
  initActiveSection();
  initReveals();
  applyLang(currentLang);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-ready");
  }
  initGithub();
}

document.addEventListener("DOMContentLoaded", init);
