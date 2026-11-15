import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Bouton from '../../components/commun/Bouton'
import BadgeStatut from '../../components/match/BadgeStatut'
import VueCapitaine from './VueCapitaine'
import VueCreateur from './VueCreateur'
import VueValide from './VueValide'
import { matchsDetail } from './matchsExemple'

// Page d'un match (figures 11, 12, 14, 15, 17, 19).
// Tant qu'il n'y a pas de vraie connexion, la vue se choisit dans l'adresse :
//   /matchs/redfox-titans?vue=capitaine   ou   ?vue=createur
// Sans « ?vue= », on affiche la vue de la maquette correspondante.
function PageMatch() {
  const { id } = useParams()
  const [parametres] = useSearchParams()
  const match = matchsDetail[id]

  if (!match) {
    return (
      <>
        <h1 className="page-match__introuvable">Match introuvable</h1>
        <p className="texte-doux page-match__intro">Ce match n'existe pas ou a été supprimé.</p>
        <Bouton to="/tournois" variante="secondaire">Retour aux tournois</Bouton>
      </>
    )
  }

  const vue = match.statut === 'valide' ? 'valide' : parametres.get('vue') || match.vueParDefaut

  // La clé remet la page à zéro quand on change de match ou de vue.
  return <ContenuMatch key={`${id}-${vue}`} match={match} vue={vue} />
}

const SUFFIXES = { capitaine: ' · Vue capitaine', createur: ' · Vue créateur', valide: '' }

function ContenuMatch({ match, vue }) {
  // Le statut peut changer pendant la visite : le créateur qui fixe le score valide le match.
  const [statut, setStatut] = useState(match.statut)

  return (
    <>
      <Link to={`/tournois/${match.tournoi.id}`} className="page-match__retour">← {match.tournoi.nom}</Link>
      <p className="surtitre page-match__surtitre">{match.surtitre}{SUFFIXES[vue]}</p>

      <div className="page-match__titre">
        <h1>
          {match.equipeA} <span className="page-match__vs">vs</span> {match.equipeB}
        </h1>
        <BadgeStatut statut={statut} taille="grande" />
      </div>

      {vue === 'valide' && <VueValide match={match} />}
      {vue === 'capitaine' && <VueCapitaine match={match} statut={statut} />}
      {vue === 'createur' && <VueCreateur match={match} statut={statut} onValider={() => setStatut('valide')} />}
    </>
  )
}

export default PageMatch
