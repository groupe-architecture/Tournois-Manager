/**
 * Podium de l'écran des gagnants (figure 20) : 2e à gauche, 1er au centre, 3e à droite.
 * @param {Array} podium - [{ place, nom, detail }]
 */
export default function Podium({ podium = [] }) {
  const ordre = [2, 1, 3];

  return (
    <div className="podium">
      {ordre.map((place) => {
        const marche = podium.find((p) => p.place === place);
        if (!marche) return null;
        return (
          <div key={place} className={`podium__marche podium__marche--${place}`}>
            <p className="podium__nom">{marche.nom}</p>
            <p className="podium__detail">{marche.detail}</p>
            <div className="podium__bloc">{place}</div>
          </div>
        );
      })}
    </div>
  );
}
