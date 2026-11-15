import React from 'react';
import Podium from './Podium';
import RewardsList from './RewardsList';
import { mockWinners } from '../../services/mocks/tournamentMockData';
import '../../styles/pages/WinnersPage.css';

export default function WinnersPage() {
  const { tournamentName, podium, rewards } = mockWinners;

  return (
    <div className="winners-page">
      <div className="winners-page__header">
        <span className="winners-page__small-title">TOURNOI TERMINÉ</span>
        <h1 className="winners-page__title">🏆 {tournamentName}</h1>
        <p className="winners-page__subtitle">Félicitations aux vainqueurs !</p>
      </div>

      <Podium podium={podium} />
      <RewardsList rewards={rewards} />

      <div className="winners-page__actions">
        <button className="winners-page__button winners-page__button--primary">
          Voir les statistiques
        </button>
        <button className="winners-page__button winners-page__button--secondary">
          Retour au tournoi
        </button>
      </div>
    </div>
  );
}