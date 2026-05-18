import React, { useState } from 'react'
import { Plus, MessageSquare, Trash2, Edit3, Check, X, ChevronRight } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import './Sidebar.css'

export default function Sidebar() {
  const {
    chats, activeChatId, sidebarOpen,
    createChat, deleteChat, renameChat, setActiveChatId
  } = useChat()

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  const handleNew = () => createChat()

  const handleSelect = (id) => setActiveChatId(id)

  const startEdit = (e, chat) => {
    e.stopPropagation()
    setEditingId(chat.id)
    setEditTitle(chat.title)
  }

  const confirmEdit = (e) => {
    e.stopPropagation()
    if (editTitle.trim()) renameChat(editingId, editTitle.trim())
    setEditingId(null)
  }

  const cancelEdit = (e) => {
    e.stopPropagation()
    setEditingId(null)
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteChat(id)
  }

  // Group chats by time
  const now = Date.now()
  const today = chats.filter(c => now - c.updatedAt < 86400000)
  const yesterday = chats.filter(c => now - c.updatedAt >= 86400000 && now - c.updatedAt < 172800000)
  const older = chats.filter(c => now - c.updatedAt >= 172800000)

  const renderGroup = (label, items) => {
    if (!items.length) return null
    return (
      <div className="sb-group" key={label}>
        <div className="sb-group-label">{label}</div>
        {items.map(chat => (
          <div
            key={chat.id}
            className={`sb-item ${activeChatId === chat.id ? 'active' : ''}`}
            onClick={() => handleSelect(chat.id)}
            onMouseEnter={() => setHoveredId(chat.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <MessageSquare size={14} className="sb-item-icon" />
            {editingId === chat.id ? (
              <input
                className="sb-rename-input"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => {
                  if (e.key === 'Enter') confirmEdit(e)
                  if (e.key === 'Escape') cancelEdit(e)
                }}
                autoFocus
              />
            ) : (
              <span className="sb-item-title">{chat.title}</span>
            )}
            {editingId === chat.id ? (
              <div className="sb-actions">
                <button className="sb-action-btn confirm" onClick={confirmEdit} title="Save"><Check size={13}/></button>
                <button className="sb-action-btn cancel" onClick={cancelEdit} title="Cancel"><X size={13}/></button>
              </div>
            ) : (hoveredId === chat.id || activeChatId === chat.id) ? (
              <div className="sb-actions">
                <button className="sb-action-btn" onClick={e => startEdit(e, chat)} title="Rename"><Edit3 size={13}/></button>
                <button className="sb-action-btn delete" onClick={e => handleDelete(e, chat.id)} title="Delete"><Trash2 size={13}/></button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sb-header">
        <div className="sb-logo">
          <div className="sb-logo-icon">
            <span>AI</span>
          </div>
          <span className="sb-logo-text">ChatApp</span>
        </div>
      </div>

      <button className="sb-new-btn" onClick={handleNew}>
        <Plus size={16} />
        <span>New Chat</span>
      </button>

      <div className="sb-list">
        {chats.length === 0 ? (
          <div className="sb-empty">
            <MessageSquare size={28} opacity={0.3} />
            <p>No conversations yet</p>
            <span>Start a new chat above</span>
          </div>
        ) : (
          <>
            {renderGroup('Today', today)}
            {renderGroup('Yesterday', yesterday)}
            {renderGroup('Older', older)}
          </>
        )}
      </div>

      <div className="sb-footer">
        <div className="sb-footer-text">AI Chat Application</div>
        <div className="sb-footer-version">v1.0.0</div>
      </div>
    </aside>
  )
}
