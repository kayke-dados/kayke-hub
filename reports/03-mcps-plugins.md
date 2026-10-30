# Relatório 03 — Plugins e MCPs (FASE 3)

## Configuração real do ambiente (`~/.config/opencode/opencode.jsonc`)

```json
{
  "plugin": ["superpowers@git+https://github.com/obra/superpowers.git"],
  "skills": [".../andrej-karpathy-skills/skills"]
}
```

## Plugins

| Plugin | Descrição | Uso no projeto |
|---|---|---|
| superpowers | biblioteca de processo (17 skills + scripts sdd) | ✅ conduziu todo o fluxo |
| andrej-karpathy-skills | 1 skill (karpathy-guidelines) | ✅ disciplina de código |

## MCPs

**Nenhum MCP configurado no ambiente** (`~/.config/opencode/` não contém seção `mcp`). Consequência honesta:

| Ferramenta buscada no prompt | Resultado |
|---|---|
| GitHub/gerenciamento de repo | ❌ sem MCP; sem `gh` CLI → push/commit via `git` manual |
| Navegador/Playwright | ❌ sem MCP e sem Chromium no Android/Termux → testes estruturais em Python/Node |
| Context7 (documentação) | ❌ não instalado → conhecimento direto aplicado |
| Lighthouse | ❌ impossível sem Chrome → registrado em 04 |
| Otimização de imagens | ❌ sem sharp/pillow — imagens geradas mínimas (8–10KB total de imagens novas) |
| Análise de acessibilidade | parcial — lint + testes estruturais (semantic HTML, focus-visible, aria-labels, contrast tokens) |

**Nada foi instalado por discovery às margens** (nenhuma duplicata, nenhuma tool sem propósito): o único pacote adicionado ao ambiente foi `segno` (geração do QR, puro Python, tooling).

## Nodes/modules ambiente (plugins opencode)
`~/.config/opencode/node_modules` — runtime do próprio opencode; intacto, sem mudanças.
