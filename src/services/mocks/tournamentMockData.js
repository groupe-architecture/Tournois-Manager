// Données d'exemple de la partie Élève 4 (classement, statistiques, chat, gagnants),
// reprises des maquettes (figures 10, 13, 16, 18 et 20) et rangées par identifiant de tournoi.
// Elles seront remplacées par les réponses de l'API : ce fichier ne calcule rien.

// --- Classements (figures 13 et 16) : uniquement pour les championnats ---

export const classementsParTournoi = {
  // Figure 16 : Open ECE Valorant
  2: {
    lienTout: 'Voir les 16 équipes',
    lignes: [
      { rang: 1, equipe: 'Phoenix ECE', joues: 3, victoires: 3, defaites: 0, ecart: '+14', points: 3 },
      { rang: 2, equipe: 'Sova Gang', joues: 3, victoires: 3, defaites: 0, ecart: '+11', points: 3 },
      { rang: 3, equipe: 'Vandal Squad', joues: 3, victoires: 2, defaites: 1, ecart: '+9', points: 2 },
      { rang: 4, equipe: 'Les Duellistes', joues: 2, victoires: 2, defaites: 0, ecart: '+8', points: 2 },
      { rang: 5, equipe: 'Spike Rush', joues: 3, victoires: 2, defaites: 1, ecart: '+3', points: 2 },
      { rang: 6, equipe: 'Clutch Kings', joues: 2, victoires: 1, defaites: 1, ecart: '+1', points: 1 },
    ],
    note: 'Rounds = rounds gagnés moins rounds perdus. 1 point la victoire, 0 la défaite. Recalculé à partir des matchs validés uniquement.',
  },

  // Figure 13 : Playground 3x3
  3: {
    lignes: [
      { rang: 1, equipe: 'Les Dunkers', joues: 3, victoires: 3, defaites: 0, ecart: '+15', points: 6 },
      { rang: 2, equipe: 'Street Kings', joues: 2, victoires: 2, defaites: 0, ecart: '+6', points: 4 },
      { rang: 3, equipe: 'Big Ballers', joues: 3, victoires: 1, defaites: 2, ecart: '+1', points: 4 },
      { rang: 4, equipe: 'Paris Rim', joues: 2, victoires: 1, defaites: 1, ecart: '-1', points: 3 },
      { rang: 5, equipe: 'Les Hoopers', joues: 2, victoires: 0, defaites: 2, ecart: '-8', points: 2 },
      { rang: 6, equipe: 'Rebond 3x3', joues: 2, victoires: 0, defaites: 2, ecart: '-13', points: 2 },
    ],
    note: 'Pas de colonne N : un match de basket ne peut pas finir sur un nul. Recalculé à partir des matchs validés uniquement.',
  },
}

// --- Statistiques de la colonne de droite (figures 13, 16, 18) ---
// « dansColonne » : la figure 10 n'affiche que le chat à droite ; les statistiques
// de ce tournoi restent visibles dans l'onglet « Statistiques ».

export const statsParTournoi = {
  1: {
    dansColonne: false,
    blocs: [
      {
        titre: 'Buteurs',
        lignes: [
          { rang: 1, nom: 'Léo_Aigles', equipe: 'Les Aigles', valeur: '2' },
          { rang: 2, nom: 'Hugo_FCM', equipe: 'FC Marais', valeur: '1' },
          { rang: 2, nom: 'Sam_Aigles', equipe: 'Les Aigles', valeur: '1' },
        ],
        note: 'Calculé à partir des matchs validés.',
      },
    ],
  },
  2: {
    dansColonne: true,
    blocs: [
      {
        titre: 'Meilleurs fraggers',
        lignes: [
          { rang: 1, nom: 'Neo_PHX', equipe: 'Phoenix ECE', valeur: '68', unite: 'kills', detail: '68/41/14' },
          { rang: 2, nom: 'Kaze.SG', equipe: 'Sova Gang', valeur: '61', unite: 'kills', detail: '61/38/19' },
          { rang: 3, nom: 'Ryo_VS', equipe: 'Vandal Squad', valeur: '57', unite: 'kills', detail: '57/44/12' },
        ],
        note: 'K / D / A cumulés sur les matchs validés',
      },
    ],
  },
  3: {
    dansColonne: true,
    blocs: [
      {
        titre: 'Meilleurs marqueurs',
        lignes: [
          { rang: 1, nom: 'Hugo_Dunk', equipe: 'Les Dunkers', valeur: '31 pts' },
          { rang: 2, nom: 'Ilan_SK', equipe: 'Street Kings', valeur: '24 pts' },
          { rang: 3, nom: 'Yanis_PR', equipe: 'Paris Rim', valeur: '19 pts' },
        ],
      },
    ],
  },
  4: {
    dansColonne: true,
    blocs: [
      {
        titre: 'Buteurs',
        lignes: [
          { rang: 1, nom: 'Sofiane_7', valeur: '4' },
          { rang: 2, nom: 'Kenzo_FC', valeur: '3' },
          { rang: 2, nom: 'Nael.fc', valeur: '3' },
          { rang: 4, nom: 'TheoG', valeur: '2' },
          { rang: 5, nom: 'Lina99', valeur: '1' },
          { rang: 5, nom: 'Mia_Gol', valeur: '1' },
        ],
      },
      {
        titre: 'Clean sheets',
        lignes: [
          { nom: 'TheoG', valeur: '1' },
          { nom: 'Mia_Gol', valeur: '1' },
        ],
        note: 'Calculé à partir des matchs validés.',
      },
    ],
  },
}

// --- Chat du tournoi (figures 10, 13, 16, 18) ---

