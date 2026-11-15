// Bloc « État du match » (figures 11, 12, 14, 15, 17, 19) : la frise des états d'un match.
// etat : 'attente', 'litige' ou 'valide'. Seul l'affichage change, rien n'est calculé ici.
function EtatMatch({ etat }) {
  const enAttente = etat === 'attente'

  // Les deux issues possibles après la seconde déclaration.
  const issues = [
    { cle: 'valide', titre: 'Déclarations identiques', lignes: ['→ Validé'] },
    { cle: 'litige', titre: 'Déclarations différentes', lignes: ['→ Litige → arbitrage ou correction', '→ Validé'] },
  ]

  function mentionIssue(cle) {
    if (cle === etat) return <> · <span className="etat-match__actuel">état actuel</span></>
    if (etat === 'valide') return ' · non concerné'
    return null
  }

  return (
    <section className="carte bloc-match etat-match">
      <h2 className="bloc-match__titre">État du match</h2>

      <ol className="etat-match__frise">
        <li className="etat-match__etape">
          <span className="etat-match__point" />
          <span className="etat-match__nom">À jouer</span>
          <span className="etat-match__detail">aucune déclaration</span>
        </li>

        <li className={`etat-match__etape ${enAttente ? 'etat-match__etape--actuelle' : ''}`}>
          <span className="etat-match__point" />
          <span className="etat-match__nom">En attente</span>
          {enAttente ? (
            <span className="etat-match__actuel">état actuel</span>
          ) : (
            <span className="etat-match__detail">un capitaine a déclaré</span>
          )}
        </li>

        <li className="etat-match__suite">
          <p>Puis, selon la seconde déclaration, une des deux issues :</p>

          {issues.map((issue, index) => (
            <div key={issue.cle}>
              {index > 0 && <p className="etat-match__ou">ou</p>}
              <div className={`etat-match__issue ${issue.cle === etat ? `etat-match__issue--${etat}` : ''}`}>
                <p className="etat-match__issue-titre">
                  {issue.titre}
                  {mentionIssue(issue.cle)}
                </p>
                {issue.lignes.map((ligne) => <strong key={ligne}>{ligne}</strong>)}
              </div>
            </div>
          ))}
        </li>
      </ol>
    </section>
  )
}

export default EtatMatch
