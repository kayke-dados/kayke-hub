"use strict";

/* ---------------------------------------------------------------------------
   URL de produção centralizada
   ---------------------------------------------------------------------------
   Hoje aponta para o GitHub Pages, que é o endereço real e ativo do site.
   Ao publicar na Vercel, troque SITE_URL pela URL do projeto
   (ex.: "https://kayke-hub.vercel.app/") ou pelo domínio próprio e rode:

       python3 tools/make_assets.py

   para regenerar o QR Code e a imagem Open Graph. O script lê este valor,
   então aqui é a única fonte de verdade. Não invente a URL da Vercel antes
   de ela existir. */
const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";

const GITHUB_USER = "kayke-dados";
const GITHUB_API = "https://api.github.com/users/kayke-dados/repos?sort=pushed&per_page=6";
const GITHUB_CACHE_KEY = "kd-gh-repos-v2";
const GITHUB_CACHE_TTL = 10 * 60 * 1000;

const I18N = {
  en: {
    about_note: "updated on 2026-11-01",
    ai_note: 'This site\'s code was developed with the help of artificial intelligence, from my own decisions and content. The process is <a href="https://github.com/kayke-dados/kayke-hub" target="_blank" rel="noopener">documented in the repository</a>.',
    avatar_alt: "Kayke's GitHub avatar",
    back_top: "Back to top ↑",
    btn_contact: "Get in touch",
    btn_copy: "Copy address",
    btn_projects: "See projects",
    btn_share: "Share",
    chapter_1_name: "Fundamentals",
    chapter_2_name: "Conditions",
    chapter_3_name: "Loops and logic",
    chapter_4_name: "Lists and tuples",
    chapter_5_name: "Dictionaries",
    chapter_6_name: "Functions",
    chapter_7_count: "reserved",
    chapter_7_name: "Next up",
    contato_intro: "Open to conversations about Python, data and learning.",
    contato_kicker: "04 — CONTACT",
    contato_title: "Let's talk.",
    cover_hub_alt: "Illustrated preview of the Kayke Hub site",
    cover_journey_alt: "Illustrated cover of Python-Journey with the chapter tree and 87 exercises",
    fact_base: "Curso em Vídeo, in chapters",
    fact_base_label: "Base",
    fact_focus: "Python and data analysis",
    fact_focus_label: "Focus",
    fact_next: "SQL, data and visualization",
    fact_next_label: "Next",
    fact_now: "Python: 87 of 87 exercises",
    fact_now_label: "Now",
    footer_imprint: "Kayke · HTML, CSS and JavaScript",
    footer_nav_label: "Secondary navigation",
    footer_note: "Consistency > intensity.",
    footer_sign: "Building, learning and documenting.",
    github_all: "see everything on GitHub →",
    github_intro: "Public repositories loaded from the GitHub API, with local cache and a fallback to the profile.",
    github_loading: "Loading public repositories…",
    github_title: "From GitHub",
    goals_1: "SQL",
    goals_2: "Data analysis",
    goals_3: "Pandas",
    goals_4: "NumPy",
    goals_5: "Data visualization",
    goals_title: "Future goals",
    hero_fact_1: "87 of 87 exercises",
    hero_fact_2: "6 chapters completed",
    hero_fact_3: "Python in progress",
    hero_kicker: "KAYKE — PERSONAL PORTFOLIO",
    hero_lead: "I am developing my programming skills, exploring new possibilities and building my base to work in Data Analysis in the future.",
    hero_motto: "Consistency > intensity.",
    hero_title_1: "Building my",
    hero_title_2: "path in technology.",
    jornada_intro: "What I already know, what I am studying and what I still want to learn — with no invented mastery bars.",
    jornada_kicker: "02 — JOURNEY",
    jornada_title: "Learning journey",
    know_1: "Computers and everyday software",
    know_2: "Basic Excel",
    know_3: "Software fundamentals and writing",
    know_4: "Basic Python, according to the exercises",
    know_title: "What I already know",
    link_demo: "view the site →",
    link_email: "Email",
    link_github: "GitHub",
    link_instagram: "Instagram",
    link_repo: "repository →",
    nav_about: "About",
    nav_contact: "Contact",
    nav_home: "Home",
    nav_journey: "Journey",
    nav_label: "Main navigation",
    nav_projects: "Projects",
    nextstep_1: "Consolidate Python",
    nextstep_2: "Develop programming logic",
    nextstep_3: "Go deeper into SQL",
    nextstep_4: "Learn data analysis and manipulation",
    nextstep_5: "Explore Pandas and NumPy",
    nextstep_6: "Move into data visualization and interpretation",
    nextsteps_intro: "These are future goals, not current knowledge.",
    nextsteps_title: "Next goals",
    pj_kicker: "PYTHON-JOURNEY",
    pj_note: "count checked in the files on 2026-11-01",
    pj_progress_aria: "87 of 87 exercises solved",
    pj_title: "Verified progress",
    proj_1_desc: "My Python study log: every Curso em Vídeo exercise, organized by chapter, in the order I learned it.",
    proj_1_kind: "Public repository",
    proj_1_name: "Python-Journey",
    proj_1_objective: "Practice logic and data structures with small exercises, one at a time.",
    proj_1_state: "87 exercises, 6 chapters completed",
    proj_1_tech: "Python",
    proj_2_desc: "This site: a portfolio and learning log on a static page, with no backend.",
    proj_2_kind: "Published site",
    proj_2_name: "Kayke Hub",
    proj_2_objective: "Bring projects, journey and contact together at a fixed address.",
    proj_2_state: "Live",
    proj_2_tech: "HTML, CSS and JavaScript",
    proj_3_desc: "An idea for a calculation tool aimed at small food businesses.",
    proj_3_kind: "In development",
    proj_3_name: "CalculaFood",
    proj_3_objective: "Support the daily routine of small businesses with simple calculations.",
    proj_3_state: "No public repository",
    proj_4_desc: "An idea around organizing and scheduling volleyball games.",
    proj_4_kind: "In development",
    proj_4_name: "Marca Aí",
    proj_4_objective: "Make it easier to organize games and teams.",
    proj_4_state: "No public repository",
    proj_objective_label: "Goal",
    proj_state_label: "Status",
    proj_tech_label: "Technologies",
    projetos_intro: "Real projects and ideas in development. Nothing here is invented: what does not exist yet is marked as such.",
    projetos_kicker: "03 — PROJECTS",
    projetos_title: "What I am building",
    qr_alt: "QR Code for this site",
    share_hint: "Scan the code or copy the address.",
    share_title: "Share this site",
    skip: "Skip to content",
    sobre_kicker: "01 — ABOUT",
    sobre_p1: "I am a student building my path in technology. Right now I am focusing my studies on Python and the fundamentals of programming. I like to learn by doing, document my progress and turn what I learn into small projects.",
    sobre_p2: 'Every concept I study becomes an exercise solved in <a href="https://github.com/kayke-dados/Python-Journey" target="_blank" rel="noopener">Python-Journey</a>, organized in the order I learned it. My goal is to work with data — and the base starts now, with Python.',
    sobre_title: "About me",
    studying_1: "Python",
    studying_2: "Programming fundamentals",
    studying_3: "Programming logic",
    studying_title: "Studying now",
    trait_1: "Continuous learning",
    trait_2: "Curiosity",
    trait_3: "Organization",
    trait_4: "Interest in technology",
    trait_5: "Gradual growth",
    lang_label: "Switch to Portuguese",
    menu_open: "Open menu",
  },
};

