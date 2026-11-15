// Badge de statut d'un match (figures 10 à 19) : validé, en attente, litige, à jouer, à venir.
// Il reçoit seulement le statut : il ne décide pas lui-même de l'état du match.

const LIBELLES = {
  valide: 'validé',
  attente: 'en attente',
  litige: 'litige',
  ajouer: 'à jouer',
  avenir: 'à venir',
}

function BadgeStatut({ statut, taille = 'normale' }) {
  return (
    <span className={`badge-statut badge-statut--${statut} badge-statut--${taille}`}>
      {LIBELLES[statut]}
    </span>
  )
}

export default BadgeStatut
