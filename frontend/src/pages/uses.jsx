import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Spencer Sharp</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="14” MacBook Pro, M1 Pro, 16GB RAM (2021)">
              I was using an Intel-based 16” MacBook Pro prior to this and the
              difference is night and day. I’ve never heard the fans turn on a
              single time, even under the incredibly heavy loads I put it
              through.
            </Tool>
            <Tool title='Dell 27" 4k UHD Monitor (S2721QS) x2'>
              I contemplated a single, curved ultrawide monitor, but having two
              27&ldquo; inch displays allows me to divide my orkspace and
              maximize efficiency.
            </Tool>
            <Tool title="Apple Magic Keyboard">
              Nothing fancy here. I want something that feels identical to my
              macbook keyboard so that the transition feels seamless.
            </Tool>
            <Tool title="LG MX Master 3 Mouse for Mac">
              Fully customizable controls make this mouse stand out. All of the
              gestures of the Apple Magic mouse plus physical wheels and
              buttons. Everyone likes wheels and buttons, right?
            </Tool>
            <Tool title="Steelcase Leap v2 Chair">
              If you&quot;re going to sit in one place for 8-12 hours a day, do
              your back a favor and buy an expensive chair..
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VSCode">
              Every feature you could image all wrapped into a simple to use
              IDE. And all the extensions you could ever want or need.
            </Tool>
            <Tool title="iTerm2">
              I’m honestly not even sure what features I get with this that
              aren’t just part of the macOS Terminal but it’s what I use.
            </Tool>
            <Tool title="Postico">
              An simple tool for working with postgres databases - which happen
              to be my database of choice.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Figma">
              From wireframes to whiteboarding. This tool can do it all.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Alfred">
              It’s not the newest kid on the block but it’s still the fastest.
              The Sublime Text of the application launcher world.
            </Tool>
            <Tool title="Reflect">
              Using a daily notes system instead of trying to keep things
              organized by topics has been super powerful for me. And with
              Reflect, it’s still easy for me to keep all of that stuff
              discoverable by topic even though all of my writing happens in the
              daily note.
            </Tool>
            <Tool title="toggle">
              My tool of choice for keeping track of time spent on projects. It
              also helps me focus by chubnking my time throughout the day.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