export const chatsParTournoi = {
  1: [
    { id: 1, auteur: 'MaPseudo', createur: true, heure: '14:02', texte: 'Les quarts de finale sont ouverts, pensez à déclarer vos scores.' },
    { id: 2, auteur: 'Léo_Aigles', heure: '14:05', texte: 'Score déclaré de notre côté.' },
    { id: 3, auteur: 'Nina_Fox', heure: '14:11', texte: 'Pas le même résultat chez nous, on regarde.' },
  ],
  2: [
    { id: 1, auteur: 'ECE_Gaming', createur: true, heure: '20:30', texte: 'Journée 3 : pensez à déclarer kills, deaths et assists de chaque joueur.' },
    { id: 2, auteur: 'Neo_PHX', heure: '21:14', texte: 'GG Vandal, match validé de notre côté.' },
    { id: 3, auteur: 'Ryo_VS', heure: '21:20', texte: 'Pareil chez nous, 13-11. Bien joué.' },
  ],
  3: [
    { id: 1, auteur: 'BDE_Sport', createur: true, heure: '18:02', texte: 'La journée 3 est ouverte, déclarez vos scores avant dimanche.' },
    { id: 2, auteur: 'Yanis_PR', heure: '18:40', texte: 'Score déclaré pour Paris Rim.' },
    { id: 3, auteur: 'Lucas_Rebond', heure: '18:52', texte: 'On n’a pas le même score, on voit avec l’orga.' },
  ],
  4: [
    { id: 1, auteur: 'MaPseudo', createur: true, heure: '22:05', texte: 'Demi-finales ouvertes, déclarez vos scores dès la fin du match.' },
    { id: 2, auteur: 'Kenzo_FC', heure: '22:41', texte: 'Score déclaré, à toi TheoG.' },
    { id: 3, auteur: 'TheoG', heure: '22:44', texte: 'Je finis ma partie et je déclare.' },
  ],
}

// --- Écran des gagnants (figure 20) ---

export const gagnantsParTournoi = {
  1: {
    surtitre: 'Coupe de la Résidence · Football 5v5 · Coupe',
    champion: 'Les Aigles',
    resume: 'Finale : Les Aigles 2 - 1 Red Fox',
    podium: [
      { place: 1, nom: 'Les Aigles', detail: 'Champion · 3 victoires' },
      { place: 2, nom: 'Red Fox', detail: 'Finaliste · finale 1 - 2' },
      { place: 3, nom: 'Les Loups · Nova', detail: 'Demi-finalistes · éliminés' },
    ],
    distinctions: [
      { titre: 'Meilleur buteur', nom: 'Léo_Aigles', detail: '6 buts' },
      { titre: 'Meilleur passeur', nom: 'Tom_Fox', detail: '4 passes décisives' },
      { titre: 'Clean sheets', nom: 'Les Aigles', detail: '2 matchs sans encaisser' },
    ],
    boutonFinal: 'Voir le tableau final',
  },
  2: {
    surtitre: 'Open ECE Valorant · Valorant 5v5 · Championnat',
    champion: 'Phoenix ECE',
    resume: '7 victoires · 0 défaite · 7 pts · +38 rounds',
    podium: [
      { place: 1, nom: 'Phoenix ECE', detail: '1er · 7 pts' },
      { place: 2, nom: 'Sova Gang', detail: '2e · 6 pts' },
      { place: 3, nom: 'Vandal Squad', detail: '3e · 5 pts' },
    ],
    distinctions: [
      { titre: 'Meilleur fragger', nom: 'Neo_PHX', detail: '158 kills' },
      { titre: 'Meilleur K/D', nom: 'Kaze.SG', detail: '1,62' },
      { titre: 'Meilleur soutien', nom: 'Zed_PHX', detail: '64 assists' },
    ],
    boutonFinal: 'Voir le classement final',
  },
  3: {
    surtitre: 'Playground 3x3 · Basketball 3x3 · Championnat',
    champion: 'Les Dunkers',
    resume: '5 victoires · 0 défaite · 10 pts',
    podium: [
      { place: 1, nom: 'Les Dunkers', detail: '1er · 10 pts' },
      { place: 2, nom: 'Street Kings', detail: '2e · 9 pts' },
      { place: 3, nom: 'Big Ballers', detail: '3e · 8 pts' },
    ],
    distinctions: [
      { titre: 'Meilleur marqueur', nom: 'Hugo_Dunk', detail: '52 points' },
      { titre: 'Meilleur rebondeur', nom: 'Inès_PR', detail: '27 rebonds' },
      { titre: 'Meilleur passeur', nom: 'Malik_PR', detail: '21 passes' },
    ],
    boutonFinal: 'Voir le classement final',
  },
  4: {
    surtitre: 'Duel FC du vendredi · EA Sports FC 1v1 · Coupe',
    champion: 'Kenzo_FC',
    resume: 'Finale : Kenzo_FC 3 - 2 Sofiane_7',
    podium: [
      { place: 1, nom: 'Kenzo_FC', detail: 'Champion · 3 victoires' },
      { place: 2, nom: 'Sofiane_7', detail: 'Finaliste · finale 2 - 3' },
      { place: 3, nom: 'TheoG · Mia_Gol', detail: 'Demi-finalistes · éliminés' },
    ],
    distinctions: [
      { titre: 'Meilleur buteur', nom: 'Kenzo_FC', detail: '8 buts' },
      { titre: 'Meilleur passeur', nom: 'Sofiane_7', detail: '3 passes décisives' },
      { titre: 'Clean sheets', nom: 'Mia_Gol', detail: '1 match sans encaisser' },
    ],
    boutonFinal: 'Voir le tableau final',
  },
}
