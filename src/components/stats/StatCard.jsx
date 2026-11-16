/**
 * Un bloc de statistiques (« Meilleurs marqueurs », « Buteurs », « Clean sheets »…),
 * figures 13, 16 et 18. Chaque ligne : rang (facultatif), joueur, équipe (facultative), valeur.
 */
export default function StatCard({ titre, lignes = [], note }) {
  return (
    <section className="carte stat-card">
      <h2 className="stat-card__titre">{titre}</h2>

      <ol className="stat-card__liste">
        {lignes.map((ligne) => (
          <li key={ligne.nom} className="stat-card__ligne">
            <span className="stat-card__joueur">
              {ligne.rang && `${ligne.rang}. `}{ligne.nom}
              {ligne.equipe && <span className="stat-card__equipe"> · {ligne.equipe}</span>}
            </span>
            <span className="stat-card__valeur">
              <strong>{ligne.valeur}</strong>
              {ligne.unite && <span className="stat-card__detail"> {ligne.unite}</span>}
              {ligne.detail && <span className="stat-card__detail"> · {ligne.detail}</span>}
            </span>
          </li>
        ))}
      </ol>

      {note && <p className="stat-card__note">{note}</p>}
    </section>
  );
}
