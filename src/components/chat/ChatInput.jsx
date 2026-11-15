import React, { useState } from 'react';
import '../../styles/components/TournamentChat.css';

/**
 * @param {function} onSend - Callback(texte) lors de l'envoi
 */
export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input__field"
        placeholder="Écrire un message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={500}
      />
      <button type="submit" className="chat-input__button" disabled={!value.trim()}>
        Envoyer
      </button>
    </form>
  );
}