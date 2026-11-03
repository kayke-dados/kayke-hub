export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: "6rem", textAlign: "center" }}>
      <p className="kicker" style={{ justifyContent: "center" }}>
        404
      </p>
      <h1 className="section-title">Esta página não existe.</h1>
      <p className="section-intro" style={{ marginInline: "auto" }}>
        O endereço pode ter mudado ou o conteúdo ainda não foi publicado.
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <a className="btn btn-primary" href="/">
          Voltar ao início
        </a>
      </p>
    </div>
  );
}
