import React, { createContext, useContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const ChatContext = createContext()

const STORAGE_KEY = 'ai-chat-history'

function loadChats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveChats(chats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(loadChats)
  const [activeChatId, setActiveChatId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('ai-chat-apikey') || '')

  const activeChat = chats.find(c => c.id === activeChatId) || null

  const createChat = useCallback(() => {
    const newChat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setChats(prev => {
      const updated = [newChat, ...prev]
      saveChats(updated)
      return updated
    })
    setActiveChatId(newChat.id)
    return newChat.id
  }, [])

  const deleteChat = useCallback((chatId) => {
    setChats(prev => {
      const updated = prev.filter(c => c.id !== chatId)
      saveChats(updated)
      return updated
    })
    if (activeChatId === chatId) setActiveChatId(null)
  }, [activeChatId])

  const renameChat = useCallback((chatId, title) => {
    setChats(prev => {
      const updated = prev.map(c => c.id === chatId ? { ...c, title } : c)
      saveChats(updated)
      return updated
    })
  }, [])

  const addMessage = useCallback((chatId, message) => {
    setChats(prev => {
      const updated = prev.map(c => {
        if (c.id !== chatId) return c
        const messages = [...c.messages, message]
        const title = c.title === 'New Chat' && message.role === 'user'
          ? message.content.slice(0, 42) + (message.content.length > 42 ? '…' : '')
          : c.title
        return { ...c, messages, title, updatedAt: Date.now() }
      })
      saveChats(updated)
      return updated
    })
  }, [])

  const updateLastMessage = useCallback((chatId, content) => {
    setChats(prev => {
      const updated = prev.map(c => {
        if (c.id !== chatId) return c
        const messages = [...c.messages]
        messages[messages.length - 1] = { ...messages[messages.length - 1], content }
        return { ...c, messages }
      })
      saveChats(updated)
      return updated
    })
  }, [])

  const saveApiKey = useCallback((key) => {
    setApiKey(key)
    localStorage.setItem('ai-chat-apikey', key)
  }, [])

  return (
    <ChatContext.Provider value={{
      chats, activeChatId, activeChat, isLoading, sidebarOpen, apiKey,
      setActiveChatId, setSidebarOpen, setIsLoading,
      createChat, deleteChat, renameChat, addMessage, updateLastMessage, saveApiKey
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