const ARIA_LABELS = {
  pt: { lang_label: "Mudar para inglês", menu_open: "Abrir menu", menu_close: "Fechar menu" },
  en: { lang_label: "Switch to Portuguese", menu_open: "Open menu", menu_close: "Close menu" },
};

const MESSAGES = {
  pt: { toast_copied: "Endereço copiado!", toast_fail: "Não foi possível copiar; o endereço é " + SITE_URL },
  en: { toast_copied: "Address copied!", toast_fail: "Could not copy; the address is " + SITE_URL },
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
    if (!el.hasAttribute("data-default-pt")) el.setAttribute("data-default-pt", el.innerHTML);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    if (!el.hasAttribute("data-default-aria")) el.setAttribute("data-default-aria", el.getAttribute("aria-label") || "");
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    if (!el.hasAttribute("data-default-alt")) el.setAttribute("data-default-alt", el.getAttribute("alt") || "");
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

function resolveSiteUrl() {
  if (SITE_URL) return SITE_URL;
  return window.location.origin + window.location.pathname;
}

async function copyLink() {
  const msgs = MESSAGES[currentLang] || MESSAGES.pt;
  const url = resolveSiteUrl();
  try {
    await navigator.clipboard.writeText(url);
    showToast(msgs.toast_copied);
  } catch (err) {
    fallbackCopy(msgs.toast_copied);
  }
}

function fallbackCopy(okMessage) {
  const previous = document.activeElement;
  const tmp = document.createElement("textarea");
  tmp.value = resolveSiteUrl();
  tmp.setAttribute("aria-hidden", "true");
  tmp.style.position = "fixed";
  tmp.style.opacity = "0";
  document.body.appendChild(tmp);
  tmp.select();
  let done = false;
  try {
    done = document.execCommand("copy");
  } catch (e) {
    done = false;
  }
  document.body.removeChild(tmp);
  if (previous && typeof previous.focus === "function") previous.focus();
  showToast(done ? okMessage : (MESSAGES[currentLang] || MESSAGES.pt).toast_fail);
}

async function shareCard() {
  const lead = document.querySelector(".hero-lead");
  const shareData = {
    title: currentLang === "en" ? "Kayke — building my path in technology" : "Kayke — construindo minha trajetória na tecnologia",
    text: lead ? lead.textContent : "Kayke",
    url: resolveSiteUrl(),
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
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  if (!header || !toggle) return;
  const open = header.classList.contains("open");
  const labels = ARIA_LABELS[currentLang] || ARIA_LABELS.pt;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? labels.menu_close : labels.menu_open);
}

function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  if (!header || !toggle) return;
  toggle.addEventListener("click", () => {
    header.classList.toggle("open");
    syncNavToggle();
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      syncNavToggle();
    });
  });
  syncNavToggle();
}

/* ---- cabeçalho ao rolar ---- */

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- seção ativa na navegação ---- */

function initActiveSection() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  const io = new IntersectionObserver(
    (entries) => {
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
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["inicio", "sobre", "jornada", "projetos", "contato"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ---- reveals de entrada ---- */

function initReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => io.observe(el));
}

/* ---- GitHub ---- */

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
  return date.toLocaleDateString(currentLang === "en" ? "en-US" : "pt-BR", { year: "numeric", month: "short" });
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
    const response = await fetch(GITHUB_API, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    githubRepos = Array.isArray(data) ? data.filter((repo) => !repo.fork).slice(0, 6) : [];
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
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        io.disconnect();
        loadGithub();
      }
    },
    { rootMargin: "300px" }
  );
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
    langBtn.addEventListener("click", () => applyLang(currentLang === "en" ? "pt" : "en"));
  }
  initNav();
  initHeaderScroll();
  initActiveSection();
  initReveals();
  applyLang(currentLang);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-ready");
  }
  initGithub();
}

document.addEventListener("DOMContentLoaded", init);
