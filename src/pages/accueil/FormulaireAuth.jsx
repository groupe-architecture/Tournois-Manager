
 import { useNavigate } from 'react-router-dom'

import { useState } from 'react'


import Champ from '../../components/commun/Champ'
import Bouton from '../../components/commun/Bouton'

function FormulaireAuth() {
  const [onglet, setOnglet] = useState('inscription')
  const navigate = useNavigate()
 const soumettre = (e) => {
    e.preventDefault()
    navigate('/profil')
  }


  return (
    <div className="carte auth">
      <div className="auth__onglets">
        <button
          className={`auth__onglet ${onglet === 'inscription' ? 'actif' : ''}`}
          onClick={() => setOnglet('inscription')}
        >
          Créer un compte
        </button>
        <button
          className={`auth__onglet ${onglet === 'connexion' ? 'actif' : ''}`}
          onClick={() => setOnglet('connexion')}
        >
          Se connecter
        </button>
      </div>

      <form onSubmit={soumettre}>
        {onglet === 'inscription' && (
          <Champ label="Pseudo (unique)" id="pseudo" placeholder="ex. MaPseudo" />
        )}
        <Champ
          label={onglet === 'inscription' ? 'Email (unique)' : 'Email'}
          id="email" type="email" placeholder="toi@exemple.fr"
        />
        <Champ label="Mot de passe" id="mdp" type="password" placeholder="••••••••" />

        <Bouton large type="submit">
          {onglet === 'inscription' ? 'Créer mon compte' : 'Me connecter'}
        </Bouton>

        <p className="texte-doux auth__bas">
          {onglet === 'inscription'
            ? 'Déjà inscrit ? Passe sur « Se connecter ».'
            : 'Pas de compte ? Passe sur « Créer un compte ».'}
        </p>
      </form>
    </div>
  )
}

export default FormulaireAuth