// src/components/ContentCreation.jsx
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const ContentCreation = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]) // Chat messages
  const [loading, setLoading] = useState(false)
  const chatContainerRef = useRef(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const newUserMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, newUserMessage])
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/generate-content', {
        prompt: "generate content on:"+input,
      })

      const newBotMessage = {
        sender: 'bot',
        text: res.data.response || 'Received response!',
      }

      setMessages((prev) => [...prev, newBotMessage])
      setLoading(false);
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        sender: 'bot',
        text: 'Error getting response.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setInput('')
  }

  // Scroll to bottom when messages update
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xl p-3 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-white border self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      {loading && (
          <div className="max-w-xl p-3 rounded-lg bg-white border self-start animate-pulse">
            Generating content...
          </div>
      )}
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-white flex items-center">
        <textarea
          rows="1"
          className="flex-1 p-2 border rounded resize-none focus:outline-none"
          value={input}
          placeholder="Type your content prompt..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ContentCreation
