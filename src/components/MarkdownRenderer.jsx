import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import PropTypes from "prop-types";

/*
 * Custom markdown rendered for chat messages, especially code.
 * Code is highlighted using Prism and the language is automatically
 * detected from the className using regular expressions.
 * */
const MarkdownRenderer = ({ markdownText }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {/* In case language cannot be matched/recognized */}
          {children}
        </code>
      );
    },
  };

  return <ReactMarkdown components={components}>{markdownText}</ReactMarkdown>;
};

export default MarkdownRenderer;

MarkdownRenderer.propTypes = {
  markdownText: PropTypes.string,
};
