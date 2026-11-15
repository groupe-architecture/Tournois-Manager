import React from 'react';
import '../../styles/components/TournamentChat.css';

export default function ChatMessage({ author, avatar, timestamp, text, isMe = false }) {
  return (
    <div className={`chat-message ${isMe ? 'chat-message--me' : ''}`}>
      <div className="chat-message__avatar">{avatar}</div>
      <div className="chat-message__body">
        <div className="chat-message__meta">
          <span className="chat-message__author">{author}</span>
          <span className="chat-message__time">{timestamp}</span>
        </div>
        <p className="chat-message__text">{text}</p>
      </div>
    </div>
  );
}