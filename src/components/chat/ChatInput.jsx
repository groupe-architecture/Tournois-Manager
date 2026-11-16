import { useState } from 'react';

/**
 * Zone de saisie du chat (« Écrire un message » + « Envoyer »).
 * @param {function} onSend - Appelée avec le texte du message
 */
export default function ChatInput({ onSend }) {
  const [texte, setTexte] = useState('');

  function envoyer(evenement) {
    evenement.preventDefault();
    const message = texte.trim();
    if (!message) return;
    onSend(message);
    setTexte('');
  }

  return (
    <form className="chat-input" onSubmit={envoyer}>
      <input
        type="text"
        className="chat-input__champ"
        placeholder="Écrire un message"
        aria-label="Écrire un message"
        value={texte}
        onChange={(evenement) => setTexte(evenement.target.value)}
        maxLength={500}
      />
      <button type="submit" className="bouton bouton--principal chat-input__bouton">Envoyer</button>
    </form>
  );
}
