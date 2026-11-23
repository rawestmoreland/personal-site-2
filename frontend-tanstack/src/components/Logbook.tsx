import {
  formatDuration,
  formatMonthYear,
  monthsBetween,
  parseDate,
} from '#/lib/format'
import { mediaUrl } from '#/lib/pocketbase'
import type { Job } from '#/lib/pocketbase'

const endOf = (job: Job, now: Date) =>
  job.currently_employed || !job.end ? now : parseDate(job.end)

export function Logbook({ jobs }: { jobs: Job[] }) {
  // Pinned to the start of the month so server and client render identical values.
  const today = new Date()
  const now = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
  const sorted = [...jobs].sort((a, b) => {
    if (a.currently_employed !== b.currently_employed) {
      return a.currently_employed ? -1 : 1
    }
    return parseDate(b.start).getTime() - parseDate(a.start).getTime()
  })

  // One shared time axis so overlapping work (my own business ran alongside jobs) is visible.
  const t0 = Math.min(...jobs.map((j) => parseDate(j.start).getTime()))
  const t1 = now.getTime()
  const pct = (t: number) =>
    Math.round(((t - t0) / (t1 - t0)) * 10000) / 100

  const firstYear = new Date(t0).getUTCFullYear()
  const lastYear = now.getUTCFullYear()
  const step = lastYear - firstYear > 16 ? 5 : 2
  const ticks: number[] = []
  for (let y = Math.ceil((firstYear + 1) / step) * step; y <= lastYear; y += step) {
    ticks.push(y)
  }
  const tickPct = (y: number) => pct(Date.UTC(y, 0, 1))

  return (
    <section id="logbook" className="wrap pb-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-6">
        <h2 className="heading">Logbook</h2>
        <p className="text-ink-soft max-w-[48ch] text-sm">
          Where I've worked since I started flying for a living.{' '}
          <a
            href="/resume_richard_westmoreland.pdf"
            className="text-signal underline underline-offset-4"
          >
            Download the résumé
          </a>
          .
        </p>
      </div>

      <div className="ledger-row hidden border-t-0 py-0 pb-2 md:grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <div className="data text-ink-soft relative h-5">
          {ticks.map((y) => (
            <span
              key={y}
              className="absolute -translate-x-1/2"
              style={{ left: `${tickPct(y)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      <ol>
        {sorted.map((job) => {
          const start = parseDate(job.start)
          const end = endOf(job, now)
          const current = job.currently_employed
          return (
            <li key={job.id} className="ledger-row">
              <p className="data text-ink-soft">
                {formatMonthYear(job.start)} to{' '}
                {current || !job.end ? 'now' : formatMonthYear(job.end)}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={mediaUrl(job, job.logo)}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="size-9 flex-none rounded-md bg-white object-contain p-1"
                />
                <div>
                  <p className="font-bold leading-tight">{job.company}</p>
                  <p className="text-ink-soft text-sm">{job.title}</p>
                </div>
              </div>
              <p className="data">
                {formatDuration(monthsBetween(start, end))}
              </p>
              <div
                className="bg-rule/50 relative h-2 rounded-full"
                role="img"
                aria-label={`${job.company}, ${formatMonthYear(job.start)} to ${current ? 'present' : formatMonthYear(job.end)}`}
              >
                <span
                  className={`absolute inset-y-0 rounded-full ${current ? 'bg-signal' : 'bg-ink'}`}
                  style={{
                    left: `${pct(start.getTime())}%`,
                    width: `${Math.max(1.5, pct(end.getTime()) - pct(start.getTime()))}%`,
                  }}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
