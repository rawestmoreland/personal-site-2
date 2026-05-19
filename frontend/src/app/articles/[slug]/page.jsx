import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { formatDate } from '@/lib/formatDate';
import { getAllPosts, getPostBySlug } from 'util/blog';
import { ArticleContent } from './ArticleContent';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} - Richard Westmoreland`,
    description: post.description,
  };
}

export default async function ArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {post.title}
              </h1>
              <time
                dateTime={post.publishedAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                {formatDate(post.publishedAt)}
              </time>
            </header>
            {post.cover && (
              <div className="mt-8">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            )}
            <div className="mt-8">
              <ArticleContent content={post.content} />
            </div>
          </article>
        </div>
      </div>
    </Container>
  );
}
