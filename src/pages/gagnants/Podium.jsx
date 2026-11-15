import React from 'react';
import '../../styles/pages/WinnersPage.css';

export default function Podium({ podium = [] }) {
  const order = [1, 0, 2];
  const heights = { 1: 'tall', 2: 'medium', 3: 'short' };
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

  return (
    <div className="podium">
      {order.map((idx) => {
        const entry = podium[idx];
        if (!entry) return null;
        return (
          <div key={entry.rank} className={`podium__step podium__step--${heights[entry.rank]}`}>
            <div className="podium__medal">{medals[entry.rank]}</div>
            <div className="podium__logo">{entry.logo}</div>
            <div className="podium__team">{entry.team}</div>
            <div className="podium__reward">{entry.reward}</div>
            <div className={`podium__block podium__block--${entry.rank}`}>
              <span className="podium__rank">#{entry.rank}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}