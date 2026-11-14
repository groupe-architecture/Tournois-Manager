import Bouton from '../commun/Bouton'

// Carte d'un tournoi dans la liste (figure 4 des maquettes).
// Elle reçoit un objet "tournoi" en props et se contente de l'afficher.
function CarteTournoi({ tournoi }) {
  const { id, discipline, mode, nom, format, createur, unite, inscrits, max, estLeMien } = tournoi

  // Valeurs déduites des props : on les calcule, on ne les stocke pas.
  const estComplet = inscrits >= max
  const pourcentage = Math.min(100, Math.round((inscrits / max) * 100))
  const etat = estComplet ? 'Complet' : 'Inscriptions'

  return (
    <article className={`carte tournoi-carte ${estComplet ? 'tournoi-carte--complet' : ''}`}>
      <div className="tournoi-carte__haut">
        <span className="surtitre">{discipline} · {mode}</span>
        <span className="tournoi-carte__etat">
          {estLeMien ? `Ton tournoi · ${etat}` : etat}
        </span>
      </div>

      <h3 className="tournoi-carte__nom">{nom}</h3>
      <p className="texte-doux">{format} · par {estLeMien ? 'toi' : createur}</p>

      <div className="tournoi-carte__places">
        <span>{unite}</span>
        <strong>{inscrits} / {max}</strong>
      </div>
      <div className="tournoi-carte__piste">
        <div className="tournoi-carte__remplissage" style={{ width: `${pourcentage}%` }} />
      </div>

      {estLeMien ? (
        <Bouton to={`/tournois/${id}`} variante="secondaire" large>Gérer le tournoi</Bouton>
      ) : (
        <Bouton to={`/tournois/${id}/rejoindre`} variante="principal" large>Rejoindre</Bouton>
      )}
    </article>
  )
}

export default CarteTournoi
