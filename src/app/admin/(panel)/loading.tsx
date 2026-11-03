export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div
        style={{
          height: "2rem",
          maxWidth: "260px",
          borderRadius: "8px",
          background: "var(--surface-2)",
          marginBottom: "1.5rem",
        }}
      />
      <div className="admin-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="admin-stat" key={item}>
            <div
              style={{
                height: "1.6rem",
                width: "50%",
                borderRadius: "6px",
                background: "var(--surface-3)",
                marginBottom: "0.5rem",
              }}
            />
            <div
              style={{
                height: "0.7rem",
                width: "70%",
                borderRadius: "6px",
                background: "var(--surface-2)",
              }}
            />
          </div>
        ))}
      </div>
      <p className="sr-only">Carregando o painel.</p>
    </div>
  );
}
