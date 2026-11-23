const links = [
  { href: '#in-flight', label: 'Projects' },
  { href: '#logbook', label: 'Logbook' },
  { href: '#story', label: 'Story' },
  { href: '#toolkit', label: 'Toolkit' },
]

export function Header() {
  return (
    <header className="wrap flex items-center justify-between gap-6 py-6">
      <a
        href="#top"
        className="display text-xl"
        aria-label="Richard Westmoreland, top of page"
      >
        RW
      </a>
      <nav aria-label="Primary">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-ink-soft transition-colors hover:text-signal"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href="/resume_richard_westmoreland.pdf"
              className="font-bold hover:text-signal"
            >
              Résumé
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
