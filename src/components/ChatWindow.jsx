import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '../context/ChatContext'
import { sendToAI } from '../utils/api'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import WelcomeScreen from './WelcomeScreen'
import InputBox from './InputBox'
import TopBar from './TopBar'
import { v4 as uuidv4 } from 'uuid'
import './ChatWindow.css'

export default function ChatWindow() {
  const {
    activeChat, activeChatId, isLoading, setIsLoading,
    createChat, addMessage, updateLastMessage, apiKey
  } = useChat()

  const messagesEndRef = useRef(null)
  const [streamingId, setStreamingId] = useState(null)
  const [prefill, setPrefill] = useState('')
  const [showTyping, setShowTyping] = useState(false)

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
  }

  useEffect(() => {
    scrollToBottom(false)
  }, [activeChatId])

  useEffect(() => {
    scrollToBottom()
  }, [activeChat?.messages?.length, showTyping])

  const handleSend = async (text) => {
    let chatId = activeChatId
    if (!chatId) {
      chatId = createChat()
      // Wait for state update
      await new Promise(r => setTimeout(r, 50))
    }

    const userMsg = { id: uuidv4(), role: 'user', content: text }
    addMessage(chatId, userMsg)

    setIsLoading(true)
    setShowTyping(true)

    const assistantMsgId = uuidv4()
    const assistantMsg = { id: assistantMsgId, role: 'assistant', content: '' }

    try {
      const history = [...(activeChat?.messages || []), userMsg]

      // Brief delay to show typing indicator
      await new Promise(r => setTimeout(r, 600))
      setShowTyping(false)

      addMessage(chatId, assistantMsg)
      setStreamingId(assistantMsgId)

      await sendToAI(history, apiKey, (chunk) => {
        updateLastMessage(chatId, chunk)
        scrollToBottom()
      })

    } catch (err) {
      setShowTyping(false)
      const errMsg = { id: uuidv4(), role: 'assistant', content: `**Error:** ${err.message}\n\nPlease check your API key in Settings (⚙️ top right).` }
      addMessage(chatId, errMsg)
    } finally {
      setStreamingId(null)
      setIsLoading(false)
      setShowTyping(false)
    }
  }

  const messages = activeChat?.messages || []
  const showWelcome = messages.length === 0

  return (
    <div className="chat-window">
      <TopBar />
      <div className="messages-area">
        <div className="messages-inner">
          {showWelcome ? (
            <WelcomeScreen onSuggestion={(text) => setPrefill(text)} />
          ) : (
            <>
              {messages.map((msg, i) => (
                <Message
                  key={msg.id || i}
                  message={msg}
                  isStreaming={msg.id === streamingId}
                />
              ))}
              {showTyping && <TypingIndicator />}
              <div ref={messagesEndRef} style={{ height: 1 }} />
            </>
          )}
        </div>
      </div>
      <InputBox
        onSend={handleSend}
        isLoading={isLoading}
        prefill={prefill}
        onPrefillUsed={() => setPrefill('')}
      />
    </div>
  )
}
