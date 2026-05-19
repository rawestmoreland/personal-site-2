import matter from 'gray-matter';

const REPO = 'rawestmoreland/ilearnedathingblog';
const BRANCH = 'main';
const CACHE = { revalidate: 3600 };

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchPostFile(filename) {
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${filename}`;
  const res = await fetch(url, { headers: githubHeaders(), next: CACHE });
  const text = await res.text();
  const { data, content: rawContent } = matter(text);
  // Hashnode exports images with a non-standard align attribute inside the URL,
  // e.g. ![alt](https://... align="center"). Strip it so the markdown parser renders them correctly.
  const content = rawContent.replace(
    /!\[([^\]]*)\]\((\S+?) align="[^"]*"\)/g,
    '![$1]($2)'
  );
  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === 'string'
    ? data.tags.split(',').map((t) => t.trim())
    : [];
  return {
    id: data.cuid,
    title: data.title,
    description: data.seoDescription ?? '',
    publishedAt: data.datePublished,
    slug: data.slug,
    cover: data.cover ?? null,
    tags,
    content,
  };
}

export async function getAllPosts() {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/`, {
    headers: githubHeaders(),
    next: CACHE,
  });
  const files = await res.json();
  const mdFiles = files
    .filter((f) => f.name.endsWith('.md') && f.name !== 'README.md' && !f.name.startsWith('draft-'))
    .map((f) => f.name);

  const posts = await Promise.all(mdFiles.map(fetchPostFile));
  return posts.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
