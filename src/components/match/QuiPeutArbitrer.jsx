// Bloc « Qui peut arbitrer ? » de la vue créateur (figures 12 et 15).
function QuiPeutArbitrer() {
  return (
    <section className="carte bloc-match">
      <h2 className="bloc-match__titre bloc-match__titre--petit">Qui peut arbitrer ?</h2>
      <p className="bloc-match__texte">
        Seul le créateur du tournoi tranche un litige, et jamais un match où joue une équipe dont il est
        membre. Dans ce cas, le litige se règle uniquement par correction des capitaines.
      </p>
    </section>
  )
}

export default QuiPeutArbitrer
