import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, "index.html")
MAIN = os.path.join(ROOT, "js", "main.js")

with open(INDEX, encoding="utf-8") as f:
    HTML = f.read()

with open(MAIN, encoding="utf-8") as f:
    JS = f.read()


class TestConteudoV2(unittest.TestCase):
    """Evolução v2 — números reais do Python-Journey e correções pedidas."""

    def test_capitulo_06_mostra_progresso_real(self):
        counts = re.findall(r'<span class="track-count">([^<]*)</span>', HTML)
        self.assertEqual(
            counts[5], "9/10",
            f"capítulo 06 deveria exibir 9/10, exibindo: {counts[5]}",
        )

    def test_capitulo_06_nao_conta_ex105_como_dado(self):
        counts = re.findall(r'<span class="track-count">([^<]*)</span>', HTML)
        concluidos = []
        for c in counts:
            m = re.match(r"^(\d+)(/(10|/10))?", c)
            if m:
                concluidos.append(int(m.group(1)))
        total = sum(concluidos)
        self.assertEqual(
            total, 85,
            f"soma dos capítulos ({total}) deve igualar os 85 exercícios realmente resolvidos",
        )

    def test_nota_capitulo_06_frase_natural(self):
        self.assertIn("Falta apenas um exercício", HTML)
        self.assertNotIn("pendendo", HTML)

    def test_nota_capitulo_06_tambem_em_ingles(self):
        self.assertIn("Chapter 06 needs just one exercise", JS)

    def test_tecnologias_em_categorias(self):
        for cat in ("Programação", "Sistema e ambiente", "Produtividade"):
            self.assertIn(cat, HTML, f"categoria ausente: {cat}")

    def test_office_detalhado_em_aps(self):
        for app in ("Excel", "Word", "PowerPoint"):
            self.assertIn(f'<span class="chip">{app}</span>', HTML)
        self.assertNotIn(
            '<span class="chip">Office</span>', HTML,
            "chip genérico 'Office' deveria ter sido substituído por Excel/Word/PowerPoint",
        )

    def test_chip_niveis_honestos(self):
        self.assertIn("em aprendizado", HTML)
        self.assertIn("nível básico", HTML)


class TestSecaoProjetos(unittest.TestCase):
    def test_secao_existe(self):
        self.assertIn('id="projetos"', HTML)
        self.assertIn('data-i18n="projects_title"', HTML)

    def test_python_journey_destacado(self):
        self.assertIn("proj-highlight", HTML)
        self.assertIn("https://github.com/kayke-dados/Python-Journey", HTML)

    def test_descricao_python_journey_com_numeros_reais(self):
        self.assertIn("85 de 86 exercícios", HTML)

    def test_kayke_hub_como_projeto_no_ar(self):
        self.assertIn("proj_2_name", HTML)
        self.assertIn("● no ar", HTML)

    def test_futuros_marcarados_em_desenvolvimento(self):
        self.assertIn("future_projects_title", HTML)
        self.assertIn("Em desenvolvimento", HTML)
        # chips de projetos futuros usam estilo apagado (não concluídos)
        self.assertIn("chips-dim", HTML)


class TestTransparenciaIA(unittest.TestCase):
    def test_nota_no_site(self):
        self.assertIn("inteligência artificial", HTML.lower())

    def test_nota_no_site_em_ingles(self):
        self.assertIn("AI assistance", JS)

    def test_link_para_o_repositorio(self):
        self.assertIn("github.com/kayke-dados/kayke-hub", HTML)


class TestSemSobreafirmacoes(unittest.TestCase):
    def test_sem_certificacoes_inventadas(self):
        self.assertNotRegex(HTML.lower(), r"certifica")

    def test_sem_cargos_exagerados(self):
        for word in ("sênior", "especialista em ", "profissional experiente"):
            self.assertNotIn(word, HTML.lower())


if __name__ == "__main__":
    unittest.main()
