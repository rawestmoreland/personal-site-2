'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { HashnodeArticle } from './HashnodeArticle';
import { Resume } from './Resume';
import { SocialLink } from './SocialLink';
import { Photos } from './Photos';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import { Button } from '@/components/Button';

const PAGE_SIZE = 5;

export function HomeContent({ articles, jobs, homeImages }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
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
      {articles.length > 0 && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {visibleArticles.map((article) => (
                <HashnodeArticle key={article.id} article={article} />
              ))}
              {hasMore && (
                <div>
                  <Button onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                    Load more
                  </Button>
                </div>
              )}
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
