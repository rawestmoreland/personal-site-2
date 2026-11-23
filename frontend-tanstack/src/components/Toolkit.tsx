import type { Tool, ToolCategory } from '#/lib/pocketbase'

export function Toolkit({
  categories,
  tools,
}: {
  categories: ToolCategory[]
  tools: Tool[]
}) {
  return (
    <section id="toolkit" className="wrap pb-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-8">
        <h2 className="heading">Toolkit</h2>
        <p className="text-ink-soft max-w-[48ch] text-sm">
          What I build with, and the gear I'd buy again.
        </p>
      </div>
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {categories.map((cat) => {
          const items = tools.filter((t) => t.category === cat.id)
          if (items.length === 0) return null
          return (
            <div key={cat.id}>
              <h3 className="display border-rule border-b pb-3 text-xl">
                {cat.name}
              </h3>
              <dl>
                {items.map((tool) => (
                  <div key={tool.id} className="border-rule border-b py-4">
                    <dt className="font-bold">{tool.name.trim()}</dt>
                    <dd className="text-ink-soft mt-1 max-w-[60ch] text-sm leading-relaxed">
                      {tool.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>
    </section>
  )
}
