import {useState} from 'react'
import { Link } from 'react-router-dom'

function MenuCompte({pseudo , email}) { 
    const[ouvert , setOuvert] = useState(false)
    const initiales = pseudo.slice(0,2).toUpperCase()

    return (
        <div className="menu-wrapper">
            <button className="menu-compte__bouton" onClick={ () => setOuvert(!ouvert) }>
                <span className="avatar">{initiales}</span>
                {pseudo} {ouvert ? '▲' : '▼'}
            </button>
            {ouvert && (
        <div className="menu-deroulant">
          <div className="menu-deroulant__entete">
            <strong>{pseudo}</strong>
            <span className="texte-doux">{email}</span>
          </div>
          <Link to="/profil" className="menu-deroulant__lien" onClick={() => setOuvert(false)}>Mon profil</Link>
          <Link to="/tournois/creer" className="menu-deroulant__lien" onClick={() => setOuvert(false)}>+ Créer un tournoi</Link>
          <Link to="/" className="menu-deroulant__lien menu-deroulant__lien--danger">Se déconnecter</Link>
        </div>
      )}
    </div>
  )
}

export default MenuCompte