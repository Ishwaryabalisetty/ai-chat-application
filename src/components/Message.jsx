import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from './CodeBlock'
import './Message.css'

const AI_AVATAR = (
  <div className="msg-avatar ai-avatar">AI</div>
)

const USER_AVATAR = (
  <div className="msg-avatar user-avatar">U</div>
)

export default function Message({ message, isStreaming }) {
  const isUser = message.role === 'user'

  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      if (!inline && match) {
        return (
          <CodeBlock language={match[1]}>
            {children}
          </CodeBlock>
        )
      }
      if (!inline && !match && String(children).includes('\n')) {
        return (
          <CodeBlock language="text">
            {children}
          </CodeBlock>
        )
      }
      return (
        <code className="inline-code" {...props}>
          {children}
        </code>
      )
    },
    table({ children }) {
      return (
        <div className="table-wrapper">
          <table>{children}</table>
        </div>
      )
    },
    blockquote({ children }) {
      return <blockquote className="md-blockquote">{children}</blockquote>
    },
    a({ href, children }) {
      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    }
  }

  return (
    <div className={`message ${isUser ? 'user' : 'ai'}`}>
      {!isUser && AI_AVATAR}
      <div className="msg-content">
        {!isUser && (
          <div className="msg-sender">AI Assistant</div>
        )}
        <div className={`msg-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
              {isStreaming && <span className="typing-cursor" />}
            </div>
          )}
        </div>
      </div>
      {isUser && USER_AVATAR}
    </div>
  )
}
