import Head from 'next/head';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { formatDate } from '@/lib/formatDate';
import { GET_POSTS } from 'hashnode/queries/getPosts';
import { request } from 'graphql-request';
import { normalizeArticles } from 'hashnode/utils/normalizeArticles';

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={article.url} newTab>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(article.publishedAt)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.publishedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.publishedAt)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Richard Westmoreland</title>
        <meta
          name="description"
          content="All of my long-form thoughts on frontend development, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software, frontend development and the most modern frameworks in use today."
        intro="All of my long-form thoughts on frontend development, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  const hashnodeArticles = await request(
    process.env.NEXT_PUBLIC_HASHNODE_API_URL,
    GET_POSTS
  );
  const normalizedArticles = normalizeArticles(hashnodeArticles);

  return {
    props: {
      articles: normalizedArticles,
    },
  };
}
