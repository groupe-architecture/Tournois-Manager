import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Bouton from '../../components/commun/Bouton';
import EnteteTournoi from '../../components/tournoi/EnteteTournoi';
import ListeMatchs from '../../components/match/ListeMatchs';
import SuiteTableau from '../../components/match/SuiteTableau';
import TableauCoupe from '../../components/match/TableauCoupe';
import TournamentTabs from '../../components/tabs/TournamentTabs';
import LeaderboardTable from '../../components/classement/LeaderboardTable';
import StatsPanel from '../../components/stats/StatsPanel';
import TournamentChat from '../../components/chat/TournamentChat';
import { matchsParTournoi } from '../match/matchsExemple';
import { classementsParTournoi, statsParTournoi, chatsParTournoi } from '../../services/mocks/tournamentMockData';
import { cleDiscipline, ONGLETS_PAR_FORMAT } from '../../utils/disciplineConfig';

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
    estCreateur: false, monEquipe: { nom: 'Paris Rim', role: 'capitaine' },
  },
  4: {
    id: 4, discipline: 'EA Sports FC', mode: '1v1', format: 'Coupe', visibilite: 'Public',
    nom: 'Duel FC du vendredi', createur: 'MaPseudo', participants: '8 joueurs', statut: 'en cours',
    pastilles: ['Score en buts', '1v1 : chaque joueur est son propre capitaine', 'Stats : buts, passes déc., cartons, clean sheets'],
    estCreateur: true, onglets: ['tableau', 'matchs', 'stats', 'chat'],
  },
};

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

  // La clé remet la page à zéro (onglet, messages) quand on passe d'un tournoi à un autre.
  return <ContenuTournoi key={tournoi.id} tournoi={tournoi} />;
}

function ContenuTournoi({ tournoi }) {
  const estUneCoupe = tournoi.format === 'Coupe';
  const discipline = cleDiscipline(tournoi.discipline);
  const onglets = tournoi.onglets || ONGLETS_PAR_FORMAT[estUneCoupe ? 'coupe' : 'championnat'];

  const matchs = matchsParTournoi[tournoi.id];
  const classement = classementsParTournoi[tournoi.id];
  const stats = statsParTournoi[tournoi.id] || { dansColonne: false, blocs: [] };

  const [onglet, setOnglet] = useState(onglets[0]);
  // Le chat est partagé entre la colonne de droite et l'onglet « Chat » : ses messages vivent ici.
  const [messages, setMessages] = useState(chatsParTournoi[tournoi.id] || []);

  function envoyerMessage(texte) {
    const maintenant = new Date();
    const heure = `${String(maintenant.getHours()).padStart(2, '0')}:${String(maintenant.getMinutes()).padStart(2, '0')}`;
    setMessages([...messages, { id: messages.length + 1, auteur: 'MaPseudo', createur: tournoi.estCreateur, heure, texte }]);
  }

  const chat = <TournamentChat messages={messages} onSend={envoyerMessage} />;

  return (
    <>
      <EnteteTournoi tournoi={tournoi} />

      <TournamentTabs onglets={onglets} activeTab={onglet} onTabChange={setOnglet} />

      <div className="detail-tournoi__colonnes">
        <div className="detail-tournoi__principal">
          {onglet === 'matchs' && (
            <>
              <ListeMatchs titre={matchs.titre} compteur={matchs.compteur} lienTout={matchs.lienTout} matchs={matchs.matchs} />
              {estUneCoupe && matchs.suite && (
                <SuiteTableau rencontres={matchs.suite.rencontres} note={matchs.suite.note} />
              )}
              {!estUneCoupe && classement && (
                <LeaderboardTable
                  discipline={discipline}
                  lignes={classement.lignes}
                  note={classement.note}
                  lienTout={classement.lienTout}
                  onLienTout={() => setOnglet('classement')}
                />
              )}
            </>
          )}

          {onglet === 'tableau' && matchs.tableau && <TableauCoupe tours={matchs.tableau} />}

          {onglet === 'classement' && classement && (
            <LeaderboardTable discipline={discipline} lignes={classement.lignes} note={classement.note} />
          )}

          {onglet === 'stats' && <StatsPanel blocs={stats.blocs} enGrille />}

          {onglet === 'chat' && chat}
        </div>

        <aside className="detail-tournoi__lateral">
          {stats.dansColonne && onglet !== 'stats' && <StatsPanel blocs={stats.blocs} />}
          {onglet !== 'chat' && chat}
        </aside>
      </div>
    </>
  );
}

export default DetailTournoi;
