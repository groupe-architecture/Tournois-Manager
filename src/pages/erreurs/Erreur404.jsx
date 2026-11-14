import Bouton from '../../components/commun/Bouton'

function Erreur404() {
  return (
    <section className="erreur">
      <p className="surtitre">Erreur 404</p>
      <h1>Page introuvable</h1>
      <p className="texte-doux">Cette page n'existe pas ou a été déplacée.</p>
      <Bouton to="/">Retour à l'accueil</Bouton>
    </section>
  )
}

export default Erreur404