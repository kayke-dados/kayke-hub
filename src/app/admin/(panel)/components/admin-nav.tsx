"use client";

import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Visão geral", key: "dashboard" },
  { href: "/admin/cursos", label: "Cursos", key: "courses" },
  { href: "/admin/projetos", label: "Projetos", key: "projects" },
  { href: "/admin/jornada", label: "Jornada", key: "journey" },
  { href: "/admin/experiencias", label: "Experiências", key: "experiences" },
  { href: "/admin/conquistas", label: "Conquistas", key: "achievements" },
  { href: "/admin/objetivos", label: "Objetivos", key: "goals" },
  { href: "/admin/historia", label: "História", key: "profile" },
  { href: "/admin/momento", label: "Momento atual", key: "status" },
  { href: "/admin/historico", label: "Histórico", key: "log" },
  { href: "/admin/exportar", label: "Exportar", key: "export" },
];

export function AdminNav({ counts }: { counts: Record<string, number> }) {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Navegação do painel">
      {items.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
          >
            <span>{item.label}</span>
            {counts[item.key] != null ? <span className="count">{counts[item.key]}</span> : null}
          </a>
        );
      })}
    </nav>
  );
}
