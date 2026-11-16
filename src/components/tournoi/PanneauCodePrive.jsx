import { useState } from 'react'
import Bouton from '../commun/Bouton'
import Champ from '../commun/Champ'

const LONGUEUR_CODE = 8
const ESSAIS_MAX = 3

// Panneau « Tournoi privé » de la liste des tournois (figure 4).
function PanneauCodePrive() {
  const [code, setCode] = useState('')
  const [erreur, setErreur] = useState('')
  const [essaisRestants, setEssaisRestants] = useState(ESSAIS_MAX)

  const bloque = essaisRestants === 0

  // À chaque frappe : majuscules, lettres et chiffres uniquement, 8 caractères maximum.
  function gererSaisie(evenement) {
    const propre = evenement.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, LONGUEUR_CODE)
    setCode(propre)
    setErreur('')
  }

  function gererEnvoi(evenement) {
    evenement.preventDefault() // empêche le navigateur de recharger la page

    if (code.length < LONGUEUR_CODE) {
      setErreur(`Le code doit contenir ${LONGUEUR_CODE} caractères.`)
      return
    }

    // En attendant l'API : aucun code ne peut être vérifié, on affiche donc
    // la réponse « code invalide » de la maquette et on décompte les essais.
    const restants = essaisRestants - 1
    setEssaisRestants(restants)
    setErreur(
      restants === 0
        ? 'Code invalide. Tu as utilisé tous tes essais.'
        : `Code invalide. Il te reste ${restants} essai${restants > 1 ? 's' : ''}.`
    )
  }

  return (
    <aside className="carte panneau-code">
      <h2>Tournoi privé</h2>
      <p className="texte-doux">
        Le créateur te transmet un code de {LONGUEUR_CODE} caractères. Le nombre d'essais est limité.
      </p>

      <form onSubmit={gererEnvoi} noValidate>
        <div className={erreur ? 'panneau-code__champ panneau-code__champ--erreur' : 'panneau-code__champ'}>
          <Champ
            label="Code d'accès"
            id="code-acces"
            value={code}
            onChange={gererSaisie}
            disabled={bloque}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={erreur !== ''}
            aria-describedby={erreur ? 'code-acces-erreur' : undefined}
          />
        </div>

        {erreur && (
          <p className="panneau-code__erreur" id="code-acces-erreur" role="alert">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 5.8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="13.8" r="0.9" fill="currentColor" />
            </svg>
            {erreur}
          </p>
        )}

        <Bouton type="submit" large disabled={bloque}>Rejoindre avec le code</Bouton>
      </form>
    </aside>
  )
}

export default PanneauCodePrive
