import React, { useState, useEffect, useRef } from 'react';

export default function AssistantChat({ goldenName = "Sunny" }) {
  const [messages, setMessages] = useState([
    { from: 'ai', text: `Hi, I'm ${goldenName}. I'm here to listen. How are you feeling right now?` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: 'user', text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      const aiMessage = { from: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages(prev => [
        ...prev,
        { from: 'ai', text: `Hmm… I couldn’t respond just now. Want to try again in a moment?` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        ref={chatRef}
        className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 text-sm whitespace-pre-line ${
              msg.from === 'user'
                ? 'text-right text-blue-600'
                : 'text-left text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <textarea
        className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
        rows={2}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />

      <button
        onClick={sendMessage}
        className="self-end px-4 py-2 bg-pink-500 text-white rounded-md text-sm disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Thinking…' : 'Send'}
      </button>
    </div>
  );
}
