// Les deux cases de score côte à côte, séparées par un tiret (figures 11, 12, 14, 15, 19).
// Le composant ne garde rien en mémoire : la page lui donne les valeurs et reçoit les changements.
function SaisieScore({ labelA, labelB, valeurA, valeurB, onChange, erreur = false, desactive = false, placeholder = '' }) {
  function changer(cote, evenement) {
    // On n'accepte que des chiffres (3 au maximum).
    const valeur = evenement.target.value.replace(/\D/g, '').slice(0, 3)
    onChange(cote, valeur)
  }

  return (
    <div className={`saisie-score ${erreur ? 'saisie-score--erreur' : ''}`}>
      <label className="saisie-score__case">
        <span>{labelA}</span>
        <input inputMode="numeric" value={valeurA} placeholder={placeholder} disabled={desactive} onChange={(e) => changer('A', e)} />
      </label>
      <span className="saisie-score__tiret">-</span>
      <label className="saisie-score__case">
        <span>{labelB}</span>
        <input inputMode="numeric" value={valeurB} placeholder={placeholder} disabled={desactive} onChange={(e) => changer('B', e)} />
      </label>
    </div>
  )
}

export default SaisieScore
