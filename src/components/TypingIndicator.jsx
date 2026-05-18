import React from 'react'
import './TypingIndicator.css'

export default function TypingIndicator() {
  return (
    <div className="typing-wrap">
      <div className="typing-avatar">AI</div>
      <div className="typing-content">
        <div className="typing-sender">AI Assistant</div>
        <div className="typing-bubble">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  )
}
