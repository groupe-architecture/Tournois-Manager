// Carte du score final d'un match validé (figure 17).
function ResultatMatch({ equipeA, equipeB, resultat }) {
  const { scoreA, scoreB, courtA, courtB, issueA, issueB } = resultat

  return (
    <section className="carte resultat-match">
      <div className="resultat-match__equipe">
        <strong>{equipeA}</strong>
        <span className="resultat-match__issue resultat-match__issue--victoire">{issueA}</span>
      </div>

      <div className="resultat-match__score">
        <div>
          <span className="resultat-match__chiffre">{scoreA}</span>
          <span className="resultat-match__court">{courtA}</span>
        </div>
        <span className="resultat-match__tiret">-</span>
        <div>
          <span className="resultat-match__chiffre">{scoreB}</span>
          <span className="resultat-match__court">{courtB}</span>
        </div>
      </div>

      <div className="resultat-match__equipe resultat-match__equipe--droite">
        <strong>{equipeB}</strong>
        <span className="resultat-match__issue">{issueB}</span>
      </div>
    </section>
  )
}

export default ResultatMatch
