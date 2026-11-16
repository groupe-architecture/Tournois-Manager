import { LIBELLES_ONGLETS } from '../../utils/disciplineConfig';

/**
 * Barre d'onglets de la page d'un tournoi (figures 10, 13, 16, 18).
 * @param {string[]} onglets - Clés des onglets, dans l'ordre d'affichage
 * @param {string} activeTab - Onglet actif
 * @param {function} onTabChange - Appelée avec la clé de l'onglet cliqué
 */
export default function TournamentTabs({ onglets, activeTab, onTabChange }) {
  return (
    <nav className="tournament-tabs" role="tablist" aria-label="Sections du tournoi">
      {onglets.map((cle) => {
        const actif = activeTab === cle;
        return (
          <button
            key={cle}
            type="button"
            role="tab"
            aria-selected={actif}
            className={`tournament-tabs__tab ${actif ? 'tournament-tabs__tab--active' : ''}`}
            onClick={() => onTabChange(cle)}
          >
            {LIBELLES_ONGLETS[cle]}
          </button>
        );
      })}
    </nav>
  );
}
