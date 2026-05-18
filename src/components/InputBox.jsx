import React, { useRef, useState, useEffect } from 'react'
import { Send, Square } from 'lucide-react'
import './InputBox.css'

export default function InputBox({ onSend, isLoading, prefill, onPrefillUsed }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (prefill) {
      setValue(prefill)
      onPrefillUsed?.()
      textareaRef.current?.focus()
    }
  }, [prefill])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [value])

  const handleSubmit = () => {
    const text = value.trim()
    if (!text || isLoading) return
    onSend(text)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="input-area">
      <div className={`input-box ${isLoading ? 'loading' : ''} ${value ? 'has-content' : ''}`}>
        <textarea
          ref={textareaRef}
          className="input-textarea"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Message AI Assistant... (Shift+Enter for new line)"
          rows={1}
          disabled={isLoading}
          aria-label="Message input"
        />
        <button
          className={`send-btn ${value.trim() && !isLoading ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          aria-label="Send message"
          title="Send (Enter)"
        >
          {isLoading ? (
            <div className="loading-spinner" />
          ) : (
            <Send size={15} />
          )}
        </button>
      </div>
      <div className="input-footer">
        AI Chat may produce inaccurate information. Verify important facts.
      </div>
    </div>
  )
}
