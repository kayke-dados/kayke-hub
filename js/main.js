"use strict";

const SITE_URL = "https://kayke-dados.github.io/kayke-hub/";

const TYPED_PHRASES = {
  pt: [
    "python do zero, sem atalhos",
    "85 exercícios e contando",
    "consistência > intensidade",
    "um dia por vez",
  ],
  en: [
    "python from zero, no shortcuts",
    "85 exercises and counting",
    "consistency > intensity",
    "one day at a time",
  ],
};

const I18N = {
  en: {
    skip: "Skip to content",
    lang_label: "PT",
    tagline: 'Studying to become a <strong>Data Analyst</strong>',
    moto: "Consistency &gt; intensity.",
    links_title: "Link cards",
    link_github: "GitHub",
    link_github_desc: "code and ship's log",
    link_instagram: "Instagram",
    link_instagram_desc: "@kayke.dados",
    link_journey: "Python-Journey",
    link_journey_desc: "85 exercises · 7 chapters",
    link_email: "E-mail",
    link_email_desc: "to talk",
    trail_title: "Trail in progress",
    about_p1: "This profile is my <strong>ship's log</strong>, not a show window. Studying Python from zero, no shortcuts, with an IT base and Office in my bag.",
    about_p2: "Each folder is one stage; each file, one explained concept. Base: Curso em Vídeo.",
    status_done: "done",
    status_partial: "◐ in progress",
    status_planned: "reserved slot",
    trail_note: "Chapter 06 needs just one exercise (<code>ex105</code>) to be complete — truth in real time.",
    tech_title: "Current stack",
    tech_note: "Python is the current focus — Excel, Word and PowerPoint sustain the path, at a beginner's pace.",
    tech_cat_prog: "Programming",
    chip_note_prog: "learning",
    tech_cat_system: "System & environment",
    tech_cat_office: "Productivity",
    chip_note_office: "basic level",
    future_title: "On the way",
    future_1: "OOP and databases",
    future_2: "complete Python projects",
    future_3: "data analysis · web",
    projects_title: "Projects",
    projects_p1: "What already exists for real: a repository that documents the whole trail, and this card — published and live.",
    proj_1_name: "Python-Journey",
    proj_1_status: "◐ in the making",
    proj_1_desc: "85 of 86 exercises · six chapters done · one left (<code>ex105</code>) in chapter 06",
    proj_2_name: "Kayke Hub",
    proj_2_status: "● live",
    proj_2_desc: "This digital card — a static site published with GitHub Pages",
    future_projects_title: "In development",
    future_proj_1: "data portfolio",
    future_proj_2: "data analysis project",
    future_proj_3: "indicators dashboard",
    ai_note: 'This site\'s code was developed with 100% AI assistance — <a href="https://github.com/kayke-dados/kayke-hub" target="_blank" rel="noopener">documented in the repository</a>.',
    share_title: "Share this card",
    share_hint: "Scan the code or copy the address.",
    btn_copy: "Copy address",
    btn_share: "Share",
    footer_note: "made at the pace of someone who is learning · ",
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

const TAGLINE_HTML = {
  pt: 'Estudando para me tornar <strong>Analista de Dados</strong>',
};

let currentLang = localStorage.getItem("kd-lang") || "pt";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("kd-lang", lang);
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  dictFor(lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = (lang === "en" ? I18N.en[key] : TAGLINE_HTML[key] || defaultLangValue(el));
    if (value != null) el.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const value = (lang === "en" ? I18N.en["lang_label"] : null);
    if (value != null) el.setAttribute("aria-label", value);
  });
  document.getElementById("lang-toggle").textContent = lang === "en" ? "PT" : "EN";
  restartTyping(lang);
}

function defaultLangValue(el) {
  return el.getAttribute("data-default-pt") || el.innerHTML;
}

function cacheDefaults() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (!el.hasAttribute("data-default-pt")) {
      el.setAttribute("data-default-pt", el.innerHTML);
    }
  });
}

function dictFor() {
  return I18N.en;
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
  showToast(done ? okMessage : (MESSAGES[currentLang] || MESSAGES.pt).toast_fail);
}

async function shareCard() {
  const shareData = {
    title: "Kayke | Python e Dados",
    text: document.querySelector(".tagline").textContent,
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

let typingTimer = null;

function restartTyping(lang) {
  const el = document.getElementById("typed");
  if (!el) return;
  clearTimeout(typingTimer);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const phrases = TYPED_PHRASES[lang] || TYPED_PHRASES.pt;
    el.textContent = phrases[0];
    return;
  }
  typeLoop(el, TYPED_PHRASES[lang] || TYPED_PHRASES.pt, 0, 0);
}

function typeLoop(el, phrases, pi, ci) {
  const phrase = phrases[pi];
  el.textContent = phrase.slice(0, ci);
  let delay = 55;
  if (ci < phrase.length) {
    ci += 1;
  } else {
    delay = 2200;
    ci = 0;
    pi = (pi + 1) % phrases.length;
    setTimeout(() => typeLoop(el, phrases, pi, 0), delay);
    return;
  }
  typingTimer = setTimeout(() => typeLoop(el, phrases, pi, ci), delay);
}

function init() {
  cacheDefaults();
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("btn-copy").addEventListener("click", copyLink);
  document.getElementById("btn-share").addEventListener("click", shareCard);
  document.getElementById("lang-toggle").addEventListener("click", () => {
    applyLang(currentLang === "en" ? "pt" : "en");
  });
  if (currentLang === "en") {
    applyLang("en");
  } else {
    restartTyping("pt");
  }
}

document.addEventListener("DOMContentLoaded", init);
