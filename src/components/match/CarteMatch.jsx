import { Link } from 'react-router-dom'
import BadgeStatut from './BadgeStatut'

// Une ligne de la liste des matchs (figures 10, 13, 16) :
// les deux équipes à gauche, le score ou un message à droite, puis le badge.
// Si le match a une page, toute la carte devient un lien vers elle.
function CarteMatch({ match }) {
  const { equipeA, equipeB, score, message, statut, lien } = match

  const classes = ['carte-match']
  if (statut === 'litige') classes.push('carte-match--litige')
  if (lien) classes.push('carte-match--lien')

  const contenu = (
    <>
      <p className="carte-match__equipes">
        <strong>{equipeA}</strong> <span className="carte-match__vs">vs</span> <strong>{equipeB}</strong>
      </p>
      <div className="carte-match__droite">
        {score ? (
          <span className="carte-match__score">{score}</span>
        ) : (
          <span className="carte-match__message">{message}</span>
        )}
        <BadgeStatut statut={statut} />
      </div>
    </>
  )

  if (lien) {
    return <Link to={lien} className={classes.join(' ')}>{contenu}</Link>
  }
  return <div className={classes.join(' ')}>{contenu}</div>
}

export default CarteMatch
