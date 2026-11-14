// Groupe de choix où une seule option peut être sélectionnée (comme des boutons radio).
// Deux apparences : 'cartes' (titre + description) ou 'pilules' (petit bouton arrondi).
//
// Ce composant ne retient rien lui-même : le parent lui donne la valeur choisie
// et une fonction onChange à appeler quand l'utilisateur clique.
function GroupeOptions({ label, options, valeur, onChange, apparence = 'cartes' }) {
  return (
    <div className="groupe-options">
      <p className="groupe-options__label">{label}</p>
      <div className={`groupe-options__liste groupe-options__liste--${apparence}`} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const choisie = option.valeur === valeur
          const classeBase = apparence === 'cartes' ? 'option-carte' : 'option-pilule'
          return (
            <button
              key={option.valeur}
              type="button"
              role="radio"
              aria-checked={choisie}
              className={`${classeBase} ${choisie ? `${classeBase}--choisie` : ''}`}
              onClick={() => onChange(option.valeur)}
            >
              <strong>{option.titre}</strong>
              {option.description && <span>{option.description}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GroupeOptions
