import Image from "next/image";
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import { formatDate } from '@/lib/formatDate';
import { RESUME_DOWNLOAD } from '@/lib/constants';
import { fetchAPI } from 'util/api';
import { getPocketbaseMedia } from 'util/media';
import { format } from 'date-fns';

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Article({ article }) {
  const { description, title, publishedAt, slug } = article.attributes;
  return (
    <Card as="article">
      <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={publishedAt} decorate>
        {formatDate(publishedAt)}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  );
}

function Resume({ jobs }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {jobs.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={getPocketbaseMedia(
                  role['@collectionName'],
                  role.id,
                  role.logo
                )}
                alt=""
                className="h-7 w-7"
                unoptimized
                height={60}
                width={60}
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${format(
                  new Date(role.start),
                  'LLL yyyy'
                )} until ${
                  role.currently_employed
                    ? 'present'
                    : format(new Date(role.end), 'LLL yyyy')
                }`}
              >
                <time dateTime={role.start}>
                  {format(new Date(role.start), 'LLL yyyy')}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end}>
                  {role.currently_employed
                    ? 'present'
                    : format(new Date(role.end), 'LLL yyyy')}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href={RESUME_DOWNLOAD}
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

function Photos({ images }) {
  let rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images
          .sort((a, b) => a.order - b.order)
          .map((image, imageIndex) => (
            <div
              key={image.id}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-white sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
                { 'bg-zinc-100 dark:bg-zinc-800': !(imageIndex % 2) }
              )}
            >
              <Image
                src={getPocketbaseMedia(
                  image['@collectionName'],
                  image.id,
                  image.image
                )}
                priority
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className={clsx('absolute inset-0 h-full w-full', {
                  'object-cover': !(imageIndex % 2),
                  'object-contain': imageIndex % 2,
                })}
                height={329}
                width={298}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Home({ articles, jobs, homeImages }) {
  return (
    <>
      <Head>
        <title>
          Richard Westmoreland - Software engineer, entrepreneur, and traveler
        </title>
        <meta
          name="description"
          content="I'm Richard, a software engineer and entrepreneur based in
          Houston, TX. I build beautiful, responsive websites and performant
          apps for any industry. When I'm not building cool things for
          amazing people, I'm traveling and experiencing the world."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer, entrepreneur, and traveler.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Richard, a software engineer and entrepreneur based in
            Lisbon, Portugal. I build beautiful, responsive websites and
            performant apps for any industry. When I&apos;m not building cool
            things for amazing people, I&apos;m traveling and experiencing the
            world.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/rawestmoreland"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/richardawestmoreland"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos images={homeImages} />
      {articles && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {articles.map((article) => (
                <Article key={`article-${article.id}`} article={article} />
              ))}
            </div>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <Resume jobs={jobs} />
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export async function getStaticProps() {
  const articles = await fetch('https://admin.ilearnedathing.com/api/posts', {
    headers: { 'Content-type': 'application/json' },
  }).then((data) => data.json());

  const jobs = await fetchAPI({
    path: '/collections/jobs/records?sort=-start',
  });
  const homeImages = await fetchAPI({
    path: '/collections/home_images/records',
  });

  return {
    props: {
      articles: articles.data,
      homeImages: homeImages.items,
      jobs: jobs.items,
    },
  };
}
