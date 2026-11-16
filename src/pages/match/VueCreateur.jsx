import { useState } from 'react'
import Message from '../../components/commun/Message'
import SaisieScore from '../../components/match/SaisieScore'
import EtatMatch from '../../components/match/EtatMatch'
import QuiPeutArbitrer from '../../components/match/QuiPeutArbitrer'
import { IconeAlerte } from '../../components/match/Icones'

// Vue du créateur qui arbitre un litige (figures 12 et 15).
// Il compare les deux déclarations puis fixe le score définitif.
// La validation est simulée : le match passe à « validé » seulement dans cette page.
function VueCreateur({ match, statut, onValider }) {
  const { arbitrage } = match
  const [score, setScore] = useState({ A: '', B: '' })
  const [retour, setRetour] = useState(null)
  const valide = statut === 'valide'

  // Affichage seulement : la vraie vérification sera faite par la couche service, puis par l'API.
  const nulRefuse = !match.nulAutorise && score.A !== '' && score.B !== '' && Number(score.A) === Number(score.B)

  function changerScore(cote, valeur) {
    setScore({ ...score, [cote]: valeur })
    setRetour(null)
  }

  function fixer() {
    if (score.A === '' || score.B === '') {
      setRetour({ type: 'erreur', texte: 'Saisis les deux scores avant de fixer le score définitif.' })
    } else if (!nulRefuse) {
      setRetour({ type: 'succes', texte: `Score définitif fixé : ${score.A} - ${score.B}. Le match est validé et les deux capitaines ont été notifiés.` })
      onValider()
    }
  }

  return (
    <div className="page-match__colonnes">
      <div className="page-match__principal">
        <section className="carte bloc-declaration bloc-declaration--orange">
          <h2 className="bloc-declaration__titre">Arbitrer le litige</h2>
          <p className="bloc-declaration__intro">{arbitrage.intro}</p>

          <div className="tableau-stats tableau-arbitrage">
            <table>
              <thead>
                <tr>
                  <th>Déclaré par</th>
                  {arbitrage.colonnes.map((colonne) => <th key={colonne}>{colonne}</th>)}
                  <th>Le</th>
                </tr>
              </thead>
              <tbody>
                {arbitrage.lignes.map((ligne) => (
                  <tr key={ligne.auteur}>
                    <td><strong>{ligne.auteur}</strong> · {ligne.role}</td>
                    {ligne.valeurs.map((cellule, index) => (
                      <td key={index} className={`tableau-arbitrage__valeur ${cellule.ecart ? 'tableau-arbitrage__valeur--ecart' : ''}`}>
                        {cellule.valeur}
                      </td>
                    ))}
                    <td>{ligne.heure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {arbitrage.ecart && <p className="bloc-declaration__alerte"><IconeAlerte /> {arbitrage.ecart}</p>}

          <div className="bloc-declaration__separation" />

          <h3 className="bloc-declaration__sous-titre bloc-declaration__sous-titre--score">Score définitif</h3>
          <SaisieScore
            labelA={arbitrage.labelA}
            labelB={arbitrage.labelB}
            valeurA={score.A}
            valeurB={score.B}
            onChange={changerScore}
            erreur={nulRefuse}
            desactive={valide}
            placeholder="—"
          />
          {nulRefuse && <p className="bloc-declaration__erreur"><IconeAlerte /> {match.messageNul}</p>}

          {retour && <Message type={retour.type}>{retour.texte}</Message>}

          <button className="bouton bouton--orange bouton--large bloc-declaration__bouton" onClick={fixer} disabled={valide}>
            Fixer le score définitif
          </button>
          <p className="bloc-declaration__aide bloc-declaration__aide--bas">{arbitrage.note}</p>
        </section>
      </div>

      <aside className="page-match__lateral">
        <EtatMatch etat={statut} />
        <QuiPeutArbitrer />
      </aside>
    </div>
  )
}

export default VueCreateur
