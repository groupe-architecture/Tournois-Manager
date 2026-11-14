import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Bouton from '../../components/commun/Bouton'
import Champ from '../../components/commun/Champ'
import Message from '../../components/commun/Message'
import GroupeOptions from '../../components/tournoi/GroupeOptions'
import BoutonCopierCode from '../../components/tournoi/BoutonCopierCode'
import { VISIBILITES, FORMATS, disciplinesDuType, trouverDiscipline } from '../../utils/disciplines'

// Valeurs d'exemple en dur (figures 7 et 8), rangées par identifiant.
// Le tournoi 1 est en inscriptions (figure 7), le tournoi 4 est déjà lancé (figure 8).
// Elles seront remplacées par les données de l'API.
const tournoisExemple = {
  1: {
    nom: 'Coupe de la Résidence', type: 'sport', discipline: 'foot', mode: '5v5', format: 'coupe',
    visibilite: 'public', max: 8, lance: false, codeAcces: 'A7K2P9QY',
    equipes: [
      { nom: 'Les Aigles', capitaine: 'Léo_Aigles' },
      { nom: 'FC Marais', capitaine: 'Hugo_FCM' },
      { nom: 'Les Loups', capitaine: 'Rayan_L' },
      { nom: 'Atlas United', capitaine: 'Sami_AU' },
      { nom: 'Red Fox', capitaine: 'Nina_Fox' },
      { nom: 'Les Titans', capitaine: 'Max_Titans' },
    ],
  },
  4: {
    nom: 'Duel FC du vendredi', type: 'jeu_video', discipline: 'fifa', mode: '1v1', format: 'coupe',
    visibilite: 'public', max: 8, lance: true,
    equipes: [
      { nom: 'Kenzo_FC' }, { nom: 'Lina99' }, { nom: 'TheoG' }, { nom: 'Rayan10' },
      { nom: 'Sofiane_7' }, { nom: 'Nael.fc' }, { nom: 'Mia_Gol' }, { nom: 'Adam.K' },
    ],
  },
}

// Tournois d'exemple dont l'utilisateur n'est pas le créateur : accès refusé.
const tournoisDesAutres = ['2', '3']

const TAILLES = [6, 8, 16]

