import { queryOptions } from '@tanstack/react-query'

// Falls back to the production instance because the local pb_data has no content tables.
const PB_URL: string =
  import.meta.env.VITE_POCKETBASE_URL ??
  'https://personal-site-pocketbase.fly.dev/api'

type Base = { id: string; collectionName: string }

export type AboutMe = Base & { title: string; bio: string; image: string }

export type Job = Base & {
  company: string
  title: string
  start: string
  end: string
  currently_employed: boolean
  logo: string
}

export type Project = Base & {
  name: string
  description: string
  icon: string
  url: string
  url_text: string
  project_date: string
  visible: boolean
}

export type ToolCategory = Base & { name: string }

export type Tool = Base & {
  name: string
  description: string
  category: string
}

async function list<T>(
  collection: string,
  params: Record<string, string> = {},
): Promise<T[]> {
  const qs = new URLSearchParams({ perPage: '100', ...params })
  const res = await fetch(`${PB_URL}/collections/${collection}/records?${qs}`)
  if (!res.ok) {
    throw new Error(`PocketBase ${collection} request failed (${res.status})`)
  }
  const data = (await res.json()) as { items: T[] }
  return data.items
}

export function mediaUrl(record: Base, file: string): string {
  return `${PB_URL}/files/${record.collectionName}/${record.id}/${file}`
}

export const portfolioQuery = queryOptions({
  queryKey: ['portfolio'],
  staleTime: 5 * 60 * 1000,
  queryFn: async () => {
    const [about, jobs, projects, categories, tools] = await Promise.all([
      list<AboutMe>('about_me'),
      list<Job>('jobs'),
      list<Project>('projects', {
        sort: '-project_date',
        filter: '(visible=true)',
      }),
      list<ToolCategory>('tool_categories', { sort: 'created' }),
      list<Tool>('tools', { sort: 'created' }),
    ])
    return { about: about[0], jobs, projects, categories, tools }
  },
})
