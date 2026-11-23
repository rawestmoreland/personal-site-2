// PocketBase returns "2022-06-15 12:00:00.000Z"; make it ISO so every runtime parses it.
export const parseDate = (value: string) => new Date(value.replace(' ', 'T'))

const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatMonthYear = (value: string) =>
  monthYear.format(parseDate(value))

export function monthsBetween(from: Date, to: Date) {
  return Math.max(
    0,
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
      (to.getUTCMonth() - from.getUTCMonth()),
  )
}

export function formatDuration(months: number) {
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m}mo`
  if (m === 0) return `${y}y`
  return `${y}y ${m}mo`
}
