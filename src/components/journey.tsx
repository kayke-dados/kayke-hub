import type { JourneyEntry } from "@/lib/types";
import { categoryLabels, formatDate } from "@/lib/format";

const DAY = 24 * 60 * 60 * 1000;

function toKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY);
}

function buildCalendar(entries: JourneyEntry[]) {
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const counts = new Map<string, number>();
  entries.forEach((entry) => {
    counts.set(entry.entry_date, (counts.get(entry.entry_date) ?? 0) + 1);
  });

  const earliest = entries.reduce<Date | null>((min, entry) => {
    const date = new Date(`${entry.entry_date}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return min;
    return !min || date < min ? date : min;
  }, null);

  const minimumStart = addDays(end, -(26 * 7 - 1));
  let start = earliest && earliest < minimumStart ? earliest : minimumStart;
  start = addDays(start, -start.getUTCDay());

  const cells: Array<{ key: string; date: string; count: number; level: number; empty: boolean }> = [];
  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
    const key = toKey(cursor);
    const count = counts.get(key) ?? 0;
    cells.push({
      key,
      date: key,
      count,
      level: count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : 3,
      empty: false,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1];
    const next = addDays(new Date(`${last.date}T00:00:00Z`), 1);
    cells.push({ key: toKey(next), date: toKey(next), count: 0, level: 0, empty: true });
  }

  return { cells, start, end, total: entries.length };
}

export function Journey({ entries }: { entries: JourneyEntry[] }) {
  const calendar = buildCalendar(entries);
  const recent = entries.slice(0, 5);

  return (
    <section className="section" id="jornada" aria-labelledby="jornada-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">03 — Jornada</p>
          <h2 className="section-title" id="jornada-title">
            A evolução, registrada.
          </h2>
          <p className="section-intro">
            Linha do tempo e calendário alimentados por registros reais. Nada é gerado
            aleatoriamente para preencher espaço.
          </p>
        </div>

        <div className="journey-grid">
          <div>
            {entries.length === 0 ? (
              <div className="empty-state">
                <strong>Ainda não há registros publicados.</strong>
                <p>
                  O primeiro registro da jornada aparecerá aqui assim que for criado no painel
                  administrativo.
                </p>
              </div>
            ) : (
              <ol className="timeline">
                {entries.map((entry) => (
                  <li className="timeline-item reveal" key={entry.id}>
                    <time className="timeline-date" dateTime={entry.entry_date}>
                      {formatDate(entry.entry_date)}
                    </time>
                    <h3 className="timeline-title">{entry.title}</h3>
                    <p className="timeline-desc">{entry.description}</p>
                    <div className="achievement-meta">
                      <span className="badge badge--accent">
                        {categoryLabels[entry.category]}
                      </span>
                      {entry.source === "auto" ? (
                        <span className="badge">Automático</span>
                      ) : null}
                    </div>
                    {entry.notes ? <p className="timeline-notes">{entry.notes}</p> : null}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <aside className="calendar-card reveal" aria-label="Calendário de atividades">
            <div className="calendar-head">
              <h3>Calendário de atividades</h3>
              <span>
                {formatDate(toKey(calendar.start))} — {formatDate(toKey(calendar.end))}
              </span>
            </div>
            <div className="calendar-scroll">
              <div
                className="calendar-grid"
                role="img"
                aria-label={`Calendário com ${calendar.total} registros reais de estudo, projetos e conquistas.`}
              >
                {calendar.cells.map((cell) => (
                  <span
                    key={cell.key}
                    className="calendar-cell"
                    data-level={cell.level}
                    data-empty={cell.empty || undefined}
                    title={
                      cell.empty
                        ? undefined
                        : `${formatDate(cell.date)}: ${cell.count} registro(s)`
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="calendar-legend">
              <span>{calendar.total} registros</span>
              <ul aria-hidden="true">
                <li data-level="0" />
                <li data-level="1" />
                <li data-level="2" />
                <li data-level="3" />
              </ul>
            </div>
            {recent.length > 0 ? (
              <ul className="calendar-list">
                {recent.map((entry) => (
                  <li key={entry.id}>
                    <span>{entry.title}</span>
                    <time dateTime={entry.entry_date}>{formatDate(entry.entry_date)}</time>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
