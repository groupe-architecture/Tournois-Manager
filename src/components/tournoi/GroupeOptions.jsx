// Groupe de choix où une seule option peut être sélectionnée (comme des boutons radio).
// Trois apparences : 'cartes' (titre + description), 'pilules' (petit bouton arrondi)
// ou 'boutons' (petit rectangle, utilisé dans la page de configuration).
//
// Ce composant ne retient rien lui-même : le parent lui donne la valeur choisie
// et une fonction onChange à appeler quand l'utilisateur clique.
const CLASSES = {
  cartes: 'option-carte',
  pilules: 'option-pilule',
  boutons: 'option-bouton',
}

function GroupeOptions({ label, options, valeur, onChange, apparence = 'cartes', aide }) {
  const classeBase = CLASSES[apparence]

  return (
    <div className="groupe-options">
      <p className="groupe-options__label">{label}</p>
      <div className={`groupe-options__liste groupe-options__liste--${apparence}`} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const choisie = option.valeur === valeur
          return (
            <button
              key={option.valeur}
              type="button"
              role="radio"
              aria-checked={choisie}
              disabled={option.desactivee}
              className={`${classeBase} ${choisie ? `${classeBase}--choisie` : ''}`}
              onClick={() => onChange(option.valeur)}
            >
              <strong>{option.titre}</strong>
              {option.description && <span>{option.description}</span>}
            </button>
          )
        })}
      </div>
      {aide && <p className="texte-doux groupe-options__aide">{aide}</p>}
    </div>
  )
}

export default GroupeOptions
