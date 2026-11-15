export const DISCIPLINES = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
  VALORANT: 'valorant',
  EASPORTS_FC: 'ea_sports_fc',
};

export const LEADERBOARD_COLUMNS = {
  [DISCIPLINES.FOOTBALL]: [
    { key: 'rank', label: '#', type: 'rank' },
    { key: 'team', label: 'Équipe', type: 'team' },
    { key: 'played', label: 'J', type: 'number' },
    { key: 'wins', label: 'V', type: 'number' },
    { key: 'draws', label: 'N', type: 'number' },
    { key: 'losses', label: 'D', type: 'number' },
    { key: 'goalsFor', label: 'BP', type: 'number' },
    { key: 'goalsAgainst', label: 'BC', type: 'number' },
    { key: 'goalDiff', label: 'Diff', type: 'diff' },
    { key: 'points', label: 'Pts', type: 'points' },
  ],
  [DISCIPLINES.BASKETBALL]: [
    { key: 'rank', label: '#', type: 'rank' },
    { key: 'team', label: 'Équipe', type: 'team' },
    { key: 'played', label: 'J', type: 'number' },
    { key: 'wins', label: 'V', type: 'number' },
    { key: 'losses', label: 'D', type: 'number' },
    { key: 'pointsFor', label: 'PP', type: 'number' },
    { key: 'pointsAgainst', label: 'PC', type: 'number' },
    { key: 'pointDiff', label: 'Diff', type: 'diff' },
    { key: 'points', label: 'Pts', type: 'points' },
  ],
  [DISCIPLINES.VALORANT]: [
    { key: 'rank', label: '#', type: 'rank' },
    { key: 'team', label: 'Équipe', type: 'team' },
    { key: 'played', label: 'J', type: 'number' },
    { key: 'wins', label: 'V', type: 'number' },
    { key: 'losses', label: 'D', type: 'number' },
    { key: 'rounds', label: 'Rounds', type: 'number' },
    { key: 'points', label: 'Pts', type: 'points' },
  ],
  [DISCIPLINES.EASPORTS_FC]: [
    { key: 'rank', label: '#', type: 'rank' },
    { key: 'team', label: 'Équipe', type: 'team' },
    { key: 'played', label: 'J', type: 'number' },
    { key: 'wins', label: 'V', type: 'number' },
    { key: 'draws', label: 'N', type: 'number' },
    { key: 'losses', label: 'D', type: 'number' },
    { key: 'goalsFor', label: 'BP', type: 'number' },
    { key: 'goalsAgainst', label: 'BC', type: 'number' },
    { key: 'goalDiff', label: 'Diff', type: 'diff' },
    { key: 'points', label: 'Pts', type: 'points' },
  ],
};


export const STATS_PANELS = {
  [DISCIPLINES.FOOTBALL]: [
    { key: 'topScorers', title: 'Meilleurs buteurs', icon: '⚽', unit: 'buts' },
    { key: 'topAssists', title: 'Meilleures passes déc.', icon: '🎯', unit: 'passes' },
    { key: 'cleanSheets', title: 'Clean sheets', icon: '🧤', unit: 'matchs' },
    { key: 'topCards', title: 'Cartons', icon: '🟨', unit: 'cartons' },
  ],
  [DISCIPLINES.BASKETBALL]: [
    { key: 'topScorers', title: 'Meilleurs marqueurs', icon: '🏀', unit: 'points' },
    { key: 'topRebounds', title: 'Meilleurs rebondeurs', icon: '💪', unit: 'rebonds' },
    { key: 'topAssists', title: 'Meilleurs passeurs', icon: '🎯', unit: 'passes' },
    { key: 'topMVP', title: 'MVP du tournoi', icon: '🏆', unit: 'pts' },
  ],
  [DISCIPLINES.VALORANT]: [
    { key: 'topFraggers', title: 'Meilleurs fraggers', icon: '🎯', unit: 'kills' },
    { key: 'topClutches', title: 'Meilleurs clutcheurs', icon: '🔥', unit: 'clutchs' },
    { key: 'topAssists', title: 'Meilleurs supports', icon: '🛡️', unit: 'assists' },
    { key: 'topACS', title: 'Meilleur ACS', icon: '⚡', unit: 'ACS' },
  ],
  [DISCIPLINES.EASPORTS_FC]: [
    { key: 'topScorers', title: 'Meilleurs buteurs', icon: '⚽', unit: 'buts' },
    { key: 'topAssists', title: 'Meilleures passes déc.', icon: '🎯', unit: 'passes' },
    { key: 'cleanSheets', title: 'Clean sheets', icon: '🧤', unit: 'matchs' },
    { key: 'topMVP', title: 'MVP du tournoi', icon: '🏆', unit: 'pts' },
  ],
};

export const allowsDraw = (discipline) =>
  discipline === DISCIPLINES.FOOTBALL || discipline === DISCIPLINES.EASPORTS_FC;

export const hasLeaderboard = (format) => format === 'championnat';