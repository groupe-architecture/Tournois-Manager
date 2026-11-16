import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Bouton from '../../components/commun/Bouton';
import Message from '../../components/commun/Message';
import Podium from './Podium';
import RewardsList from './RewardsList';
import { gagnantsParTournoi } from '../../services/mocks/tournamentMockData';

// Confettis de la figure 20 : position (en % de la largeur et en px depuis le haut), couleur, forme.
const CONFETTIS = [
  [3, 30, 'violet', 'point'], [6, 36, 'blanc', 'barre'], [9, 70, 'orange', 'barre'], [12, 22, 'violet', 'point'],
  [8, 108, 'blanc', 'carre'], [14, 118, 'bleu', 'point'], [17, 30, 'blanc', 'barre'], [21, 50, 'violet', 'barre'],
  [26, 155, 'bleu', 'point'], [30, 48, 'vert', 'barre'], [34, 22, 'vert', 'barre'], [37, 12, 'vert', 'barre'],
  [62, 18, 'vert', 'barre'], [66, 4, 'vert', 'point'], [72, 22, 'vert', 'barre'], [78, 152, 'orange', 'barre'],
  [82, 85, 'blanc', 'barre'], [85, 4, 'vert', 'point'], [97, 160, 'violet', 'point'], [44, 70, 'violet', 'point'],
];

// Écran des gagnants (figure 20), affiché quand le dernier match d'un tournoi est validé.
// Adresse : /tournois/:id/gagnants. Les résultats sont des données d'exemple.
export default function WinnersPage() {
  const { id } = useParams();
  const resultat = gagnantsParTournoi[id];
  // Changer la clé relance l'animation des confettis.
  const [animation, setAnimation] = useState(0);
  const [partage, setPartage] = useState(null);

  if (!resultat) {
    return (
      <>
        <h1 className="gagnants__introuvable">Palmarès indisponible</h1>
        <p className="texte-doux">Ce tournoi n’existe pas ou n’est pas encore terminé.</p>
      </>
    );
  }

  async function partager() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPartage('Lien du palmarès copié : tu peux le coller où tu veux.');
    } catch {
      setPartage(`Copie impossible ici. Lien du palmarès : ${window.location.href}`);
    }
  }

  return (
    <div className="gagnants">
      <div key={animation} className="gagnants__confettis" aria-hidden="true">
        {CONFETTIS.map(([gauche, haut, couleur, forme], index) => (
          <span
            key={index}
            className={`confetti confetti--${couleur} confetti--${forme}`}
            style={{ left: `${gauche}%`, top: `${haut}px`, animationDelay: `${(index % 7) * 0.08}s` }}
          />
        ))}
      </div>

      <div className="gagnants__trophee" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="40" height="40">
          <path d="M15 8h18v8a9 9 0 0 1-18 0z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M15 11H9v3a6 6 0 0 0 6 6M33 11h6v3a6 6 0 0 1-6 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 25v8M17 40h14M19 40l1-7h8l1 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="surtitre gagnants__surtitre">{resultat.surtitre}</p>
      <p className="gagnants__champion-label">Champion</p>
      <h1 className="gagnants__champion">{resultat.champion}</h1>
      <p className="gagnants__resume">{resultat.resume}</p>

      <Podium podium={resultat.podium} />

      <RewardsList distinctions={resultat.distinctions} />

      {partage && <Message>{partage}</Message>}

      <div className="gagnants__actions">
        <Bouton to={`/tournois/${id}`}>{resultat.boutonFinal}</Bouton>
        <Bouton variante="secondaire" onClick={partager}>Partager le palmarès</Bouton>
        <button type="button" className="gagnants__rejouer" onClick={() => setAnimation(animation + 1)}>
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M4 10a6 6 0 1 0 2-4.5M4 3v3.5h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Rejouer l’animation
        </button>
      </div>

      <p className="gagnants__note">
        Affichée à tous les participants à la validation du dernier match. Résultats calculés à partir des matchs validés.
      </p>
    </div>
  );
}
