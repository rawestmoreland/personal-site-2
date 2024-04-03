export function normalizeArticles(articles) {
  const { hasNextPage, endCursor } = articles.publication.posts.pageInfo;
  const normalized = articles.publication.posts.edges.map(({ node }) => {
    const { id, title, url, brief, publishedAt } = node;

    return {
      id,
      title,
      url,
      description: brief,
      publishedAt,
    };
  });

  return {
    hasNextPage,
    endCursor,
    articles: normalized,
  };
}
