"use client";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="wrap" style={{ paddingBlock: "5rem" }}>
      <h1 className="section-title">Não foi possível carregar esta página.</h1>
      <p className="section-intro">
        Algo falhou ao buscar o conteúdo. Tente novamente; se o problema continuar, o site
        público segue disponível com o conteúdo padrão.
      </p>
      <div className="form-actions" style={{ marginTop: "1.5rem" }}>
        <button className="btn btn-primary" type="button" onClick={() => reset()}>
          Tentar novamente
        </button>
        <a className="btn btn-ghost" href="/">
          Voltar ao início
        </a>
      </div>
      {error.digest ? (
        <p className="course-note">Referência do erro: {error.digest}</p>
      ) : null}
    </div>
  );
}
