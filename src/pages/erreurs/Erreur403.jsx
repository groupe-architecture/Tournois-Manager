import Bouton from '../../components/commun/Bouton'

function Erreur403() {
  return (
    <section className="erreur">
      <p className="surtitre">Erreur 403</p>
      <h1>Accès refusé</h1>
      <p className="texte-doux">Tu n'as pas le droit de voir cette page.</p>
      <Bouton to="/">Retour à l'accueil</Bouton>
    </section>
  )
}

export default Erreur403