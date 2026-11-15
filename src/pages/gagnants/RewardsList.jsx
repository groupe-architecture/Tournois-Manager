import React from 'react';
import '../../styles/pages/WinnersPage.css';

export default function RewardsList({ rewards = [] }) {
  if (rewards.length === 0) return null;

  return (
    <div className="rewards">
      <h3 className="rewards__title">🏅 Récompenses individuelles</h3>
      <div className="rewards__grid">
        {rewards.map((reward, idx) => (
          <div key={idx} className="reward-card">
            <div className="reward-card__icon">{reward.icon}</div>
            <div className="reward-card__title">{reward.title}</div>
            <div className="reward-card__winner">{reward.winner}</div>
            <div className="reward-card__team">{reward.team}</div>
            <div className="reward-card__value">{reward.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}