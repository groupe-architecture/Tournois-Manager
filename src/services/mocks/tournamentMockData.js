import { DISCIPLINES } from '../../utils/disciplineConfig';


export const mockLeaderboardBasketball = [
  { rank: 1, team: 'Paris Rim', played: 5, wins: 5, losses: 0, pointsFor: 412, pointsAgainst: 301, pointDiff: +111, points: 10 },
  { rank: 2, team: 'Rebond 3x3', played: 5, wins: 4, losses: 1, pointsFor: 389, pointsAgainst: 322, pointDiff: +67, points: 8 },
  { rank: 3, team: 'ECE Dunk', played: 5, wins: 3, losses: 2, pointsFor: 355, pointsAgainst: 340, pointDiff: +15, points: 6 },
  { rank: 4, team: 'BDE Sport', played: 5, wins: 2, losses: 3, pointsFor: 330, pointsAgainst: 360, pointDiff: -30, points: 4 },
  { rank: 5, team: 'Slam Masters', played: 5, wins: 1, losses: 4, pointsFor: 301, pointsAgainst: 390, pointDiff: -89, points: 2 },
  { rank: 6, team: 'Backboard B2', played: 5, wins: 0, losses: 5, pointsFor: 278, pointsAgainst: 412, pointDiff: -134, points: 0 },
];

export const mockLeaderboardValorant = [
  { rank: 1, team: 'Radiant B2', played: 5, wins: 5, losses: 0, rounds: 65, points: 5 },
  { rank: 2, team: 'Ace Squad', played: 5, wins: 4, losses: 1, rounds: 58, points: 4 },
  { rank: 3, team: 'Spike Rush', played: 5, wins: 3, losses: 2, rounds: 51, points: 3 },
  { rank: 4, team: 'Flash Boys', played: 5, wins: 2, losses: 3, rounds: 44, points: 2 },
  { rank: 5, team: 'Clutch Kings', played: 5, wins: 1, losses: 4, rounds: 37, points: 1 },
  { rank: 6, team: 'Noob Team', played: 5, wins: 0, losses: 5, rounds: 28, points: 0 },
];

export const mockStatsBasketball = {
  topScorers: [
    { rank: 1, name: 'Yanis_PR', team: 'Paris Rim', value: 142 },
    { rank: 2, name: 'Kenzo_FC', team: 'Rebond 3x3', value: 128 },
    { rank: 3, name: 'Nina_Fox', team: 'ECE Dunk', value: 115 },
    { rank: 4, name: 'MaPseudo', team: 'BDE Sport', value: 98 },
    { rank: 5, name: 'Arthur_B2', team: 'Slam Masters', value: 87 },
  ],
  topRebounds: [
    { rank: 1, name: 'Arthur_B2', team: 'Slam Masters', value: 64 },
    { rank: 2, name: 'Yanis_PR', team: 'Paris Rim', value: 58 },
    { rank: 3, name: 'Nina_Fox', team: 'ECE Dunk', value: 51 },
    { rank: 4, name: 'Kenzo_FC', team: 'Rebond 3x3', value: 47 },
    { rank: 5, name: 'MaPseudo', team: 'BDE Sport', value: 39 },
  ],
  topAssists: [
    { rank: 1, name: 'Nina_Fox', team: 'ECE Dunk', value: 41 },
    { rank: 2, name: 'Kenzo_FC', team: 'Rebond 3x3', value: 37 },
    { rank: 3, name: 'Yanis_PR', team: 'Paris Rim', value: 33 },
    { rank: 4, name: 'MaPseudo', team: 'BDE Sport', value: 28 },
    { rank: 5, name: 'Arthur_B2', team: 'Slam Masters', value: 22 },
  ],
  topMVP: [
    { rank: 1, name: 'Yanis_PR', team: 'Paris Rim', value: 284 },
    { rank: 2, name: 'Nina_Fox', team: 'ECE Dunk', value: 257 },
    { rank: 3, name: 'Kenzo_FC', team: 'Rebond 3x3', value: 241 },
    { rank: 4, name: 'MaPseudo', team: 'BDE Sport', value: 203 },
    { rank: 5, name: 'Arthur_B2', team: 'Slam Masters', value: 178 },
  ],
};

