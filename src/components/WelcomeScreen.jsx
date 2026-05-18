import React from 'react'
import { Sparkles, Code, BookOpen, Lightbulb, Zap, Terminal } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import './WelcomeScreen.css'

const suggestions = [
  { icon: <Code size={15} />, text: 'Explain React hooks with examples', category: 'Code' },
  { icon: <Terminal size={15} />, text: 'Write a Python REST API with Flask', category: 'Code' },
  { icon: <Lightbulb size={15} />, text: 'What is system design? Explain with examples', category: 'Learn' },
  { icon: <BookOpen size={15} />, text: 'How does async/await work in JavaScript?', category: 'Learn' },
  { icon: <Zap size={15} />, text: 'Design a scalable database schema for a chat app', category: 'Design' },
  { icon: <Sparkles size={15} />, text: 'Explain the difference between SQL and NoSQL', category: 'Learn' },
]

export default function WelcomeScreen({ onSuggestion }) {
  const { createChat, setActiveChatId } = useChat()

  const handleSuggestion = (text) => {
    onSuggestion(text)
  }

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <div className="welcome-icon">
          <Sparkles size={26} />
        </div>
        <h1 className="welcome-title">How can I help you today?</h1>
        <p className="welcome-subtitle">
          Ask me anything — coding, concepts, analysis, or creative ideas.
        </p>
      </div>

      <div className="suggestion-grid">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="suggestion-card"
            onClick={() => handleSuggestion(s.text)}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="suggestion-top">
              <span className="suggestion-icon">{s.icon}</span>
              <span className="suggestion-category">{s.category}</span>
            </div>
            <span className="suggestion-text">{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