// Champ non modifiable, affiché quand le tournoi est lancé (figure 8).
function ChampVerrouille({ label, valeur }) {
  return (
    <div className="champ-verrouille">
      <div className="champ-verrouille__tete">
        <span>{label}</span>
        <span>verrouillé depuis le lancement</span>
      </div>
      <div className="champ-verrouille__valeur">
        {valeur}
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <rect x="4.5" y="9" width="11" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}

function ConfigurationTournoi() {
  const { id } = useParams()
  const tournoi = tournoisExemple[id]

  const [nom, setNom] = useState(tournoi ? tournoi.nom : '')
  const [visibilite, setVisibilite] = useState(tournoi ? tournoi.visibilite : 'public')
  const [discipline, setDiscipline] = useState(tournoi ? tournoi.discipline : 'foot')
  const [mode, setMode] = useState(tournoi ? tournoi.mode : '5v5')
  const [format, setFormat] = useState(tournoi ? tournoi.format : 'coupe')
  const [max, setMax] = useState(tournoi ? tournoi.max : 8)
  const [dateLancement, setDateLancement] = useState(null)
  const [lance, setLance] = useState(tournoi ? tournoi.lance : false)
  const [retour, setRetour] = useState(null) // message affiché après « Enregistrer »

  // Seul le créateur voit cette page : les autres sont renvoyés vers la page 403.
  if (tournoisDesAutres.includes(id)) {
    return <Navigate to="/403" replace />
  }

  if (!tournoi) {
    return (
      <>
        <h1 className="rejoindre__titre">Tournoi introuvable</h1>
        <p className="texte-doux rejoindre__intro">Ce tournoi n'existe pas ou a été supprimé.</p>
        <Bouton to="/tournois" variante="secondaire">Retour aux tournois</Bouton>
      </>
    )
  }

  const disciplineChoisie = trouverDiscipline(discipline)
  const enUnContreUn = mode === '1v1'
  const unite = enUnContreUn ? 'joueurs' : 'équipes'
  const inscrits = tournoi.equipes.length
  const estCoupe = format === 'coupe'

  function changerDiscipline(nouvelleDiscipline) {
    setDiscipline(nouvelleDiscipline)
    setMode(trouverDiscipline(nouvelleDiscipline).modes[0])
    setRetour(null)
  }

  // Remet le formulaire dans l'état du tournoi enregistré.
  function annuler() {
    setNom(tournoi.nom)
    setVisibilite(tournoi.visibilite)
    setDiscipline(tournoi.discipline)
    setMode(tournoi.mode)
    setFormat(tournoi.format)
    setMax(tournoi.max)
    setRetour(null)
  }

  function enregistrer(evenement) {
    evenement.preventDefault()
    if (nom.trim() === '') {
      setRetour({ type: 'erreur', texte: 'Le tournoi doit avoir un nom.' })
      return
    }
    setRetour({ type: 'succes', texte: "Modifications valides : elles seront enregistrées quand l'API sera branchée." })
  }

  function lancer() {
    setLance(true)
    setDateLancement(new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }))
    setRetour(null)
  }

  return (
    <>
      <Link to={`/tournois/${id}`} className="rejoindre__retour">← {tournoi.nom}</Link>
      <div className="config__titre">
        <h1>Configuration du tournoi</h1>
        <span className={`badge ${lance ? 'badge--valide' : 'badge--attente'}`}>{lance ? 'en cours' : 'inscriptions'}</span>
      </div>
      <p className="texte-doux config__intro">Seul toi, créateur du tournoi, vois cette page.</p>

      <p className="carte config__bandeau">
        <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="6.2" r="0.9" fill="currentColor" />
        </svg>
        {lance
          ? `Le tournoi est lancé : visibilité, discipline, mode, format et nombre ${enUnContreUn ? 'de joueurs' : "d'équipes"} sont verrouillés pour ne pas fausser le tableau. Seul le nom reste modifiable.`
          : 'Les inscriptions sont ouvertes : tout est modifiable. Au lancement, seul le nom restera modifiable.'}
      </p>

      <div className="config__colonnes">
        <form className="config__formulaire" onSubmit={enregistrer} noValidate>
          <Champ
            label="Nom du tournoi"
            id="nom-tournoi"
            value={nom}
            onChange={(evenement) => { setNom(evenement.target.value); setRetour(null) }}
            maxLength={60}
          />

          {lance ? (
            <>
              <ChampVerrouille label="Visibilité" valeur={visibilite === 'prive' ? 'Privé' : 'Public'} />
              <ChampVerrouille label="Discipline" valeur={disciplineChoisie.titre} />
              <ChampVerrouille label="Mode de jeu" valeur={mode} />
              <ChampVerrouille label="Format" valeur={estCoupe ? 'Coupe à élimination directe' : 'Championnat'} />
              <ChampVerrouille label={`Nombre maximum ${enUnContreUn ? 'de joueurs' : "d'équipes"}`} valeur={`${max} ${unite}`} />
            </>
          ) : (
            <>
              <GroupeOptions
                label="Visibilité"
                options={VISIBILITES.map(({ valeur, titre }) => ({ valeur, titre }))}
                valeur={visibilite}
                onChange={(valeur) => { setVisibilite(valeur); setRetour(null) }}
                apparence="boutons"
                aide="Passer en privé génère un code d'accès de 8 caractères à partager."
              />
              <GroupeOptions
                label="Discipline"
                options={disciplinesDuType(tournoi.type).map(({ valeur, titre }) => ({ valeur, titre }))}
                valeur={discipline}
                onChange={changerDiscipline}
                apparence="boutons"
                aide="Les règles de score et les statistiques suivent la discipline choisie."
              />
              <GroupeOptions
                label="Mode de jeu"
                options={disciplineChoisie.modes.map((unMode) => ({ valeur: unMode, titre: unMode }))}
                valeur={mode}
                onChange={(valeur) => { setMode(valeur); setRetour(null) }}
                apparence="boutons"
              />
              <GroupeOptions
                label="Format"
                options={FORMATS.map(({ valeur, titre }) => ({ valeur, titre }))}
                valeur={format}
                onChange={(valeur) => { setFormat(valeur); setRetour(null) }}
                apparence="boutons"
                aide={estCoupe ? 'En coupe, le nombre de matchs découle du tableau.' : 'En championnat, tout le monde rencontre tout le monde.'}
              />
              <GroupeOptions
                label={`Nombre maximum ${enUnContreUn ? 'de joueurs' : "d'équipes"}`}
                options={TAILLES.map((taille) => ({ valeur: taille, titre: String(taille), desactivee: taille < inscrits }))}
                valeur={max}
                onChange={(valeur) => { setMax(valeur); setRetour(null) }}
                apparence="boutons"
                aide={`Impossible de descendre sous le nombre ${enUnContreUn ? 'de joueurs déjà inscrits' : "d'équipes déjà inscrites"} (${inscrits}).`}
              />
            </>
          )}

          {/* Code d'accès : affiché seulement pour un tournoi privé (absent des maquettes). */}
          {visibilite === 'prive' && tournoi.codeAcces && (
            <div>
              <p className="groupe-options__label">Code d'accès à partager</p>
              <BoutonCopierCode code={tournoi.codeAcces} />
            </div>
          )}

          <div className="config__actions">
            <Bouton type="submit">Enregistrer les modifications</Bouton>
            <Bouton type="button" variante="secondaire" onClick={annuler}>Annuler</Bouton>
          </div>

          {retour && <Message type={retour.type}>{retour.texte}</Message>}
        </form>

        <aside className="config__lateral">
          <section className="carte">
            <div className="config__carte-tete">
              <h2>{enUnContreUn ? 'Joueurs inscrits' : 'Équipes inscrites'}</h2>
              <strong>{inscrits} / {max}</strong>
            </div>
            <ul className="config__equipes">
              {tournoi.equipes.map((equipe) => (
                <li key={equipe.nom}>
                  <strong>{equipe.nom}</strong>
                  {equipe.capitaine && <span>capitaine {equipe.capitaine}</span>}
                </li>
              ))}
            </ul>
          </section>

          {lance ? (
            <section className="carte">
              <h2>Tournoi lancé</h2>
              <p className="texte-doux config__texte-carte">
                {dateLancement ? `Lancé le ${dateLancement}. ` : ''}
                Le tableau est fixé : les {unite} ne peuvent plus rejoindre ni quitter le tournoi.
              </p>
            </section>
          ) : (
            <section className="carte config__lancer">
              <h2>Lancer le tournoi</h2>
              <p className="texte-doux config__texte-carte">
                Ferme les inscriptions et génère {estCoupe ? 'le tableau de la coupe' : 'le calendrier du championnat'} avec
                les {unite} {enUnContreUn ? 'inscrits' : 'inscrites'}. Le statut passe à « en cours ».
              </p>
              <Bouton type="button" variante="secondaire" large onClick={lancer}>
                Lancer avec {inscrits} {unite}
              </Bouton>
            </section>
          )}
        </aside>
      </div>
    </>
  )
}

export default ConfigurationTournoi
