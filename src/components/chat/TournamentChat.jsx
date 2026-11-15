import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import '../../styles/components/TournamentChat.css';

/**
 * @param {Array} messages - Liste des messages
 * @param {function} onSend - Callback d'envoi (mock pour l'instant)
 * @param {string} currentUserName - Nom du joueur courant
 */
export default function TournamentChat({ messages = [], onSend, currentUserName = 'MaPseudo' }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    if (onSend) {
      onSend(text);
    } else {
      console.log('[Chat mock] Message envoyé :', text);
    }
  };

  return (
    <aside className="tournament-chat">
      <div className="tournament-chat__header">
        <h3 className="tournament-chat__title">💬 Chat du tournoi</h3>
        <span className="tournament-chat__count">{messages.length} messages</span>
      </div>

      <div className="tournament-chat__messages" ref={scrollRef}>
        {messages.length === 0 ? (
          <p className="tournament-chat__empty">Aucun message pour l'instant. Sois le premier à écrire !</p>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              author={msg.author}
              avatar={msg.avatar}
              timestamp={msg.timestamp}
              text={msg.text}
              isMe={msg.author === currentUserName}
            />
          ))
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </aside>
  );
}