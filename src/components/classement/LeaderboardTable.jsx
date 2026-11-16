import { COLONNES_CLASSEMENT } from '../../utils/disciplineConfig';

/**
 * Classement d'un championnat (figures 13 et 16).
 * Les colonnes dépendent de la discipline ; les lignes arrivent déjà triées.
 * @param {string} discipline - Clé de discipline (DISCIPLINES.*)
 * @param {Array} lignes - Une ligne par équipe
 * @param {string} note - Explication affichée sous le tableau
 * @param {string} lienTout - Texte du lien à droite du titre (facultatif)
 * @param {function} onLienTout - Appelée au clic sur ce lien
 * @param {boolean} avecTitre - Afficher le titre « Classement »
 */
export default function LeaderboardTable({ discipline, lignes = [], note, lienTout, onLienTout, avecTitre = true }) {
  const colonnes = COLONNES_CLASSEMENT[discipline];

  if (!colonnes) {
    return <p className="leaderboard__erreur">Discipline inconnue.</p>;
  }

  return (
    <section className="leaderboard">
      {avecTitre && (
        <div className="leaderboard__tete">
          <h2>Classement</h2>
          {lienTout && (
            <button type="button" className="leaderboard__lien" onClick={onLienTout}>{lienTout}</button>
          )}
        </div>
      )}

      <div className="leaderboard__carte">
        <table className="leaderboard__table">
          <thead>
            <tr>
              {colonnes.map((colonne) => (
                <th key={colonne.cle} className={colonne.type ? `leaderboard__${colonne.type}` : ''}>{colonne.titre}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne) => (
              <tr key={ligne.equipe}>
                {colonnes.map((colonne) => (
                  <td key={colonne.cle} className={colonne.type ? `leaderboard__${colonne.type}` : ''}>
                    {ligne[colonne.cle] ?? 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className="leaderboard__note">{note}</p>}
    </section>
  );
}
