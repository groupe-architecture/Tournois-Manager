import ResultatMatch from '../../components/match/ResultatMatch'
import TableauStats from '../../components/match/TableauStats'
import DeuxDeclarations from '../../components/match/DeuxDeclarations'
import EtatMatch from '../../components/match/EtatMatch'

// Page d'un match validé (figure 17) : le score final, les statistiques des deux équipes,
// les deux déclarations identiques et l'état du match. Plus rien n'est modifiable.
function VueValide({ match }) {
  return (
    <div className="page-match__colonnes">
      <div className="page-match__principal">
        <ResultatMatch equipeA={match.equipeA} equipeB={match.equipeB} resultat={match.resultat} />

        {match.equipes.map((equipe) => (
          <section key={equipe.nom} className="carte bloc-equipe">
            <div className="bloc-equipe__tete">
              <h2>{equipe.nom}</h2>
              <span>{equipe.declarePar}</span>
            </div>
            <TableauStats {...equipe.stats} />
          </section>
        ))}
      </div>

      <aside className="page-match__lateral">
        <DeuxDeclarations {...match.declarations} />
        <EtatMatch etat="valide" />
      </aside>
    </div>
  )
}

export default VueValide
