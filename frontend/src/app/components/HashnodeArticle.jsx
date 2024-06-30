import { Card } from '@/components/Card';
import { formatDate } from '@/lib/formatDate';

export function HashnodeArticle({ article }) {
  const { title, description, publishedAt, url } = article;
  return (
    <Card as="article">
      <Card.Title href={url} newTab>
        {title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={publishedAt} decorate>
        {formatDate(publishedAt)}
      </Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}
