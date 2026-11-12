import { Link, NavLink, useLocation } from 'react-router-dom'
import Bouton from '../components/commun/Bouton'
import MenuCompte from './MenuCompte'
import PanneauNotifications from './PanneauNotifications'

// Valeurs d'exemple en dur (celles des maquettes)
const notificationsExemple = [
  { id: 1, couleur: 'orange', titre: 'Litige à arbitrer · Coupe de la Résidence', texte: 'Red Fox et Les Titans ont déclaré des scores différents.', temps: 'Il y a 5 min · non lue', lue: false },
  { id: 2, couleur: 'bleue', titre: 'Score à déclarer · Open ECE Valorant', texte: "Les Duellistes ont déclaré leur score contre Radiant B2. À toi de déclarer le tien.", temps: 'Il y a 1 h · non lue', lue: false },
  { id: 3, couleur: 'gris', titre: 'Duel FC du vendredi', texte: 'Kenzo_FC a déclaré le score de sa demi-finale contre TheoG.', temps: 'Hier · lue', lue: true },
]

const classeLien = ({ isActive }) => `navbar__lien ${isActive ? 'actif' : ''}`

function Navbar() {
  const { pathname } = useLocation()
  const estVisiteur = pathname === '/'   // temporaire, tant qu'il n'y a pas de vraie connexion

  return (
    <header className="navbar">
      <div className="conteneur navbar__interieur">
        <Link to="/" className="navbar__logo">TOURNOI MANAGER</Link>

        {estVisiteur ? (
          <nav className="navbar__liens">
            <NavLink to="/tournois" className={classeLien}>Tournois publics</NavLink>
            <Link to="/" className="navbar__lien">Se connecter</Link>
            <Bouton to="/">Créer un compte</Bouton>
          </nav>
        ) : (
          <nav className="navbar__liens">
            <NavLink to="/tournois" end className={classeLien}>Tournois</NavLink>
            <NavLink to="/profil" className={classeLien}>Mes tournois</NavLink>
            <Bouton to="/tournois/creer">Créer un tournoi</Bouton>
            <PanneauNotifications notifications={notificationsExemple} />
            <MenuCompte pseudo="MaPseudo" email="mapseudo@mail.fr" />
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar