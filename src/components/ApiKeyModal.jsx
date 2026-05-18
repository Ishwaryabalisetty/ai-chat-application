import React, { useState } from 'react'
import { X, Key, Eye, EyeOff, Check } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import './ApiKeyModal.css'

export default function ApiKeyModal({ onClose }) {
  const { apiKey, saveApiKey } = useChat()
  const [value, setValue] = useState(apiKey)
  const [show, setShow] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveApiKey(value.trim())
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 900)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Key size={16} />
            <span>Settings</span>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <label className="modal-label">Groq API Key (Free)</label>
            <p className="modal-desc">
              Enter your free API key from{' '}
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer">
                console.groq.com
              </a>.
              It's stored locally in your browser only — never shared.
            </p>
            <div className="api-key-input-wrap">
              <input
                type={show ? 'text' : 'password'}
                className="api-key-input"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="gsk_..."
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                spellCheck={false}
              />
              <button
                className="toggle-show-btn"
                onClick={() => setShow(s => !s)}
                aria-label={show ? 'Hide key' : 'Show key'}
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className={`modal-save-btn ${saved ? 'saved' : ''}`}
            onClick={handleSave}
          >
            {saved ? <><Check size={14} /> Saved!</> : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  )
}