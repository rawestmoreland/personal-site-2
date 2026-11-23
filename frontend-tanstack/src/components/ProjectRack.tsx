import { formatMonthYear } from '#/lib/format'
import { mediaUrl } from '#/lib/pocketbase'
import type { Project } from '#/lib/pocketbase'

// PocketBase has no status field yet, so a project is "landed" when its link text says Deprecated.
export const isLanded = (p: Project) =>
  p.url_text.trim().toLowerCase() === 'deprecated'

function Strip({ project, index }: { project: Project; index: number }) {
  const landed = isLanded(project)
  const href = landed ? undefined : project.url
  const Tag = landed ? 'div' : 'a'

  return (
    <li
      className="load-strip"
      style={{ animationDelay: `${index * 80 + 150}ms` }}
    >
      <Tag
        className="strip"
        data-state={landed ? 'landed' : 'live'}
        {...(href
          ? { href, target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        <span className="strip-tab" aria-hidden="true" />
        <span className="strip-body">
          <span className="strip-main">
            <img
              src={mediaUrl(project, project.icon)}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className={`size-14 rounded-md bg-black/5 object-cover ${landed ? 'grayscale' : ''}`}
            />
            <span>
              <span className="display block text-xl sm:text-2xl">
                {project.name}
              </span>
              <span className="mt-1 block text-sm leading-snug">
                {project.description}
              </span>
            </span>
          </span>
          <span className="strip-cell">
            <span className="strip-label">Started</span>
            <span className="data">{formatMonthYear(project.project_date)}</span>
          </span>
          <span className="strip-cell">
            <span className="strip-label">Status</span>
            <span className="data font-bold">{landed ? 'Landed' : 'In flight'}</span>
          </span>
          <span className="strip-cell">
            <span className="strip-label">{landed ? 'Note' : 'Open'}</span>
            <span className="data truncate">
              {landed ? 'Not maintained' : project.url_text}
            </span>
          </span>
        </span>
      </Tag>
    </li>
  )
}

export function ProjectRack({ projects }: { projects: Project[] }) {
  const live = projects.filter((p) => !isLanded(p))
  const landed = projects.filter(isLanded)

  return (
    <section id="in-flight" className="wrap pb-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-6">
        <h2 className="heading">In flight</h2>
        <p className="text-ink-soft max-w-[48ch] text-sm">
          Products I've built and still run. Open a strip to visit the live
          site.
        </p>
      </div>
      <div className="bg-rack rounded-md p-3 sm:p-5">
        <ul className="grid gap-2">
          {live.map((p, i) => (
            <Strip key={p.id} project={p} index={i} />
          ))}
        </ul>
        {landed.length > 0 && (
          <>
            <h3 className="display mt-8 mb-3 px-1 text-base text-white/70">
              Landed
            </h3>
            <ul className="grid gap-2">
              {landed.map((p, i) => (
                <Strip key={p.id} project={p} index={live.length + i} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
