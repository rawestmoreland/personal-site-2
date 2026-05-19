import { fetchAPI } from 'util/api';
import { getAllPosts } from 'util/blog';
import { HomeContent } from './components/HomeContent';

const fetchData = async () => {
  const [articles, jobs, homeImages] = await Promise.all([
    getAllPosts(),
    fetchAPI({ path: '/collections/jobs/records?sort=-start' }),
    fetchAPI({ path: '/collections/home_images/records' }),
  ]);

  return {
    articles,
    jobs: jobs.items,
    homeImages: homeImages.items,
  };
};

export default async function Page() {
  const { articles, jobs, homeImages } = await fetchData();

  return <HomeContent articles={articles} jobs={jobs} homeImages={homeImages} />;
}
