import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Markdown({ content }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      children={content}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className="rounded bg-gray-200 px-[3px] text-xs" {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
