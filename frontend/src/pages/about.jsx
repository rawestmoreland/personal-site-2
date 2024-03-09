import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import { fetchAPI } from 'util/api';
import { getPocketbaseMedia } from 'util/media';
import { Prose } from '@/components/Prose';
import Markdown from '@/components/Markdown';

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <a
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
        legacyBehavior
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export default function About({ content }) {
  return (
    <>
      <Head>
        <title>About - Richard Westmoreland</title>
        <meta
          name="description"
          content="I'm Richard Westmoreland. Let me help you build a beautiful, responsive and performant website."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={getPocketbaseMedia(
                  content['@collectionName'],
                  content.id,
                  content.image
                )}
                alt=""
                height={400}
                width={400}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Prose>
              <Markdown content={content.title} />
            </Prose>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <Prose>
                <Markdown content={content.bio} />
              </Prose>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://github.com/rawestmoreland"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/richardawestmoreland"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:richard@westmorelandcreative.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                richard@westmorelandcreative.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const content = await fetchAPI({ path: '/collections/about_me/records' });

  return {
    props: {
      content: content.items[0],
    },
  };
}