export const mockStatsValorant = {
  topFraggers: [
    { rank: 1, name: 'MaPseudo', team: 'Radiant B2', value: 98 },
    { rank: 2, name: 'Nina_Fox', team: 'Ace Squad', value: 87 },
    { rank: 3, name: 'Yanis_PR', team: 'Spike Rush', value: 79 },
    { rank: 4, name: 'Kenzo_FC', team: 'Flash Boys', value: 68 },
    { rank: 5, name: 'Arthur_B2', team: 'Clutch Kings', value: 54 },
  ],
  topClutches: [
    { rank: 1, name: 'Yanis_PR', team: 'Spike Rush', value: 7 },
    { rank: 2, name: 'MaPseudo', team: 'Radiant B2', value: 6 },
    { rank: 3, name: 'Nina_Fox', team: 'Ace Squad', value: 5 },
    { rank: 4, name: 'Kenzo_FC', team: 'Flash Boys', value: 3 },
    { rank: 5, name: 'Arthur_B2', team: 'Clutch Kings', value: 2 },
  ],
  topAssists: [
    { rank: 1, name: 'Kenzo_FC', team: 'Flash Boys', value: 72 },
    { rank: 2, name: 'Arthur_B2', team: 'Clutch Kings', value: 64 },
    { rank: 3, name: 'MaPseudo', team: 'Radiant B2', value: 58 },
    { rank: 4, name: 'Nina_Fox', team: 'Ace Squad', value: 51 },
    { rank: 5, name: 'Yanis_PR', team: 'Spike Rush', value: 44 },
  ],
  topACS: [
    { rank: 1, name: 'MaPseudo', team: 'Radiant B2', value: 267 },
    { rank: 2, name: 'Nina_Fox', team: 'Ace Squad', value: 241 },
    { rank: 3, name: 'Yanis_PR', team: 'Spike Rush', value: 218 },
    { rank: 4, name: 'Kenzo_FC', team: 'Flash Boys', value: 194 },
    { rank: 5, name: 'Arthur_B2', team: 'Clutch Kings', value: 172 },
  ],
};

export const mockChatMessages = [
  { id: 1, author: 'MaPseudo', avatar: 'M', timestamp: '14:23', text: 'Bienvenue à tous dans la Coupe de la Résidence ! 🏆' },
  { id: 2, author: 'Nina_Fox', avatar: 'N', timestamp: '14:25', text: 'Merci ! Hâte de commencer.' },
  { id: 3, author: 'Yanis_PR', avatar: 'Y', timestamp: '14:27', text: 'Les matchs commencent samedi à 14h, soyez à l\'heure.' },
  { id: 4, author: 'Kenzo_FC', avatar: 'K', timestamp: '14:32', text: 'C\'est noté 👍' },
  { id: 5, author: 'Arthur_B2', avatar: 'A', timestamp: '14:45', text: 'Question : en cas d\'égalité en coupe, c\'est comment ?' },
  { id: 6, author: 'MaPseudo', avatar: 'M', timestamp: '14:47', text: 'Prolongations puis tirs au but. Les règles sont dans l\'onglet Matchs.' },
  { id: 7, author: 'Nina_Fox', avatar: 'N', timestamp: '15:02', text: 'GG à tous pour le match de tout à l\'heure !' },
  { id: 8, author: 'Yanis_PR', avatar: 'Y', timestamp: '15:10', text: 'Je déclare le score du match 3 ce soir.' },
];

export const mockWinners = {
  tournamentName: 'Coupe de la Résidence',
  discipline: DISCIPLINES.FOOTBALL,
  podium: [
    { rank: 1, team: 'Paris Rim', logo: 'PR', reward: '500€ + Trophée' },
    { rank: 2, team: 'Rebond 3x3', logo: 'R3', reward: '200€' },
    { rank: 3, team: 'ECE Dunk', logo: 'ED', reward: '100€' },
  ],
  rewards: [
    { title: 'Meilleur buteur', winner: 'Yanis_PR', team: 'Paris Rim', value: '12 buts', icon: '⚽' },
    { title: 'Meilleur passeur', winner: 'Nina_Fox', team: 'ECE Dunk', value: '8 passes', icon: '🎯' },
    { title: 'Meilleur gardien', winner: 'Kenzo_FC', team: 'Rebond 3x3', value: '5 clean sheets', icon: '🧤' },
    { title: 'MVP du tournoi', winner: 'Yanis_PR', team: 'Paris Rim', value: '284 pts', icon: '🏆' },
  ],
};