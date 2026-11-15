import { IconeCadenas } from './Icones'

// Bloc « Les deux déclarations » (figures 11, 14, 17) et sa variante « En attente de… » (figure 19).
// Les valeurs qui diffèrent d'une déclaration à l'autre sont marquées en orange avec « ≠ ».
// cadre : 'orange' (litige), 'bleu' (en attente) ou rien (validé).
function DeuxDeclarations({ titre, colonnes, lignes, texte, encart, cadre }) {
  return (
    <section className={`carte bloc-match deux-declarations ${cadre ? `bloc-match--${cadre}` : ''}`}>
      <h2 className="bloc-match__titre">{titre}</h2>

      <table className="deux-declarations__table">
        <thead>
          <tr>
            <th>Déclaré par</th>
            {colonnes.map((colonne) => <th key={colonne}>{colonne}</th>)}
          </tr>
        </thead>
        <tbody>
          {lignes.map((ligne) => (
            <tr key={ligne.nom}>
              <td className="deux-declarations__nom">
                {ligne.nom}
                {ligne.heure && <span className="deux-declarations__heure"> {ligne.heure}</span>}
              </td>
              {ligne.attente ? (
                <td colSpan={colonnes.length} className="deux-declarations__attente">{ligne.attente}</td>
              ) : (
                ligne.valeurs.map((cellule, index) => (
                  <td key={index} className={cellule.ecart ? 'deux-declarations__ecart' : ''}>
                    {cellule.valeur}{cellule.ecart && ' ≠'}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {texte && <p className="bloc-match__texte">{texte}</p>}

      {encart && (
        <p className="deux-declarations__encart">
          <IconeCadenas />
          <span>{encart}</span>
        </p>
      )}
    </section>
  )
}

export default DeuxDeclarations
