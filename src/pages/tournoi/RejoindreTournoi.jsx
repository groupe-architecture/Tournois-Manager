import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Bouton from '../../components/commun/Bouton'
import Champ from '../../components/commun/Champ'
import Message from '../../components/commun/Message'

// Valeurs d'exemple en dur (celles de la figure 5), rangées par identifiant de tournoi.
// Elles seront remplacées par les données de l'API.
const tournoisExemple = {
  2: {
    nom: 'Open ECE Valorant',
    discipline: 'Valorant',
    mode: '5v5',
    format: 'Championnat',
    visibilite: 'Public',
    createur: 'ECE_Gaming',
    equipesInscrites: 9,
    equipesMax: 16,
    joueursParEquipe: 5,
    nomEquipePropose: 'Radiant B2',
    equipes: [
      { id: 1, nom: 'Phoenix ECE', capitaine: 'Neo_PHX', joueurs: 5 },
      { id: 2, nom: 'Vandal Squad', capitaine: 'Ryo_VS', joueurs: 4 },
      { id: 3, nom: 'Spike Rush', capitaine: 'Jade_SR', joueurs: 3 },
      { id: 4, nom: 'Clutch Kings', capitaine: 'Ilyes_CK', joueurs: 4 },
      { id: 5, nom: 'Sova Gang', capitaine: 'Kaze.SG', joueurs: 5 },
    ],
  },
}

function RejoindreTournoi() {
  // useParams lit la partie variable de l'adresse : /tournois/2/rejoindre → id = "2"
  const { id } = useParams()
  const tournoi = tournoisExemple[id]

  // Le choix du joueur : 'creer' ou l'identifiant de l'équipe qu'il rejoint.
  const [choix, setChoix] = useState('creer')
  const [nomEquipe, setNomEquipe] = useState(tournoi ? tournoi.nomEquipePropose : '')
  const [confirme, setConfirme] = useState(false)

  if (!tournoi) {
    return (
      <>
        <h1 className="rejoindre__titre">Tournoi introuvable</h1>
        <p className="texte-doux rejoindre__intro">Ce tournoi n'existe pas ou n'accepte plus d'inscriptions.</p>
        <Bouton to="/tournois" variante="secondaire">Retour aux tournois</Bouton>
      </>
    )
  }

  const creeSonEquipe = choix === 'creer'
  const equipeChoisie = tournoi.equipes.find((equipe) => equipe.id === choix)

  // Le récapitulatif du bas se déduit du choix.
  const nomAffiche = creeSonEquipe ? nomEquipe.trim() : equipeChoisie.nom
  const role = creeSonEquipe ? 'Capitaine' : 'Joueur'
  const implication = creeSonEquipe
    ? 'Tu déclares le score et les statistiques de ton équipe après chaque match.'
    : `${equipeChoisie.capitaine}, capitaine de l'équipe, déclare les scores. Tu consultes les résultats.`
  const peutConfirmer = nomAffiche !== ''

  function choisir(nouveauChoix) {
    setChoix(nouveauChoix)
    setConfirme(false)
  }

  return (
    <>
      <Link to="/tournois" className="rejoindre__retour">← Tournois ouverts</Link>
      <p className="surtitre">
        {tournoi.discipline} · {tournoi.mode} · {tournoi.format} · {tournoi.visibilite} · par {tournoi.createur}
      </p>
      <h1 className="rejoindre__titre">Rejoindre {tournoi.nom}</h1>
      <p className="texte-doux rejoindre__intro">
        Dans un tournoi par équipes, tu rejoins une équipe déjà inscrite ou tu crées la tienne.
        Tu ne peux être que dans une seule équipe par tournoi.
      </p>

      <div className="rejoindre__colonnes">
        {/* Option 1 : rejoindre une équipe existante */}
        <section className={`carte choix ${creeSonEquipe ? '' : 'choix--actif'}`}>
          <h2>Rejoindre une équipe</h2>
          <p className="texte-doux">Tu deviens joueur. C'est le capitaine de l'équipe qui déclare les scores.</p>

          <ul className="equipes">
            {tournoi.equipes.map((equipe) => {
              const complete = equipe.joueurs >= tournoi.joueursParEquipe
              return (
                <li key={equipe.id}>
                  <button
                    type="button"
                    className={`equipe ${choix === equipe.id ? 'equipe--choisie' : ''}`}
                    disabled={complete}
                    aria-pressed={choix === equipe.id}
                    onClick={() => choisir(equipe.id)}
                  >
                    <span>
                      <strong>{equipe.nom}</strong>
                      <small>capitaine {equipe.capitaine}</small>
                    </span>
                    <span className="equipe__places">
                      {complete ? 'complète' : `${equipe.joueurs} / ${tournoi.joueursParEquipe} joueurs`}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="texte-doux choix__note">
            {tournoi.equipesInscrites} équipes inscrites sur {tournoi.equipesMax} · {tournoi.joueursParEquipe} joueurs maximum par équipe.
          </p>
        </section>

        {/* Option 2 : créer sa propre équipe */}
        <section className={`carte choix ${creeSonEquipe ? 'choix--actif' : ''}`}>
          <h2>Créer mon équipe</h2>
          <p className="texte-doux">Tu en deviens le capitaine : tu déclareras les scores et les statistiques de ton équipe.</p>

          <Champ
            label="Nom de l'équipe"
            id="nom-equipe"
            placeholder="ex. Radiant B2"
            value={nomEquipe}
            onChange={(evenement) => setNomEquipe(evenement.target.value)}
            onFocus={() => choisir('creer')}
            maxLength={30}
          />
          <p className="texte-doux choix__note">
            Unique dans ce tournoi. Tes coéquipiers choisiront ensuite ton équipe sur cette même page.
          </p>
          <Bouton type="button" variante="secondaire" onClick={() => choisir('creer')}>
            Choisir cette option
          </Bouton>

          <p className="choix__encart">
            En 1v1, cette étape est sautée : une équipe à ton pseudo est créée automatiquement et tu en es le capitaine.
          </p>
        </section>
      </div>

      {/* Récapitulatif et confirmation */}
      <section className="carte recap-inscription">
        <div>
          <span className="texte-doux">Équipe</span>
          <strong className="recap-inscription__valeur">{nomAffiche || '—'}</strong>
        </div>
        <div>
          <span className="texte-doux">Ton rôle</span>
          <strong className="recap-inscription__valeur recap-inscription__valeur--role">{role}</strong>
        </div>
        <div className="recap-inscription__implication">
          <span className="texte-doux">Ce que ça implique</span>
          <p>{implication}</p>
        </div>
        <Bouton type="button" disabled={!peutConfirmer} onClick={() => setConfirme(true)}>
          Confirmer l'inscription
        </Bouton>
      </section>

      {confirme && (
        <div className="rejoindre__confirmation">
          <Message type="succes">
            Inscription prise en compte : tu es {role.toLowerCase()} de {nomAffiche}.
          </Message>
        </div>
      )}
    </>
  )
}

export default RejoindreTournoi
