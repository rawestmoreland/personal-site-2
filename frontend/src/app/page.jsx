import { fetchAPI } from 'util/api';
import { request } from 'graphql-request';
import { GET_POSTS } from 'hashnode/queries/getPosts';
import { normalizeArticles } from 'hashnode/utils/normalizeArticles';
import { HomeContent } from './components/HomeContent';

const fetchData = async () => {
  const hashnodeArticles = await request(
    process.env.NEXT_PUBLIC_HASHNODE_API_URL,
    GET_POSTS,
    {
      limit: 5,
    }
  );

  const normalizedArticles = normalizeArticles(hashnodeArticles);

  const jobs = await fetchAPI({
    path: '/collections/jobs/records?sort=-start',
  });
  const homeImages = await fetchAPI({
    path: '/collections/home_images/records',
  });

  return {
    hashnodeArticles: normalizedArticles,
    jobs: jobs.items,
    homeImages: homeImages.items,
  };
};

export default async function Page() {
  const { hashnodeArticles, jobs, homeImages } = await fetchData();

  return (
    <>
      <HomeContent
        hashnodeArticles={hashnodeArticles}
        jobs={jobs}
        homeImages={homeImages}
      />
    </>
  );
}
