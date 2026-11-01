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

CHAPTER_COUNTS = re.findall(r'<span class="chapter-count[^"]*"[^>]*>([^<]*)</span>', HTML)


class TestConteudoQuietTech(unittest.TestCase):
    """Dados reais do Python-Journey (87/87) e nenhuma afirmação inventada."""

    def test_hero_nome_e_status(self):
        self.assertIn('data-i18n="hero_title_1"', HTML)
        self.assertIn('data-i18n="hero_title_2"', HTML)
        self.assertIn("87 de 87 exercícios", HTML)
        self.assertIn("6 capítulos concluídos", HTML)

    def test_isolated_headings(self):
        self.assertNotIn("5 capítulos concluídos", HTML)
        self.assertNotIn("ex105 em aberto", HTML)
        self.assertNotIn("85 de 86", HTML)
        self.assertNotIn("9/10", HTML)

    def test_capitulos_contagens_reais(self):
        self.assertEqual(CHAPTER_COUNTS, ["12", "16", "25", "18", "5", "11", "reservado"])

    def test_soma_dos_capitulos_e_87(self):
        total = sum(int(c) for c in CHAPTER_COUNTS if c.isdigit())
        self.assertEqual(total, 87, f"soma dos capítulos ({total}) deve ser 87")

    def test_progresso_do_pj(self):
        self.assertIn('role="img" aria-label="87 de 87 exercícios resolvidos"', HTML)
        self.assertIn('pj-number', HTML)

    def test_dados_com_data_de_conferencia(self):
        self.assertIn("contagem conferida nos arquivos em 01/11/2026", HTML)
        self.assertNotIn("tempo real", HTML)

    def test_dois_projetos(self):
        self.assertIn('id="projetos"', HTML)
        for name in ("proj_1_name", "proj_2_name"):
            self.assertIn(f'data-i18n="{name}"', HTML)
        self.assertIn("https://github.com/kayke-dados/Python-Journey", HTML)
        for gone in ("CalculaFood", "Marca Aí", "proj_3_name", "proj_4_name"):
            self.assertNotIn(gone, HTML)

    def test_contato_com_email_qr_e_compartilhar(self):
        self.assertIn('id="contato"', HTML)
        self.assertIn("mailto:kayke0812@proton.me", HTML)
        self.assertIn("assets/qr-code.svg", HTML)
        self.assertIn('id="btn-copy"', HTML)
        self.assertIn('id="btn-share"', HTML)

    def test_github_api_sem_token(self):
        self.assertIn("https://api.github.com/users/kayke-dados/repos", JS)
        self.assertIn("sessionStorage", JS)
        self.assertIn("IntersectionObserver", JS)
        self.assertIn('rootMargin: "300px"', JS)
        self.assertNotIn("Authorization", JS)

    def test_jornada_tres_blocos(self):
        for key in ("know_title", "studying_title", "goals_title"):
            self.assertIn(f'data-i18n="{key}"', HTML)

    def test_secoes_principais_presentes(self):
        for section in ("inicio", "sobre", "jornada", "projetos", "contato"):
            self.assertIn(f'id="{section}"', HTML)

    def test_acessibilidade_basica(self):
        self.assertIn('class="skip-link"', HTML)
        self.assertGreaterEqual(HTML.count("aria-labelledby="), 5)
        self.assertIn('aria-live="polite"', HTML)
        self.assertIn('aria-expanded="false"', HTML)

    def test_linguagem_alternavel(self):
        self.assertIn('data-i18n="hero_kicker"', HTML)
        self.assertIn('id="lang-toggle"', HTML)
        self.assertIn("documentElement.lang", JS)


class TestTransparenciaIA(unittest.TestCase):
    def test_nota_no_site(self):
        self.assertIn("inteligência artificial", HTML.lower())

    def test_nota_no_site_em_ingles(self):
        self.assertIn("artificial intelligence", JS)

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
