import { useState } from 'react'

// Affiche le code d'accès d'un tournoi privé avec un bouton pour le copier.
function BoutonCopierCode({ code }) {
  // 'repos' → 'copie' ou 'echec', puis retour à 'repos' après deux secondes.
  const [etat, setEtat] = useState('repos')

  async function copier() {
    try {
      // L'API du navigateur pour écrire dans le presse-papiers. Elle est asynchrone.
      await navigator.clipboard.writeText(code)
      setEtat('copie')
    } catch {
      // Le navigateur peut refuser (permission, page non sécurisée).
      setEtat('echec')
    }
    setTimeout(() => setEtat('repos'), 2000)
  }

  let libelle = 'Copier le code'
  if (etat === 'copie') libelle = 'Copié !'
  if (etat === 'echec') libelle = 'Copie impossible'

  return (
    <div className="copier-code">
      <code className="copier-code__valeur">{code}</code>
      <button
        type="button"
        className={`copier-code__bouton ${etat === 'copie' ? 'copier-code__bouton--copie' : ''}`}
        onClick={copier}
        aria-live="polite"
      >
        {libelle}
      </button>
    </div>
  )
}

export default BoutonCopierCode
