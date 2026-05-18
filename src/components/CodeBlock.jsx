import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './CodeBlock.css'

export default function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const code = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const displayLang = language || 'text'

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-lang-badge">{displayLang}</span>
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <><Check size={13} /><span>Copied!</span></>
          ) : (
            <><Copy size={13} /><span>Copy</span></>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={displayLang}
        style={theme === 'dark' ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 10px 10px',
          fontSize: '13px',
          lineHeight: '1.6',
          padding: '16px 18px',
          background: theme === 'dark' ? '#1a1a22' : '#f8f8fc',
        }}
        showLineNumbers={code.split('\n').length > 5}
        lineNumberStyle={{
          color: theme === 'dark' ? '#444' : '#bbb',
          minWidth: '2.5em',
          paddingRight: '1em',
          userSelect: 'none',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
