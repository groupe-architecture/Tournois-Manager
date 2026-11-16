import { useState } from 'react'; 
import { useParams } from 'react-router-dom';
import Bouton from '../../components/commun/Bouton';
import EnteteTournoi from '../../components/tournoi/EnteteTournoi';
import ListeMatchs from '../../components/match/ListeMatchs';
import SuiteTableau from '../../components/match/SuiteTableau';
import TableauCoupe from '../../components/match/TableauCoupe';
import { matchsParTournoi } from '../match/matchsExemple';

import TournamentTabs from '../../components/tabs/TournamentTabs';
import LeaderboardTable from '../../components/classement/LeaderboardTable';
import StatsPanel from '../../components/stats/StatsPanel';
import TournamentChat from '../../components/chat/TournamentChat';

import {
  mockLeaderboardBasketball,
  mockLeaderboardValorant,
  mockStatsBasketball,
  mockStatsValorant,
  mockChatMessages,
} from '../../services/mocks/tournamentMockData';
import { DISCIPLINES } from '../../utils/disciplineConfig';

import '../../styles/components/TournamentTabs.css';
import '../../styles/components/LeaderboardTable.css';
import '../../styles/components/StatsPanel.css';
import '../../styles/components/TournamentChat.css';

// Valeurs d'exemple en dur
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
};

function Emplacement({ titre, eleve }) {
  return (
    <div className="emplacement" style={{ padding: '1rem', border: '1px dashed #7c4dff', borderRadius: '8px', color: '#a0a0b0', marginBottom: '1rem' }}>
      <strong>{titre}</strong>
      <span> (À brancher par l'Élève {eleve})</span>
    </div>
  );
}

function DetailTournoi() {
  const { id } = useParams();
  const tournoi = tournoisExemple[id];

  if (!tournoi) {
    return (
      <>
        <h1 className="rejoindre__titre">Tournoi introuvable</h1>
        <p className="texte-doux rejoindre__intro">Ce tournoi n'existe pas ou a été supprimé.</p>
        <Bouton to="/tournois" variante="secondaire">Retour aux tournois</Bouton>
      </>
    );
  }

  const estUneCoupe = tournoi.format === 'Coupe';
  const matchs = matchsParTournoi[tournoi.id];

  const [activeTab, setActiveTab] = useState('matchs');
  const currentFormat = estUneCoupe ? 'coupe' : 'championnat';

  const getDisciplineKey = (disciplineStr) => {
    if (disciplineStr === 'Basketball') return DISCIPLINES.BASKETBALL;
    if (disciplineStr === 'Valorant') return DISCIPLINES.VALORANT;
    if (disciplineStr === 'Football') return DISCIPLINES.FOOTBALL;
    if (disciplineStr === 'EA Sports FC') return DISCIPLINES.EASPORTS_FC;
    return DISCIPLINES.BASKETBALL; // Fallback par défaut
  };

  const currentDiscipline = getDisciplineKey(tournoi.discipline);

  const leaderboardData = currentDiscipline === DISCIPLINES.VALORANT ? mockLeaderboardValorant : mockLeaderboardBasketball;
  const statsData = currentDiscipline === DISCIPLINES.VALORANT ? mockStatsValorant : mockStatsBasketball;
  const myTeamName = tournoi.monEquipe?.nom || 'Paris Rim';

    return (
    <>
      <EnteteTournoi tournoi={tournoi} />

      <TournamentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        format={currentFormat}
      />

      <div className="detail-tournoi__colonnes">
        <div className="detail-tournoi__principal">

          {activeTab === 'matchs' && (
            estUneCoupe && matchs.tableau ? (
              <TableauCoupe tours={matchs.tableau} />
            ) : (
              <ListeMatchs
                titre={matchs.titre}
                compteur={matchs.compteur}
                lienTout={matchs.lienTout}
                matchs={matchs.matchs}
              />
            )
          )}

          {activeTab === 'classement' && currentFormat === 'championnat' && (
            <LeaderboardTable
              rows={leaderboardData}
              discipline={currentDiscipline}
              myTeamName={myTeamName}
            />
          )}

          {activeTab === 'classement' && currentFormat === 'coupe' && (
            <Emplacement titre="Tableau de coupe" eleve="3" />
          )}

          {(activeTab === 'stats' || activeTab === 'chat') && (
            <div className="detail-tournoi__rappel">
              <p>Voir la colonne de droite pour les {activeTab === 'stats' ? 'statistiques' : 'messages du chat'}.</p>
            </div>
          )}
        </div>

        <aside className="detail-tournoi__lateral">
          {activeTab === 'stats' && (
            <StatsPanel
              discipline={currentDiscipline}
              statsData={statsData}
            />
          )}

          {activeTab === 'chat' && (
            <TournamentChat
              messages={mockChatMessages}
              currentUserName="MaPseudo"
            />
          )}
        </aside>
      </div>
    </>
  );
}

export default DetailTournoi;