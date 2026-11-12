import Bouton from '../../components/commun/Bouton'
import FormulaireAuth from './FormulaireAuth'

// Valeurs d'exemple en dur (celles de la maquette)
const disciplines = [
  { type: 'SPORT', nom: 'Football', texte: '5v5 ou 11v11. Match nul possible. 3 points la victoire, 1 le nul.' },
  { type: 'SPORT', nom: 'Basketball', texte: '3x3 ou 5x5. Pas de nul. 2 points la victoire, 1 la défaite.' },
  { type: 'JEU VIDÉO', nom: 'EA Sports FC', texte: '1v1 ou Clubs. Scores en buts, nul possible.' },
  { type: 'JEU VIDÉO', nom: 'Valorant', texte: '5v5 ou 1v1. Premier à 13 rounds. Stats : kills, deaths, assists.' },
]

const etapes = [
  { couleur: 'violet', titre: '1. Les capitaines déclarent', texte: "Chaque capitaine saisit le score final et les stats de son équipe." },
  { couleur: 'bleu', titre: '2. Concordance ou litige', texte: 'Deux déclarations identiques valident le match. Sinon, il passe en litige.' },
  { couleur: 'orange', titre: '3. Le créateur arbitre', texte: 'Il fixe le score définitif. Le classement se recalcule automatiquement.' },
]

function Accueil() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="surtitre">Football · Basketball · EA Sports FC · Valorant</p>
          <h1>
            Organise ton tournoi. Chaque score est validé par{' '}
            <span className="accent">les deux capitaines.</span>
          </h1>
          <p className="texte-doux hero__texte">
            Crée un tournoi public ou privé, invite tes équipes, suis le classement en direct.
            Un litige ? Le créateur tranche. Gratuit, sans inscription payante.
          </p>
          <div className="hero__boutons">
            <Bouton to="/tournois/creer">Créer un tournoi</Bouton>
            <Bouton to="/tournois" variante="secondaire">Voir les tournois publics</Bouton>
          </div>
        </div>
        <FormulaireAuth />
      </section>

      <section className="section">
        <h2>Quatre disciplines, des règles propres à chacune</h2>
        <div className="grille-disciplines">
          {disciplines.map((d) => (
            <div key={d.nom} className="carte">
              <p className="surtitre">{d.type}</p>
              <h3>{d.nom}</h3>
              <p className="texte-doux">{d.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Comment un score devient officiel</h2>
        <div className="grille-etapes">
          {etapes.map((e) => (
            <div key={e.titre} className={`etape etape--${e.couleur}`}>
              <h3>{e.titre}</h3>
              <p className="texte-doux">{e.texte}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Accueil