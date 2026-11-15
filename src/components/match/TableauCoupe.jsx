import { Link } from 'react-router-dom'
import BadgeStatut from './BadgeStatut'

// Un match dans le tableau de coupe : deux lignes (nom et score), puis le badge.
// Le perdant est grisé ; tant qu'il n'y a pas de score, les deux noms restent en gras.
function MatchTableau({ match }) {
  const contenu = (
    <>
      {match.equipes.map((equipe) => (
        <p key={equipe.nom} className={`match-tableau__ligne ${equipe.perdant ? 'match-tableau__ligne--perdant' : ''}`}>
          <span>{equipe.nom}</span>
          {equipe.score !== undefined && <span className="match-tableau__score">{equipe.score}</span>}
        </p>
      ))}
      <div className="match-tableau__pied">
        <BadgeStatut statut={match.statut} taille="petite" />
        {match.note && <span className="match-tableau__note">{match.note}</span>}
      </div>
    </>
  )

  if (match.lien) {
    return <Link to={match.lien} className="match-tableau match-tableau--lien">{contenu}</Link>
  }
  return <div className="match-tableau">{contenu}</div>
}

// Tableau de coupe complet (figure 18) : une colonne par tour.
// Chaque colonne répartit ses matchs sur toute la hauteur,
// ce qui place chaque match du tour suivant au milieu des deux matchs qui y mènent.
function TableauCoupe({ tours }) {
  return (
    <div className="tableau-coupe">
      <div className="tableau-coupe__grille">
        {tours.map((tour) => (
          <section key={tour.titre} className="tableau-coupe__tour">
            <h3 className="tableau-coupe__titre">{tour.titre}</h3>
            <div className="tableau-coupe__matchs">
              {tour.matchs.map((match) => (
                <MatchTableau key={match.id} match={match} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default TableauCoupe
