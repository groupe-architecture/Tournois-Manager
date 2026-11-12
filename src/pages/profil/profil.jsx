import Bouton from '../../components/commun/Bouton'

// Valeurs d'exemple en dur
const utilisateur = { pseudo: 'MaPseudo', email: 'mapseudo@mail.fr', depuis: 'septembre 2026', crees: 2, rejoints: 1 }

const aFaire = [
  { id: 1, couleur: 'orange', surtitre: 'LITIGE À ARBITRER · EN TANT QUE CRÉATEUR', titre: 'Red Fox vs Les Titans', detail: 'Coupe de la Résidence · quart de finale', bouton: 'Arbitrer', variante: 'orange' },
  { id: 2, couleur: 'bleue', surtitre: 'SCORE À DÉCLARER · EN TANT QUE CAPITAINE DE RADIANT B2', titre: 'Les Duellistes vs Radiant B2', detail: "Open ECE Valorant · journée 3 · l'adversaire a déjà déclaré", bouton: 'Déclarer le score', variante: 'principal' },
]

const tournoisCrees = [
  { id: 1, surtitre: 'FOOTBALL · 5V5 · COUPE', nom: 'Coupe de la Résidence', detail: '8 équipes · quarts de finale · 1 litige', statut: 'en cours' },
  { id: 2, surtitre: 'EA SPORTS FC · 1V1 · COUPE', nom: 'Duel FC du vendredi', detail: '8 joueurs · demi-finales', statut: 'en cours' },
]

const tournoisRejoints = [
  { id: 3, surtitre: 'VALORANT · 5V5 · CHAMPIONNAT', nom: 'Open ECE Valorant', detail: 'Équipe Radiant B2 · capitaine · prochain match : Les Duellistes', statut: 'en cours' },
]

function CarteTournoi({ tournoi }) {
  return (
    <div className="carte carte-tournoi">
      <div className="carte-tournoi__haut">
        <span className="surtitre">{tournoi.surtitre}</span>
        <span className="texte-doux">{tournoi.statut}</span>
      </div>
      <h3>{tournoi.nom}</h3>
      <p className="texte-doux">{tournoi.detail}</p>
    </div>
  )
}

function Profil() {
  const initiales = utilisateur.pseudo.slice(0, 2).toUpperCase()

  return (
    <>
      <section className="carte profil__entete">
        <div className="avatar avatar--grand">{initiales}</div>
        <div className="profil__identite">
          <h1>{utilisateur.pseudo}</h1>
          <p className="texte-doux">{utilisateur.email} · membre depuis {utilisateur.depuis}</p>
        </div>
        <div className="profil__stats">
          <div className="profil__stat"><strong>{utilisateur.crees}</strong><span>tournois créés</span></div>
          <div className="profil__stat"><strong>{utilisateur.rejoints}</strong><span>tournoi rejoint</span></div>
        </div>
      </section>

      <section className="section">
        <h2>À faire <span className="texte-doux">· {aFaire.length}</span></h2>
        <div className="profil__liste">
          {aFaire.map((t) => (
            <div key={t.id} className={`carte carte--${t.couleur} tache`}>
              <div>
                <p className={`surtitre tache__surtitre--${t.couleur}`}>{t.surtitre}</p>
                <h3>{t.titre}</h3>
                <p className="texte-doux">{t.detail}</p>
              </div>
              <Bouton variante={t.variante}>{t.bouton}</Bouton>
            </div>
          ))}
        </div>
      </section>

      <section className="section profil__colonnes">
        <div>
          <h2>Tournois créés</h2>
          <div className="profil__liste">
            {tournoisCrees.map((t) => <CarteTournoi key={t.id} tournoi={t} />)}
          </div>
        </div>
        <div>
          <h2>Tournois rejoints</h2>
          <div className="profil__liste">
            {tournoisRejoints.map((t) => <CarteTournoi key={t.id} tournoi={t} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default Profil