"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#inicio", label: "Início", id: "inicio" },
  { href: "#historia", label: "História", id: "historia" },
  { href: "#jornada", label: "Jornada", id: "jornada" },
  { href: "#cursos", label: "Cursos", id: "cursos" },
  { href: "#projetos", label: "Projetos", id: "projetos" },
  { href: "#contato", label: "Contato", id: "contato" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap site-header__inner">
        <a className="brand" href="#inicio" aria-label="Kayke — início">
          <span className="brand-mark" aria-hidden="true">
            K
          </span>
          <span className="brand-name">
            Kayke <span>Space</span>
          </span>
        </a>

        <nav className="primary-nav" id="nav-menu" aria-label="Navegação principal">
          {links.map((link) => (
            <a
              key={link.href}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
              href={link.href}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="header-gh"
            href="https://github.com/kayke-dados"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
