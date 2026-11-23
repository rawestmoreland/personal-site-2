import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { Footer } from '#/components/Footer'
import { Header } from '#/components/Header'
import { Hero } from '#/components/Hero'
import { Logbook } from '#/components/Logbook'
import { isLanded, ProjectRack } from '#/components/ProjectRack'
import { Story } from '#/components/Story'
import { Toolkit } from '#/components/Toolkit'
import { portfolioQuery } from '#/lib/pocketbase'

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  component: Home,
})

function Home() {
  const { data } = useSuspenseQuery(portfolioQuery)

  return (
    <>
      <Header />
      <main>
        <Hero liveCount={data.projects.filter((p) => !isLanded(p)).length} />
        <ProjectRack projects={data.projects} />
        <Logbook jobs={data.jobs} />
        <Story about={data.about} />
        <Toolkit categories={data.categories} tools={data.tools} />
      </main>
      <Footer />
    </>
  )
}
