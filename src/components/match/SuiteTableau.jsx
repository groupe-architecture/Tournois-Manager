// « Suite du tableau » sous les matchs d'une coupe (figure 10) :
// les prochains tours, avec les équipes déjà qualifiées en gras.
function SuiteTableau({ rencontres, note }) {
  return (
    <section className="suite-tableau">
      <h2>Suite du tableau</h2>

      <div className="suite-tableau__cartes">
        {rencontres.map((rencontre) => (
          <div key={rencontre.titre} className="suite-tableau__carte">
            <p className="surtitre">{rencontre.titre}</p>
            {rencontre.lignes.map((ligne) => (
              <p key={ligne.texte} className={ligne.fort ? 'suite-tableau__equipe' : 'suite-tableau__texte'}>
                {ligne.texte}
              </p>
            ))}
          </div>
        ))}
      </div>

      {note && <p className="suite-tableau__note">{note}</p>}
    </section>
  )
}

export default SuiteTableau
