import StatCard from './StatCard';

/**
 * Les blocs de statistiques d'un tournoi, les uns sous les autres
 * (colonne de droite) ou en grille (onglet « Statistiques »).
 * @param {Array} blocs - [{ titre, lignes, note }]
 * @param {boolean} enGrille - Disposition en grille pour l'onglet
 */
export default function StatsPanel({ blocs = [], enGrille = false }) {
  if (blocs.length === 0) {
    return <p className="texte-doux">Aucune statistique pour l’instant : elles apparaissent quand un match est validé.</p>;
  }

  return (
    <div className={`stats-panel ${enGrille ? 'stats-panel--grille' : ''}`}>
      {blocs.map((bloc) => (
        <StatCard key={bloc.titre} titre={bloc.titre} lignes={bloc.lignes} note={bloc.note} />
      ))}
    </div>
  );
}
