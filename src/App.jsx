import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ChatProvider } from './context/ChatContext'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import './styles/app.css'

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="app-layout">
          <Sidebar />
          <ChatWindow />
        </div>
      </ChatProvider>
    </ThemeProvider>
  )
}
