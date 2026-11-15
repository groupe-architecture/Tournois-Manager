// src/components/tabs/TournamentTabs.jsx
import React from 'react';
import '../../styles/components/TournamentTabs.css';

const TABS = [
  { key: 'matchs', label: 'Matchs' },
  { key: 'classement', label: 'Classement' },
  { key: 'stats', label: 'Statistiques' },
  { key: 'chat', label: 'Chat' },
];

/**
 * @param {string} activeTab - Onglet actif
 * @param {function} onTabChange - Callback au changement d'onglet
 * @param {string} format - 'championnat' | 'coupe'
 */
export default function TournamentTabs({ activeTab, onTabChange, format = 'championnat' }) {
    const visibleTabs = TABS.filter((tab) => {
    if (tab.key === 'classement' && format === 'coupe') return false;
    return true;
  });

  return (
    <nav className="tournament-tabs" role="tablist" aria-label="Sections du tournoi">
      {visibleTabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            className={`tournament-tabs__tab ${isActive ? 'tournament-tabs__tab--active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}