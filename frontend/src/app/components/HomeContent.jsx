'use client';

import { Container } from '@/components/Container';
import { HashnodeArticle } from './HashnodeArticle';
import { Resume } from './Resume';
import { SocialLink } from './SocialLink';
import { Photos } from './Photos';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import { Button } from '@/components/Button';
import { normalizeArticles } from 'hashnode/utils/normalizeArticles';
import { useState, useEffect } from 'react';
import { request } from 'graphql-request';
import { GET_POSTS } from 'hashnode/queries/getPosts';

export function HomeContent({ hashnodeArticles, jobs, homeImages }) {
  const [articles, setArticles] = useState(hashnodeArticles);
  const [fetchedArticles, setFetchedArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreArticles = async () => {
    setIsLoading(true);
    const newArticles = await request(
      process.env.NEXT_PUBLIC_HASHNODE_API_URL,
      GET_POSTS,
      {
        limit: 5,
        after: articles.endCursor,
      }
    );

    const normalizedArticles = normalizeArticles(newArticles);

    setFetchedArticles(normalizedArticles);

    setIsLoading(false);
  };

  useEffect(() => {
    if (!fetchedArticles) return;

    setArticles((prev) => ({
      hasNextPage: fetchedArticles.hasNextPage,
      endCursor: fetchedArticles.endCursor,
      articles: [...prev.articles, ...fetchedArticles.articles],
    }));
    setFetchedArticles(null);
  }, [fetchedArticles]);

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
      {articles.articles && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              <>
                {articles.articles &&
                  articles.articles.map((article) => (
                    <HashnodeArticle key={article.id} article={article} />
                  ))}
                {articles.hasNextPage && (
                  <div>
                    <Button disabled={isLoading} onClick={fetchMoreArticles}>
                      Load more
                    </Button>
                  </div>
                )}
              </>
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
