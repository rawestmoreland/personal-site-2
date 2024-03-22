export function normalizeArticles(articles) {
  return articles.publication.posts.edges.map(({ node }) => {
    const { id, title, url, brief, publishedAt } = node;

    return {
      id,
      title,
      url,
      description: brief,
      publishedAt,
    };
  });
}
