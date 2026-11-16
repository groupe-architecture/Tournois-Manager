import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

/**
 * Chat du tournoi (figures 10, 13, 16, 18), réservé aux participants.
 * La page garde la liste des messages ; l'envoi est simulé (rien ne part vers un serveur).
 * @param {Array} messages - [{ id, auteur, createur, heure, texte }]
 * @param {function} onSend - Appelée avec le texte du nouveau message
 */
export default function TournamentChat({ messages = [], onSend }) {
  return (
    <section className="carte tournament-chat">
      <div className="tournament-chat__tete">
        <h2 className="tournament-chat__titre">Chat du tournoi</h2>
        <p className="tournament-chat__sous-titre">Réservé aux participants</p>
      </div>

      <ul className="tournament-chat__messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </ul>

      <ChatInput onSend={onSend} />
    </section>
  );
}
