// Valeurs d'exemple en dur, reprises des maquettes (figures 10 à 19).
// Elles seront remplacées par les données de l'API.
// Ce fichier ne calcule rien : les scores, les statuts et les K/D sont écrits tels quels.

// --- Matchs affichés dans la page d'un tournoi, rangés par identifiant de tournoi ---

export const matchsParTournoi = {
  // Figure 10 : Coupe de la Résidence (football, coupe)
  1: {
    titre: 'Quarts de finale',
    matchs: [
      { id: 'aigles-marais', equipeA: 'Les Aigles', equipeB: 'FC Marais', score: '3 - 1', statut: 'valide' },
      { id: 'loups-atlas', equipeA: 'Les Loups', equipeB: 'Atlas United', message: 'Un seul capitaine a déclaré', statut: 'attente' },
      { id: 'redfox-titans', equipeA: 'Red Fox', equipeB: 'Les Titans', message: 'Déclarations différentes', statut: 'litige', lien: '/matchs/redfox-titans' },
      { id: 'nova-corsaires', equipeA: 'Nova', equipeB: 'Les Corsaires', message: 'Aucune déclaration', statut: 'ajouer' },
    ],
    suite: {
      rencontres: [
        { titre: 'Demi-finale 1', lignes: [{ texte: 'Les Aigles', fort: true }, { texte: 'vs vainqueur Les Loups / Atlas United' }] },
        { titre: 'Demi-finale 2', lignes: [{ texte: 'Vainqueur Red Fox / Les Titans' }, { texte: 'vs vainqueur Nova / Les Corsaires' }] },
        { titre: 'Finale', lignes: [{ texte: 'Vainqueurs des demi-finales' }] },
      ],
      note: 'Le tableau avance à partir des matchs validés uniquement.',
    },
  },

  // Figure 16 : Open ECE Valorant (championnat)
  2: {
    titre: 'Journée 3',
    lienTout: { texte: 'Voir les 8 matchs', to: '/tournois/2' },
    matchs: [
      { id: 'phoenix-vandal', equipeA: 'Phoenix ECE', equipeB: 'Vandal Squad', score: '13 - 11', statut: 'valide', lien: '/matchs/phoenix-vandal' },
      { id: 'sova-spike', equipeA: 'Sova Gang', equipeB: 'Spike Rush', score: '13 - 7', statut: 'valide' },
      { id: 'duellistes-radiant', equipeA: 'Les Duellistes', equipeB: 'Radiant B2', message: 'Les Duellistes ont déclaré · à toi', statut: 'attente' },
      { id: 'clutch-ace', equipeA: 'Clutch Kings', equipeB: 'Ace Factory', message: 'Aucune déclaration', statut: 'ajouer' },
    ],
  },

  // Figure 13 : Playground 3x3 (basketball, championnat)
  3: {
    titre: 'Journée 3',
    compteur: '3 matchs',
    matchs: [
      { id: 'dunkers-ballers', equipeA: 'Les Dunkers', equipeB: 'Big Ballers', score: '21 - 17', statut: 'valide' },
      { id: 'kings-hoopers', equipeA: 'Street Kings', equipeB: 'Les Hoopers', message: 'Un seul capitaine a déclaré', statut: 'attente' },
      { id: 'parisrim-rebond', equipeA: 'Paris Rim', equipeB: 'Rebond 3x3', message: 'Déclarations différentes', statut: 'litige', lien: '/matchs/parisrim-rebond' },
    ],
  },

  // Figure 18 : Duel FC du vendredi (EA Sports FC, coupe en 1v1), onglet « Tableau »
  4: {
    tableau: [
      {
        titre: 'Quarts de finale',
        matchs: [
          { id: 'kenzo-lina', equipes: [{ nom: 'Kenzo_FC', score: 3 }, { nom: 'Lina99', score: 1, perdant: true }], statut: 'valide' },
          { id: 'theog-rayan', equipes: [{ nom: 'TheoG', score: 2 }, { nom: 'Rayan10', score: 0, perdant: true }], statut: 'valide' },
          { id: 'sofiane-nael', equipes: [{ nom: 'Sofiane_7', score: 4 }, { nom: 'Nael.fc', score: 3, perdant: true }], statut: 'valide', note: 'Arbitré par le créateur' },
          { id: 'mia-adam', equipes: [{ nom: 'Mia_Gol', score: 1 }, { nom: 'Adam.K', score: 0, perdant: true }], statut: 'valide' },
        ],
      },
      {
        titre: 'Demi-finales',
        matchs: [
          { id: 'kenzo-theog', equipes: [{ nom: 'Kenzo_FC' }, { nom: 'TheoG' }], statut: 'attente', note: 'Un seul joueur a déclaré', lien: '/matchs/kenzo-theog' },
          { id: 'sofiane-mia', equipes: [{ nom: 'Sofiane_7' }, { nom: 'Mia_Gol' }], statut: 'ajouer' },
        ],
      },
      {
        titre: 'Finale',
        matchs: [
          { id: 'finale', equipes: [{ nom: 'Vainqueur demi 1' }, { nom: 'Vainqueur demi 2' }], statut: 'avenir' },
        ],
      },
    ],
  },
}

