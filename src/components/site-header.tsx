"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Início", id: "inicio" },
  { label: "Sobre", id: "historia" },
  { label: "Jornada", id: "jornada" },
  { label: "Cursos", id: "cursos" },
  { label: "Projetos", id: "projetos" },
  { label: "Contato", id: "contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(isHome ? "inicio" : "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith("/projetos") ? "projetos" : "");
      return;
    }

    setActive("inicio");
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
  }, [isHome, pathname]);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let attempts = 0;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let settle: ReturnType<typeof setTimeout> | null = null;

    const scroll = () => {
      const target = document.getElementById(hash);
      if (!target) {
        if (attempts++ < 20) retry = setTimeout(scroll, 50);
        return;
      }
      target.scrollIntoView({ block: "start" });
      settle = setTimeout(() => {
        if (window.scrollY === 0) target.scrollIntoView({ block: "start" });
      }, 350);
    };

    retry = setTimeout(scroll, 0);
    return () => {
      if (retry) clearTimeout(retry);
      if (settle) clearTimeout(settle);
    };
  }, [isHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const behind = [document.getElementById("main"), document.querySelector(".site-footer")];
    behind.forEach((element) => {
      if (!element) return;
      if (open) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
    return () => behind.forEach((element) => element?.removeAttribute("inert"));
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap site-header__inner">
        <a className="brand" href="/#inicio" aria-label="Kayke — início">
          <span className="brand-name">
            Kayke <span>Space</span>
          </span>
        </a>

        <nav className="primary-nav" id="nav-menu" aria-label="Navegação principal" ref={navRef}>
          {links.map((link) => (
            <a
              key={link.id}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
              href={`/#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-link nav-link-external"
            href="https://github.com/kayke-dados"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
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
