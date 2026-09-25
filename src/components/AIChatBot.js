'use client';
import { useState, useRef, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Ali's AI assistant. Ask me about his skills, projects, experience, or availability! 👋" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-chatbot-container">
      {isOpen && (
        <div className="chatbot-section floating">
          <div className="chatbot-header">
            <span className="chat-dot" />
            <h3>Ask Ali&apos;s AI Assistant</h3>
            <button className="chat-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'user' ? 'user' : 'bot'}`}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="chat-msg bot">Thinking…</div>}
          </div>
          <div className="chat-input-row">
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about skills..." />
            <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
      <button className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle AI Chatbot">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        ) : (
          <>
            <img src="/chat-icon.jpg" alt="Ali's AI Assistant" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <span>AI Chat</span>
          </>
        )}
      </button>
    </div>
  );
}
