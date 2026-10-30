import os
import subprocess
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKED = subprocess.run(
    ["git", "ls-files"], cwd=ROOT, capture_output=True, text=True
).stdout.splitlines()


class TestPublishFiles(unittest.TestCase):
    """I4: o repo não pode mentir na própria descrição do README."""

    def test_spec_and_plan_tracked(self):
        for path in (
            "docs/superpowers/specs/2026-10-30-kayke-digital-card-design.md",
            "docs/superpowers/plans/2026-10-30-kayke-digital-card.md",
        ):
            self.assertIn(path, TRACKED, f"{path} não rastreado")

    def test_original_prompt_tracked(self):
        self.assertIn("prompt.md", TRACKED)

    def test_no_pycache_tracked(self):
        self.assertFalse([p for p in TRACKED if "__pycache__" in p])
