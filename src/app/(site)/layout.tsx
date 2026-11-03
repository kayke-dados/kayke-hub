import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Motion } from "@/components/motion";
import { getSiteContent } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getSiteContent();

  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter profile={profile} />
      <Motion />
    </>
  );
}
