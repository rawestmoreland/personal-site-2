import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { fetchStrapi } from 'util/api'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
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
  )
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
            {articles.map((article) => (
              <Article
                key={article.attributes.slug}
                article={article.attributes}
              />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await fetchStrapi('/posts')
  return {
    props: {
      articles: data,
    },
  }
}
