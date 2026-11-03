import type { CourseProgress } from "@/lib/types";
import { getCourseMedia } from "@/lib/course-media";

export function Courses({ progress }: { progress: CourseProgress }) {
  return (
    <section className="section" id="cursos" aria-labelledby="cursos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="cursos-title">
            A trilha, em ordem.
          </h2>
          <p className="section-intro">
            Dez playlists gratuitas, na sequência em que estou estudando. Sem pular etapas:
            o progresso anda da primeira para a última.
          </p>
        </div>

        <div className="course-progress reveal">
          <p className="course-progress-number">
            {progress.completed}
            <span>/{progress.courses.length}</span>
          </p>
          <div className="course-progress-main">
            <div
              className="course-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={progress.courses.length}
              aria-valuenow={progress.completed}
              aria-label={`${progress.completed} de ${progress.courses.length} cursos concluídos`}
            >
              <span style={{ width: `${progress.percent}%` }} />
            </div>
            <p className="course-note">
              {progress.percent}% da trilha · {progress.remaining} restantes
            </p>
          </div>
          <p className="course-progress-meta">cursos concluídos</p>
        </div>

        <ol className="course-list">
          {progress.courses.map((course) => {
            const isNext = !course.completed && course.position === progress.completed + 1;
            const media = getCourseMedia(course);
            return (
              <li
                className="course-row reveal"
                key={course.id}
                data-completed={course.completed}
                data-next={isNext}
              >
                <span className="course-number">
                  {String(course.position).padStart(2, "0")}
                </span>
                {media ? (
                  <a
                    className="course-media"
                    href={media.firstVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Assistir ao primeiro vídeo de ${course.title}`}
                  >
                    <img
                      src={media.thumbnailUrl}
                      alt=""
                      width={320}
                      height={180}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <span className="course-media course-media--empty" aria-hidden="true" />
                )}
                <div className="course-main">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-channel">{course.channel}</p>
                </div>
                <span className="course-status">{course.statusLabel}</span>
                <div className="course-actions">
                  {media ? (
                    <a
                      className="course-link"
                      href={media.firstVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Assistir <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <a
                    className="course-link"
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Playlist <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
