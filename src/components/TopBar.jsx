import React, { useState } from 'react'
import { Menu, Sun, Moon, Settings, Cpu } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { useTheme } from '../context/ThemeContext'
import ApiKeyModal from './ApiKeyModal'
import './TopBar.css'

export default function TopBar() {
  const { activeChat, sidebarOpen, setSidebarOpen } = useChat()
  const { theme, toggleTheme } = useTheme()
  const [showApiModal, setShowApiModal] = useState(false)

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <button
            className="topbar-btn"
            onClick={() => setSidebarOpen(o => !o)}
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="topbar-title">
            {activeChat ? activeChat.title : 'AI Chat Application'}
          </div>
        </div>

        <div className="topbar-right">
          <div className="model-pill">
            <Cpu size={12} />
            <span>Claude Sonnet</span>
          </div>

          <button
            className="topbar-btn"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="topbar-btn"
            onClick={() => setShowApiModal(true)}
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={17} />
          </button>
        </div>
      </header>

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </>
  )
}
