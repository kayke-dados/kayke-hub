export default function SiteLoading() {
  return (
    <div className="wrap" style={{ paddingBlock: "5rem" }} aria-busy="true" aria-live="polite">
      <div
        style={{
          height: "2.5rem",
          maxWidth: "520px",
          borderRadius: "8px",
          background: "var(--surface-2)",
          marginBottom: "1rem",
        }}
      />
      <div
        style={{
          height: "1rem",
          maxWidth: "420px",
          borderRadius: "6px",
          background: "var(--surface)",
          marginBottom: "0.6rem",
        }}
      />
      <div
        style={{
          height: "1rem",
          maxWidth: "360px",
          borderRadius: "6px",
          background: "var(--surface)",
        }}
      />
      <p className="sr-only">Carregando o conteúdo do portfólio.</p>
    </div>
  );
}
