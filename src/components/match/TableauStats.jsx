// Tableau de statistiques des joueurs d'une équipe (figures 11, 14, 17).
// Les colonnes changent selon la discipline : elles arrivent toutes faites dans les props.
function TableauStats({ colonnes, lignes, total }) {
  return (
    <div className="tableau-stats">
      <table>
        <thead>
          <tr>{colonnes.map((colonne) => <th key={colonne}>{colonne}</th>)}</tr>
        </thead>
        <tbody>
          {lignes.map((ligne) => (
            <tr key={ligne[0]}>{ligne.map((cellule, index) => <td key={index}>{cellule}</td>)}</tr>
          ))}
          {total && (
            <tr className="tableau-stats__total">{total.map((cellule, index) => <td key={index}>{cellule}</td>)}</tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableauStats
