// Ce qui change d'une discipline ou d'un format à l'autre dans la page d'un tournoi :
// colonnes du classement et onglets. L'affichage seulement : les règles de calcul
// (points, départage) resteront dans la couche service, puis dans l'API.

export const DISCIPLINES = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
  VALORANT: 'valorant',
  EASPORTS_FC: 'ea_sports_fc',
};

// Libellé affiché dans les données d'exemple → clé de discipline.
const CLES = {
  Football: DISCIPLINES.FOOTBALL,
  Basketball: DISCIPLINES.BASKETBALL,
  Valorant: DISCIPLINES.VALORANT,
  'EA Sports FC': DISCIPLINES.EASPORTS_FC,
};

export const cleDiscipline = (libelle) => CLES[libelle];

// Colonnes du classement (figures 13 et 16).
// Pas de colonne N quand le match nul est impossible (basket, Valorant).
const RANG = { cle: 'rang', titre: '#', type: 'rang' };
const EQUIPE = { cle: 'equipe', titre: 'Équipe', type: 'equipe' };
const JOUES = { cle: 'joues', titre: 'J' };
const VICTOIRES = { cle: 'victoires', titre: 'V' };
const NULS = { cle: 'nuls', titre: 'N' };
const DEFAITES = { cle: 'defaites', titre: 'D' };
const POINTS = { cle: 'points', titre: 'Pts', type: 'points' };

export const COLONNES_CLASSEMENT = {
  [DISCIPLINES.FOOTBALL]: [RANG, EQUIPE, JOUES, VICTOIRES, NULS, DEFAITES, { cle: 'ecart', titre: 'Diff' }, POINTS],
  [DISCIPLINES.BASKETBALL]: [RANG, EQUIPE, JOUES, VICTOIRES, DEFAITES, { cle: 'ecart', titre: 'Diff' }, POINTS],
  [DISCIPLINES.VALORANT]: [RANG, EQUIPE, JOUES, VICTOIRES, DEFAITES, { cle: 'ecart', titre: 'Rounds' }, POINTS],
  [DISCIPLINES.EASPORTS_FC]: [RANG, EQUIPE, JOUES, VICTOIRES, NULS, DEFAITES, { cle: 'ecart', titre: 'Diff' }, POINTS],
};

// Onglets de la page d'un tournoi : « Classement » en championnat, « Tableau » en coupe.
export const ONGLETS_PAR_FORMAT = {
  championnat: ['matchs', 'classement', 'stats', 'chat'],
  coupe: ['matchs', 'tableau', 'stats', 'chat'],
};

export const LIBELLES_ONGLETS = {
  matchs: 'Matchs',
  classement: 'Classement',
  tableau: 'Tableau',
  stats: 'Statistiques',
  chat: 'Chat',
};
