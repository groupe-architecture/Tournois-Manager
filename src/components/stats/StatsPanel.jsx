import React from 'react';
import { STATS_PANELS } from '../../utils/disciplineConfig';
import StatCard from './StatCard';
import '../../styles/components/StatsPanel.css';

/**
 * @param {string} discipline - Clé de discipline
 * @param {Object} statsData - { topScorers: [...], topAssists: [...], ... }
 */
export default function StatsPanel({ discipline, statsData = {} }) {
  const panels = STATS_PANELS[discipline];

  if (!panels) {
    return <p className="stats-error">Discipline inconnue.</p>;
  }

  return (
    <div className="stats-panel">
      {panels.map((panel) => (
        <StatCard
          key={panel.key}
          title={panel.title}
          icon={panel.icon}
          unit={panel.unit}
          data={statsData[panel.key] || []}
        />
      ))}
    </div>
  );
}