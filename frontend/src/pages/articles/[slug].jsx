import { ArticleLayout } from '@/components/ArticleLayout'
import Markdown from '@/components/Markdown'
import { fetchStrapi } from 'util/api'
import rehypeRaw from 'rehype-raw'

export default function ArticlePage({ article }) {
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
        <Markdown children={content} />
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

  const postData = await fetch(
    `https://admin.ilearnedathing.com/api/posts?filter[slug][$eq]=${params.slug}&populate=*`
  ).then((res) => res.json())

  return {
    props: {
      article: postData.data[0],
    },
  }
}
