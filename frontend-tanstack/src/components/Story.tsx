import Markdown from 'react-markdown'
import { mediaUrl } from '#/lib/pocketbase'
import type { AboutMe } from '#/lib/pocketbase'

export function Story({ about }: { about: AboutMe }) {
  return (
    <section id="story" className="wrap pb-24">
      <h2 className="heading pb-8">How I got here</h2>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <img
            src={mediaUrl(about, about.image)}
            alt="Richard on a ridge above a braided glacial river valley, thumbs up"
            width={704}
            height={880}
            loading="lazy"
            className="aspect-[4/5] w-full max-w-sm rounded-sm object-cover"
          />
        </div>
        <div className="story">
          <Markdown>{about.bio.replace(/\r\n/g, '\n')}</Markdown>
        </div>
      </div>
    </section>
  )
}
