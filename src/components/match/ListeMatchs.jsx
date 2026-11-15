import { Link } from 'react-router-dom'
import CarteMatch from './CarteMatch'

// Liste des matchs d'une journée ou d'un tour (figures 10, 13, 16).
// À droite du titre : soit un compteur (« 3 matchs »), soit un lien (« Voir les 8 matchs »).
function ListeMatchs({ titre, compteur, lienTout, matchs }) {
  return (
    <section className="liste-matchs">
      <div className="liste-matchs__tete">
        <h2>{titre}</h2>
        {compteur && <span className="liste-matchs__compteur">{compteur}</span>}
        {lienTout && <Link to={lienTout.to} className="liste-matchs__lien">{lienTout.texte}</Link>}
      </div>

      <div className="liste-matchs__cartes">
        {matchs.map((match) => (
          <CarteMatch key={match.id} match={match} />
        ))}
      </div>
    </section>
  )
}

export default ListeMatchs
