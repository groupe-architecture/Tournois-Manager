import React from 'react';
import { LEADERBOARD_COLUMNS } from '../../utils/disciplineConfig';
import '../../styles/components/LeaderboardTable.css';

/**
 * @param {Array} rows - Données du classement (une ligne par équipe)
 * @param {string} discipline - Clé de discipline (DISCIPLINES.*)
 * @param {string} myTeamName - Nom de l'équipe du joueur courant (surligné)
 */
export default function LeaderboardTable({ rows = [], discipline, myTeamName }) {
  const columns = LEADERBOARD_COLUMNS[discipline];

  if (!columns) {
    return <p className="leaderboard-error">Discipline inconnue.</p>;
  }

  const gridTemplate = `40px 2fr repeat(${columns.length - 2}, 1fr)`;

  const formatCell = (col, row) => {
    const value = row[col.key];

    switch (col.type) {
      case 'rank':
        return <span className={`leaderboard__rank leaderboard__rank--${value}`}>{value}</span>;
      case 'team':
        return <span className="leaderboard__team">{value}</span>;
      case 'diff':
        return (
          <span className={`leaderboard__diff ${value > 0 ? 'leaderboard__diff--pos' : value < 0 ? 'leaderboard__diff--neg' : ''}`}>
            {value > 0 ? `+${value}` : value}
          </span>
        );
      case 'points':
        return <span className="leaderboard__points">{value}</span>;
      default:
        return value;
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard__header-row" style={{ gridTemplateColumns: gridTemplate }}>
        {columns.map((col) => (
          <div key={col.key} className={`leaderboard__header-cell leaderboard__header-cell--${col.type}`}>
            {col.label}
          </div>
        ))}
      </div>

      <div className="leaderboard__body">
        {rows.map((row) => {
          const isMyTeam = myTeamName && row.team === myTeamName;
          return (
            <div
              key={row.rank}
              className={`leaderboard__row ${isMyTeam ? 'leaderboard__row--me' : ''}`}
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {columns.map((col) => (
                <div key={col.key} className={`leaderboard__cell leaderboard__cell--${col.type}`}>
                  {formatCell(col, row)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}