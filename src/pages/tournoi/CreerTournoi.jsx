import { useState } from 'react'
import { Link } from 'react-router-dom'
import Bouton from '../../components/commun/Bouton'
import Champ from '../../components/commun/Champ'
import Message from '../../components/commun/Message'
import GroupeOptions from '../../components/tournoi/GroupeOptions'
import { TYPES, VISIBILITES, FORMATS, disciplinesDuType, trouverDiscipline } from '../../utils/disciplines'

// Page « Créer un tournoi » (figure 6).
// Les valeurs de départ sont celles de la maquette.
function CreerTournoi() {
  const [nom, setNom] = useState('')
  const [visibilite, setVisibilite] = useState('prive')
  const [type, setType] = useState('jeu_video')
  const [discipline, setDiscipline] = useState('valorant')
  const [mode, setMode] = useState('5v5')
  const [format, setFormat] = useState('championnat')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [maxMatchs, setMaxMatchs] = useState('7')
  const [erreurs, setErreurs] = useState({})
  const [cree, setCree] = useState(false)

  // Tout ce qui suit se déduit de l'état.
  const disciplineChoisie = trouverDiscipline(discipline)
  const enUnContreUn = mode === '1v1'
  const unite = enUnContreUn ? 'joueurs' : 'équipes'
  const estChampionnat = format === 'championnat'
  const participantsPourExemple = Number(maxParticipants) || 16

  let matchsMaxAffiche = 'Selon le tableau'
  if (estChampionnat) {
    matchsMaxAffiche = maxMatchs ? `${maxMatchs} par ${enUnContreUn ? 'joueur' : 'équipe'}` : 'Tous contre tous'
  }

  // Changer de type impose de changer de discipline, donc de mode.
  function changerType(nouveauType) {
    const premiere = disciplinesDuType(nouveauType)[0]
    setType(nouveauType)
    setDiscipline(premiere.valeur)
    setMode(premiere.modes[0])
  }

  function changerDiscipline(nouvelleDiscipline) {
    setDiscipline(nouvelleDiscipline)
    setMode(trouverDiscipline(nouvelleDiscipline).modes[0])
  }

  function gererEnvoi(evenement) {
    evenement.preventDefault()
    const nouvellesErreurs = {}

    if (nom.trim() === '') {
      nouvellesErreurs.nom = 'Donne un nom à ton tournoi.'
    }
    if (maxParticipants === '' || Number(maxParticipants) < 2) {
      nouvellesErreurs.maxParticipants = `Indique au moins 2 ${unite}.`
    }
    if (estChampionnat && maxMatchs !== '' && Number(maxMatchs) < 1) {
      nouvellesErreurs.maxMatchs = 'Indique au moins 1 match, ou laisse vide.'
    }

    setErreurs(nouvellesErreurs)
    // Le tournoi est « créé » seulement s'il n'y a aucune erreur.
    setCree(Object.keys(nouvellesErreurs).length === 0)
  }

  return (
    <>
      <h1 className="creer__titre">Créer un tournoi</h1>
      <p className="texte-doux creer__intro">
        Tu en deviens le créateur : toi seul peux modifier sa configuration et arbitrer les litiges.
      </p>

      <form className="creer__colonnes" onSubmit={gererEnvoi} noValidate>
        <div className="creer__formulaire">
          <div>
            <Champ
              label="Nom du tournoi"
              id="nom-tournoi"
              placeholder="ex. Open ECE Valorant"
              value={nom}
              onChange={(evenement) => setNom(evenement.target.value)}
              maxLength={60}
              aria-invalid={Boolean(erreurs.nom)}
            />
            {erreurs.nom && <p className="creer__erreur" role="alert">{erreurs.nom}</p>}
          </div>

          <GroupeOptions label="Visibilité" options={VISIBILITES} valeur={visibilite} onChange={setVisibilite} />
          <GroupeOptions label="Type" options={TYPES} valeur={type} onChange={changerType} apparence="pilules" />
          <GroupeOptions label="Discipline" options={disciplinesDuType(type)} valeur={discipline} onChange={changerDiscipline} />
          <GroupeOptions
            label="Mode de jeu"
            options={disciplineChoisie.modes.map((unMode) => ({ valeur: unMode, titre: unMode }))}
            valeur={mode}
            onChange={setMode}
            apparence="pilules"
          />
          <GroupeOptions label="Format" options={FORMATS} valeur={format} onChange={setFormat} />

          <div className="creer__nombres">
            <div>
              <Champ
                label={`Nombre maximum ${enUnContreUn ? 'de joueurs' : "d'équipes"}`}
                id="max-participants"
                type="number"
                min="2"
                placeholder="16"
                value={maxParticipants}
                onChange={(evenement) => setMaxParticipants(evenement.target.value)}
                aria-invalid={Boolean(erreurs.maxParticipants)}
              />
              {erreurs.maxParticipants && <p className="creer__erreur" role="alert">{erreurs.maxParticipants}</p>}
            </div>

            {/* En coupe, le nombre de matchs découle du tableau : le champ disparaît. */}
            {estChampionnat && (
              <div>
                <Champ
                  label={`Nombre maximum de matchs par ${enUnContreUn ? 'joueur' : 'équipe'}`}
                  id="max-matchs"
                  type="number"
                  min="1"
                  value={maxMatchs}
                  onChange={(evenement) => setMaxMatchs(evenement.target.value)}
                  aria-invalid={Boolean(erreurs.maxMatchs)}
                />
                {erreurs.maxMatchs && <p className="creer__erreur" role="alert">{erreurs.maxMatchs}</p>}
                <p className="texte-doux creer__aide">
                  Laisse vide pour que tout le monde rencontre tout le monde ({participantsPourExemple - 1} matchs
                  chacun avec {participantsPourExemple} participants). Le calendrier est généré en respectant cette limite.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="carte recap-tournoi">
          <h2>Récapitulatif</h2>
          <dl className="recap-tournoi__lignes">
            <div><dt>Visibilité</dt><dd>{visibilite === 'prive' ? 'Privé' : 'Public'}</dd></div>
            <div><dt>Discipline</dt><dd>{disciplineChoisie.titre} · {mode}</dd></div>
            <div><dt>Format</dt><dd>{estChampionnat ? 'Championnat' : 'Coupe'}</dd></div>
            <div><dt>Matchs max</dt><dd>{matchsMaxAffiche}</dd></div>
            <div><dt>Statut au départ</dt><dd>Inscriptions</dd></div>
          </dl>

          <div className="recap-tournoi__regles">
            <p className="surtitre">Règles appliquées · {disciplineChoisie.titre}</p>
            <ul>
              {disciplineChoisie.regles.map((regle) => (
                <li key={regle}>
                  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {regle}
                </li>
              ))}
            </ul>
          </div>

          {visibilite === 'prive' && (
            <p className="texte-doux recap-tournoi__note">
              Un code unique de 8 caractères sera généré à la création. Tu devras le partager toi-même.
            </p>
          )}

          <Bouton type="submit" large>Créer le tournoi</Bouton>
          <Link to="/tournois" className="recap-tournoi__annuler">Annuler</Link>

          {cree && (
            <Message type="succes">
              Formulaire valide : « {nom.trim()} » sera enregistré quand l'API sera branchée.
            </Message>
          )}
        </aside>
      </form>
    </>
  )
}

export default CreerTournoi
