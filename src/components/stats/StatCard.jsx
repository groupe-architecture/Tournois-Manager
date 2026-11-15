import React from 'react';
import '../../styles/components/StatsPanel.css';


export default function StatCard({ title, icon, unit, data = [] }) {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__icon">{icon}</span>
        <h3 className="stat-card__title">{title}</h3>
      </div>

      <ul className="stat-card__list">
        {data.slice(0, 5).map((entry) => (
          <li key={entry.rank} className="stat-card__item">
            <span className={`stat-card__rank stat-card__rank--${entry.rank}`}>
              {entry.rank}
            </span>
            <div className="stat-card__info">
              <span className="stat-card__name">{entry.name}</span>
              <span className="stat-card__team">{entry.team}</span>
            </div>
            <span className="stat-card__value">
              {entry.value} <span className="stat-card__unit">{unit}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}