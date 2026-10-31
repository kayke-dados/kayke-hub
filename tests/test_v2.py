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


class TestConteudoV6(unittest.TestCase):
    """v6: tipo como declaração, dados reais e nenhuma afirmação inventada."""

    def test_hero_com_nome_e_status_reais(self):
        self.assertIn('data-i18n="hero_name_1"', HTML)
        self.assertIn('data-i18n="hero_name_2"', HTML)
        self.assertIn("85 de 86 exercícios", HTML)
        self.assertIn("5 capítulos concluídos", HTML)
        self.assertIn("ex105", HTML)

    def test_capitulo_06_mostra_progresso_real(self):
        counts = re.findall(r'<span class="chapter-count">([^<]*)</span>', HTML)
        self.assertEqual(counts, ["12", "16", "25", "18", "5", "9/10", "—"])

    def test_soma_dos_capitulos_e_85(self):
        counts = re.findall(r'<span class="chapter-count">([^<]*)</span>', HTML)
        total = 0
        for c in counts:
            m = re.match(r"^(\d+)", c)
            if m:
                total += int(m.group(1))
        self.assertEqual(total, 85, f"soma dos capítulos ({total}) deve ser 85")

    def test_nota_do_capitulo_06_em_pt_e_en(self):
        self.assertIn("Falta apenas um exercício", HTML)
        self.assertNotIn("pendendo", HTML)
        self.assertIn("Chapter 06 needs just one exercise", JS)

    def test_cinco_capitulos_concluidos_sem_exagero(self):
        self.assertIn("cinco capítulos concluídos", HTML)
        self.assertIn("5 capítulos concluídos", HTML)
        self.assertNotIn("seis capítulos concluídos", HTML)
        self.assertNotIn("6 capítulos concluídos", HTML)

    def test_dados_declarados_como_manuais(self):
        self.assertIn("atualizados manualmente", HTML)
        self.assertNotIn("tempo real", HTML)

    def test_projetos_reais(self):
        self.assertIn('id="projetos"', HTML)
        self.assertIn("proj-highlight", HTML)
        self.assertIn("https://github.com/kayke-dados/Python-Journey", HTML)
        self.assertIn("proj_2_name", HTML)
        self.assertIn("No ar", HTML)

    def test_futuro_marcado_em_desenvolvimento(self):
        self.assertIn('data-i18n="future_title"', HTML)
        self.assertIn("Em desenvolvimento", HTML)
        for key in ("future_1", "future_2", "future_3"):
            self.assertIn(f'data-i18n="{key}"', HTML)
        self.assertNotIn("chips-dim", HTML)

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

    def test_diario_com_tres_marcos_reais(self):
        for key in ("diary_1_title", "diary_2_title", "diary_3_title"):
            self.assertIn(f'data-i18n="{key}"', HTML)
        self.assertNotIn("datetime=", HTML)

    def test_secoes_principais_presentes(self):
        for section in ("inicio", "sobre", "projetos", "jornada", "diario", "contato"):
            self.assertIn(f'id="{section}"', HTML)

    def test_acessibilidade_basica(self):
        self.assertIn('class="skip-link"', HTML)
        self.assertGreaterEqual(HTML.count("aria-labelledby="), 6)
        self.assertIn('aria-live="polite"', HTML)
        self.assertIn('aria-expanded="false"', HTML)

    def test_linguagem_alternavel(self):
        self.assertIn('data-i18n="tagline"', HTML)
        self.assertIn('id="lang-toggle"', HTML)
        self.assertIn("documentElement.lang", JS)


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
