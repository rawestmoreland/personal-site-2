export function Hero({ liveCount }: { liveCount: number }) {
  return (
    <section id="top" className="wrap pt-10 pb-16 sm:pt-16 sm:pb-24">
      <h1 className="display text-[clamp(2.25rem,10.4vw,8.5rem)]">
        Richard
        <br />
        Westmoreland
      </h1>
      <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-[38ch] text-lg leading-relaxed sm:text-xl">
          I flew regional airliners for years, the last four as a captain. Now I
          build software, and run a handful of small products of my own.
        </p>
        <p className="text-ink-soft max-w-[26ch] text-sm md:text-right">
          {liveCount} {liveCount === 1 ? 'project is' : 'projects are'} live
          right now. They're on the board below.
        </p>
      </div>
    </section>
  )
}
