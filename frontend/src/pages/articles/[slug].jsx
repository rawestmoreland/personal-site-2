import { useRouter } from 'next/router'
import Error from 'next/error'
import { ArticleLayout } from '@/components/ArticleLayout'
import Markdown from '@/components/Markdown'
import { fetchStrapi } from 'util/api'
import qs from 'qs';

export default function ArticlePage({ article }) {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !article) {
    return <Error statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  const { title, description, publishedAt, content } = article.attributes
  const { name } = article.attributes.authors.data[0].attributes
  const meta = {
    author: name,
    date: publishedAt,
    description,
    title,
  }
  return (
    <div>
      <ArticleLayout meta={meta}>
        <Markdown content={content} />
      </ArticleLayout>
    </div>
  )
}

export async function getStaticPaths() {
  const { data } = await fetchStrapi('/posts', { fields: ['slug'] })

  const paths = data.map((post) => {
    const { slug } = post.attributes

    return {
      params: { slug },
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const { params } = context

  const query = qs.stringify({
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
    populate: '*'
  }, {
    encodeValuesOnly: true, // prettify URL
  });

  const postData = await fetch(
    `https://admin.ilearnedathing.com/api/posts?${query}`
  ).then((res) => res.json());

  return {
    props: {
      article: postData.data[0],
    },
  }
}
