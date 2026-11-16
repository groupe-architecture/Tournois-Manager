/**
 * Un message du chat : auteur (en violet s'il a créé le tournoi), rôle, heure, puis le texte.
 */
export default function ChatMessage({ auteur, createur = false, heure, texte }) {
  return (
    <li className="chat-message">
      <p className="chat-message__meta">
        <strong className={createur ? 'chat-message__auteur--createur' : ''}>{auteur}</strong>
        {createur && ' · créateur'} · {heure}
      </p>
      <p className="chat-message__texte">{texte}</p>
    </li>
  );
}
