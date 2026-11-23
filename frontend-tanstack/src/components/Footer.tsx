const EMAIL = 'richard@westmorelandcreative.com'

const links = [
  { href: 'https://github.com/rawestmoreland', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/richardawestmoreland', label: 'LinkedIn' },
  { href: '/resume_richard_westmoreland.pdf', label: 'Résumé' },
]

export function Footer() {
  return (
    <footer className="bg-rack text-white">
      <div className="wrap py-16 sm:py-24">
        <h2 className="heading max-w-[18ch]">Have something to build? Write to me.</h2>
        <a
          href={`mailto:${EMAIL}`}
          className="display mt-8 inline-block text-[clamp(1.15rem,4.4vw,2.75rem)] break-all underline decoration-[var(--signal)] decoration-2 underline-offset-8 hover:text-[var(--signal)]"
        >
          {EMAIL}
        </a>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xs text-white/50">
          © {new Date().getFullYear()} Richard Westmoreland
        </p>
      </div>
    </footer>
  )
}
