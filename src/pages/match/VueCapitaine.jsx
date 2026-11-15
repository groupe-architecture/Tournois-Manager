import { useState } from 'react'
import Message from '../../components/commun/Message'
import SaisieScore from '../../components/match/SaisieScore'
import TableauStats from '../../components/match/TableauStats'
import DeuxDeclarations from '../../components/match/DeuxDeclarations'
import EtatMatch from '../../components/match/EtatMatch'
import { IconeAlerte } from '../../components/match/Icones'

// Vue d'un capitaine (figures 11, 14, 19) : sa déclaration à gauche,
// la comparaison des déclarations et l'état du match à droite.
// L'envoi est simulé : rien ne part vers un serveur pour l'instant.
function VueCapitaine({ match, statut }) {
  const { capitaine } = match
  const [score, setScore] = useState({ A: capitaine.scoreA, B: capitaine.scoreB })
  const [champs, setChamps] = useState(capitaine.champsStats || [])
  const [retour, setRetour] = useState(null)

  // Affichage seulement : la vraie vérification sera faite par la couche service, puis par l'API.
  const nulRefuse = !match.nulAutorise && score.A !== '' && score.B !== '' && Number(score.A) === Number(score.B)

  function changerScore(cote, valeur) {
    setScore({ ...score, [cote]: valeur })
    setRetour(null)
  }

  function changerChamp(index, valeur) {
    setChamps(champs.map((champ, i) => (i === index ? { ...champ, valeur } : champ)))
    setRetour(null)
  }

  function envoyer() {
    if (score.A === '' || score.B === '') {
      setRetour({ type: 'erreur', texte: 'Saisis les deux scores avant de corriger ta déclaration.' })
    } else if (!nulRefuse) {
      setRetour({ type: 'succes', texte: `Déclaration corrigée : ${score.A} - ${score.B}. L'autre capitaine a été notifié.` })
    }
  }

  return (
    <div className="page-match__colonnes">
      <div className="page-match__principal">
        <section className="carte bloc-declaration">
          <h2 className="bloc-declaration__titre">{capitaine.titre}</h2>

          <SaisieScore
            labelA={capitaine.labelA}
            labelB={capitaine.labelB}
            valeurA={score.A}
            valeurB={score.B}
            onChange={changerScore}
            erreur={nulRefuse}
          />
          {nulRefuse && <p className="bloc-declaration__erreur"><IconeAlerte /> {match.messageNul}</p>}
          {capitaine.noteScore && !nulRefuse && <p className="bloc-declaration__note">{capitaine.noteScore}</p>}

          <h3 className="bloc-declaration__sous-titre">{capitaine.titreStats}</h3>
          {capitaine.sousTitreStats && <p className="bloc-declaration__note bloc-declaration__note--serree">{capitaine.sousTitreStats}</p>}

          {capitaine.stats && <TableauStats {...capitaine.stats} />}

          {champs.length > 0 && (
            <div className="champs-stats">
              {champs.map((champ, index) => (
                <label key={champ.label} className="champs-stats__champ">
                  <span>{champ.label}</span>
                  {champ.options ? (
                    <select value={champ.valeur} onChange={(e) => changerChamp(index, e.target.value)}>
                      {champ.options.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input inputMode="numeric" value={champ.valeur} onChange={(e) => changerChamp(index, e.target.value.replace(/\D/g, '').slice(0, 2))} />
                  )}
                </label>
              ))}
            </div>
          )}

          <p className="bloc-declaration__aide">{capitaine.aide}</p>

          {retour && <Message type={retour.type}>{retour.texte}</Message>}

          <button className="bouton bouton--principal bouton--large bloc-declaration__bouton" onClick={envoyer}>
            Corriger ma déclaration
          </button>
        </section>
      </div>

      <aside className="page-match__lateral">
        <DeuxDeclarations {...match.declarations} />
        <EtatMatch etat={statut} />
      </aside>
    </div>
  )
}

export default VueCapitaine
