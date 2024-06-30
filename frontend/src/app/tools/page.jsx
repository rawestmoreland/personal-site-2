import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { fetchAPI } from 'util/api';

export const metadata = {
  title: 'Tools - Richard Westmoreland',
  description: 'Software I use, gadgets I love, and other things I recommend.',
};

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

const fetchData = async () => {
  const categories = await fetchAPI({
    path: '/collections/tool_categories/records?sort=created',
  });

  const tools = await fetchAPI({
    path: '/collections/tools/records?expand=category',
  });

  return { categories, tools };
};

export default async function Tools() {
  const { categories, tools } = await fetchData();

  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        {categories.items.map((category, index) => {
          return (
            <ToolsSection
              key={`tool-section-${category.id}`}
              title={category.name}
            >
              {tools.items
                .filter(
                  (tool) => tool['@expand'].category.name === category.name
                )
                .map((tool) => {
                  return (
                    <Tool key={`tool-${tool.id}`} title={tool.name}>
                      {tool.description}
                    </Tool>
                  );
                })}
            </ToolsSection>
          );
        })}
      </div>
    </SimpleLayout>
  );
}
