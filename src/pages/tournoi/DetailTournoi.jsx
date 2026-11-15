import { useParams } from 'react-router-dom'
import Bouton from '../../components/commun/Bouton'
import EnteteTournoi from '../../components/tournoi/EnteteTournoi'
import ListeMatchs from '../../components/match/ListeMatchs'
import SuiteTableau from '../../components/match/SuiteTableau'
import TableauCoupe from '../../components/match/TableauCoupe'
import { matchsParTournoi } from '../match/matchsExemple'

// Valeurs d'exemple en dur (celles des figures 10, 13, 16 et 18), rangées par identifiant.
// Elles seront remplacées par les données de l'API.
const tournoisExemple = {
  1: {
    id: 1, discipline: 'Football', mode: '5v5', format: 'Coupe', visibilite: 'Public',
    nom: 'Coupe de la Résidence', createur: 'MaPseudo', participants: '8 équipes', statut: 'en cours',
    pastilles: ['Score en buts', 'Élimination directe', 'Stats : buts, passes déc., cartons, clean sheets'],
    estCreateur: true,
  },
  2: {
    id: 2, discipline: 'Valorant', mode: '5v5', format: 'Championnat', visibilite: 'Public',
    nom: 'Open ECE Valorant', createur: 'ECE_Gaming', participants: '16 équipes', matchsMax: '7 matchs max par équipe', statut: 'en cours',
    pastilles: ['Premier à 13 rounds', 'Pas de match nul', 'Victoire 1 pt · Défaite 0 pt', 'Stats : kills, deaths, assists'],
    estCreateur: false, monEquipe: { nom: 'Radiant B2', role: 'capitaine' },
  },
  3: {
    id: 3, discipline: 'Basketball', mode: '3x3', format: 'Championnat', visibilite: 'Public',
    nom: 'Playground 3x3', createur: 'BDE_Sport', participants: '6 équipes', statut: 'en cours',
    pastilles: ['Score en points', 'Pas de match nul', 'Victoire 2 pts · Défaite 1 pt', 'Stats : points, rebonds, passes'],
    estCreateur: false,
  },
  4: {
    id: 4, discipline: 'EA Sports FC', mode: '1v1', format: 'Coupe', visibilite: 'Public',
    nom: 'Duel FC du vendredi', createur: 'MaPseudo', participants: '8 joueurs', statut: 'en cours',
    pastilles: ['Score en buts', '1v1 : chaque joueur est son propre capitaine', 'Stats : buts, passes déc., cartons, clean sheets'],
    estCreateur: true,
  },
}

// Zone réservée au bloc d'un coéquipier. À remplacer par son composant quand il sera prêt.
function Emplacement({ titre, eleve }) {
  return (
    <div className="emplacement">
      <strong>{titre}</strong>
      <span>À brancher par l'Élève {eleve}</span>
    </div>
  )
}

function DetailTournoi() {
  const { id } = useParams()
  const tournoi = tournoisExemple[id]

  if (!tournoi) {
    return (
      <>
        <h1 className="rejoindre__titre">Tournoi introuvable</h1>
        <p className="texte-doux rejoindre__intro">Ce tournoi n'existe pas ou a été supprimé.</p>
        <Bouton to="/tournois" variante="secondaire">Retour aux tournois</Bouton>
      </>
    )
  }

  const estUneCoupe = tournoi.format === 'Coupe'
  const matchs = matchsParTournoi[tournoi.id]

  return (
    <>
      <EnteteTournoi tournoi={tournoi} />

      <Emplacement titre="Barre d'onglets : Matchs, Classement ou Tableau, Statistiques, Chat" eleve="4" />

      <div className="detail-tournoi__colonnes">
        <div className="detail-tournoi__principal">
          {/* Élève 3 : matchs et tableau de coupe.
              Duel FC (figure 18) s'ouvre sur l'onglet « Tableau » : on y affiche le tableau complet.
              Quand la barre d'onglets existera, c'est elle qui choisira ce qui s'affiche ici. */}
          {matchs.tableau ? (
            <TableauCoupe tours={matchs.tableau} />
          ) : (
            <>
              <ListeMatchs titre={matchs.titre} compteur={matchs.compteur} lienTout={matchs.lienTout} matchs={matchs.matchs} />
              {estUneCoupe ? (
                <SuiteTableau rencontres={matchs.suite.rencontres} note={matchs.suite.note} />
              ) : (
                <Emplacement titre="Tableau de classement" eleve="4" />
              )}
            </>
          )}
        </div>

        <aside className="detail-tournoi__lateral">
          <Emplacement titre="Panneaux de statistiques" eleve="4" />
          <Emplacement titre="Chat du tournoi" eleve="4" />
        </aside>
      </div>
    </>
  )
}

export default DetailTournoi
