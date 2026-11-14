import Bouton from '../commun/Bouton'

// En-tête de la page d'un tournoi (figures 10, 13, 16, 18) :
// petit titre, nom, ligne d'informations, pastilles de règles,
// et à droite une action qui dépend du rôle de l'utilisateur.
function EnteteTournoi({ tournoi }) {
  const { id, discipline, mode, format, visibilite, nom, createur, participants, matchsMax, statut, pastilles, estCreateur, monEquipe } = tournoi

  // On construit la ligne d'informations morceau par morceau :
  // le nombre de matchs max n'existe que pour certains tournois.
  const infos = [`Créé par ${createur}`, participants]
  if (matchsMax) {
    infos.push(matchsMax)
  }
  infos.push(`statut : ${statut}`)

  return (
    <header className="entete-tournoi">
      <div className="entete-tournoi__haut">
        <div>
          <p className="surtitre">{discipline} · {mode} · {format} · {visibilite}</p>
          <h1 className="entete-tournoi__nom">{nom}</h1>
          <p className="texte-doux entete-tournoi__infos">{infos.join(' · ')}</p>
        </div>

        {/* Le créateur voit le bouton de configuration, un membre voit son équipe. */}
        {estCreateur && (
          <Bouton to={`/tournois/${id}/configuration`} variante="secondaire">Modifier la configuration</Bouton>
        )}
        {!estCreateur && monEquipe && (
          <p className="entete-tournoi__equipe">
            Ton équipe : <strong>{monEquipe.nom} · {monEquipe.role}</strong>
          </p>
        )}
      </div>

      <ul className="entete-tournoi__pastilles">
        {pastilles.map((pastille) => (
          <li key={pastille} className="pastille">{pastille}</li>
        ))}
      </ul>
    </header>
  )
}

export default EnteteTournoi