// --- Détail d'un match (page d'un match), rangé par identifiant de match ---

const TEXTE_CORRECTION = "Tant que le match n'est pas validé, tu peux corriger ta déclaration. Si les deux déclarations deviennent identiques, le match est validé sans arbitrage."

export const matchsDetail = {
  // Figures 11 (vue capitaine) et 12 (vue créateur)
  'redfox-titans': {
    tournoi: { id: 1, nom: 'Coupe de la Résidence' },
    surtitre: 'Football 5v5 · Quart de finale',
    equipeA: 'Red Fox',
    equipeB: 'Les Titans',
    statut: 'litige',
    vueParDefaut: 'createur',
    nulAutorise: true,

    capitaine: {
      titre: 'Ma déclaration (capitaine de Red Fox)',
      labelA: 'Buts de Red Fox',
      labelB: 'Buts des Titans',
      scoreA: '2',
      scoreB: '1',
      titreStats: 'Statistiques de mon équipe',
      stats: {
        colonnes: ['Joueur', 'Buts', 'Passes déc.', 'Cartons', 'Clean sheet'],
        lignes: [
          ['Nina_Fox', '1', '0', '0', 'Non'],
          ['Tom_Fox', '1', '1', '0', 'Non'],
          ['Sam_Fox', '0', '1', '1', 'Non'],
        ],
      },
      aide: TEXTE_CORRECTION,
    },

    declarations: {
      titre: 'Les deux déclarations',
      cadre: 'orange',
      colonnes: ['Red Fox', 'Les Titans'],
      lignes: [
        { nom: 'Red Fox (toi)', valeurs: [{ valeur: '2', ecart: true }, { valeur: '1' }] },
        { nom: 'Les Titans', valeurs: [{ valeur: '1', ecart: true }, { valeur: '1' }] },
      ],
      texte: 'Les déclarations diffèrent sur les buts de Red Fox. MaPseudo, créateur du tournoi, a été notifié et fixera le score définitif.',
    },

    arbitrage: {
      intro: 'Tu as reçu une notification : les deux capitaines ont déclaré des scores différents. Aucune équipe dont tu es membre ne joue ce match, tu peux donc trancher.',
      colonnes: ['Buts Red Fox', 'Buts Les Titans'],
      lignes: [
        { auteur: 'Nina_Fox', role: 'capitaine Red Fox', valeurs: [{ valeur: '2', ecart: true }, { valeur: '1' }], heure: '13:58' },
        { auteur: 'Max_Titans', role: 'capitaine Les Titans', valeurs: [{ valeur: '1', ecart: true }, { valeur: '1' }], heure: '14:09' },
      ],
      ecart: 'Écart sur les buts de Red Fox (2 contre 1).',
      labelA: 'Buts de Red Fox',
      labelB: 'Buts des Titans',
      note: "Une fois fixé, le score n'est plus modifiable et le tableau est mis à jour. Les deux capitaines sont notifiés.",
    },
  },

  // Figures 14 (vue capitaine) et 15 (vue créateur, score nul refusé)
  'parisrim-rebond': {
    tournoi: { id: 3, nom: 'Playground 3x3' },
    surtitre: 'Basketball 3x3 · Journée 3',
    equipeA: 'Paris Rim',
    equipeB: 'Rebond 3x3',
    statut: 'litige',
    vueParDefaut: 'capitaine',
    nulAutorise: false,
    messageNul: 'Score refusé : un match de basket ne peut pas finir sur un nul.',

    capitaine: {
      titre: 'Ma déclaration (capitaine de Paris Rim)',
      labelA: 'Points de Paris Rim',
      labelB: 'Points de Rebond 3x3',
      scoreA: '21',
      scoreB: '19',
      noteScore: "Basketball : pas de match nul, une équipe doit l'emporter.",
      titreStats: 'Statistiques de mon équipe',
      stats: {
        colonnes: ['Joueur', 'Points', 'Rebonds', 'Passes'],
        lignes: [
          ['Yanis_PR', '9', '4', '2'],
          ['Inès_PR', '7', '6', '3'],
          ['Malik_PR', '5', '3', '5'],
        ],
        total: ['Total', '21', '13', '10'],
      },
      aide: TEXTE_CORRECTION,
    },

    declarations: {
      titre: 'Les deux déclarations',
      cadre: 'orange',
      colonnes: ['Paris Rim', 'Rebond 3x3'],
      lignes: [
        { nom: 'Paris Rim (toi)', valeurs: [{ valeur: '21', ecart: true }, { valeur: '19', ecart: true }] },
        { nom: 'Rebond 3x3', valeurs: [{ valeur: '19', ecart: true }, { valeur: '21', ecart: true }] },
      ],
      texte: 'Chaque équipe se déclare gagnante. BDE_Sport, créateur du tournoi, a été notifié et fixera le score définitif.',
    },

    arbitrage: {
      intro: 'Tu as reçu une notification : chaque capitaine déclare son équipe gagnante. Aucune équipe dont tu es membre ne joue ce match, tu peux donc trancher.',
      colonnes: ['Points Paris Rim', 'Points Rebond 3x3'],
      lignes: [
        { auteur: 'Yanis_PR', role: 'capitaine Paris Rim', valeurs: [{ valeur: '21', ecart: true }, { valeur: '19', ecart: true }], heure: '18:40' },
        { auteur: 'Lucas_Rebond', role: 'capitaine Rebond 3x3', valeurs: [{ valeur: '19', ecart: true }, { valeur: '21', ecart: true }], heure: '18:52' },
      ],
      labelA: 'Points de Paris Rim',
      labelB: 'Points de Rebond 3x3',
      note: "Une fois fixé, le score n'est plus modifiable et le classement est recalculé. Les deux capitaines sont notifiés.",
    },
  },

  // Figure 17 : match validé par concordance
  'phoenix-vandal': {
    tournoi: { id: 2, nom: 'Open ECE Valorant' },
    surtitre: 'Valorant 5v5 · Journée 3',
    equipeA: 'Phoenix ECE',
    equipeB: 'Vandal Squad',
    statut: 'valide',

    resultat: {
      scoreA: '13',
      scoreB: '11',
      courtA: 'Phoenix',
      courtB: 'Vandal',
      issueA: 'Victoire · +1 pt',
      issueB: 'Défaite · 0 pt',
    },

    equipes: [
      {
        nom: 'Phoenix ECE',
        declarePar: 'Déclaré par Neo_PHX, capitaine',
        stats: {
          colonnes: ['Joueur', 'Kills', 'Deaths', 'Assists', 'K/D'],
          lignes: [
            ['Neo_PHX', '24', '14', '5', '1,71'],
            ['Lya_PHX', '19', '15', '8', '1,27'],
            ['Bastien', '15', '16', '11', '0,94'],
            ['Kemi', '12', '17', '9', '0,71'],
            ['Zed_PHX', '10', '16', '14', '0,63'],
          ],
        },
      },
      {
        nom: 'Vandal Squad',
        declarePar: 'Déclaré par Ryo_VS, capitaine',
        stats: {
          colonnes: ['Joueur', 'Kills', 'Deaths', 'Assists', 'K/D'],
          lignes: [
            ['Ryo_VS', '22', '16', '6', '1,38'],
            ['Ambre_V', '18', '17', '7', '1,06'],
            ['Iliès', '14', '18', '10', '0,78'],
            ['Noa_VS', '13', '17', '8', '0,76'],
            ['Tibo', '11', '12', '13', '0,92'],
          ],
        },
      },
    ],

    declarations: {
      titre: 'Les deux déclarations',
      colonnes: ['Phoenix', 'Vandal'],
      lignes: [
        { nom: 'Phoenix ECE', heure: '21:14', valeurs: [{ valeur: '13' }, { valeur: '11' }] },
        { nom: 'Vandal Squad', heure: '21:20', valeurs: [{ valeur: '13' }, { valeur: '11' }] },
      ],
      encart: 'Déclarations identiques : validé par concordance. Le score est verrouillé et compte pour le classement.',
    },
  },

  // Figure 19 : en attente de la seconde déclaration (1v1)
  'kenzo-theog': {
    tournoi: { id: 4, nom: 'Duel FC du vendredi' },
    surtitre: 'EA Sports FC 1v1 · Demi-finale',
    equipeA: 'Kenzo_FC',
    equipeB: 'TheoG',
    statut: 'attente',
    vueParDefaut: 'capitaine',
    nulAutorise: true,

    capitaine: {
      titre: 'Ma déclaration',
      labelA: 'Buts de Kenzo_FC (toi)',
      labelB: 'Buts de TheoG',
      scoreA: '2',
      scoreB: '1',
      titreStats: 'Mes statistiques',
      sousTitreStats: 'En 1v1, tu es le seul joueur de ton équipe : une seule ligne à remplir.',
      champsStats: [
        { label: 'Buts', valeur: '2' },
        { label: 'Passes déc.', valeur: '0' },
        { label: 'Cartons', valeur: '0' },
        { label: 'Clean sheet', valeur: 'Non', options: ['Non', 'Oui'] },
      ],
      aide: "Tant que le match n'est pas validé, tu peux corriger ta déclaration.",
    },

    declarations: {
      titre: 'En attente de TheoG',
      cadre: 'bleu',
      colonnes: ['Kenzo_FC', 'TheoG'],
      lignes: [
        { nom: 'Kenzo_FC (toi)', heure: '22:41', valeurs: [{ valeur: '2' }, { valeur: '1' }] },
        { nom: 'TheoG', attente: 'pas encore déclaré' },
      ],
      texte: 'Si TheoG déclare le même score, le match est validé automatiquement et tu passes en finale. Sinon, il passe en litige et MaPseudo, créateur du tournoi, fixe le score.',
    },
  },
}
