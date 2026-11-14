import { useState } from 'react'
import CarteTournoi from '../../components/tournoi/CarteTournoi'
import PanneauCodePrive from '../../components/tournoi/PanneauCodePrive'

// Valeurs d'exemple en dur (celles de la figure 4).
// Elles seront remplacées par les données de l'API.
const tournoisExemple = [
  { id: 1, discipline: 'Football', mode: '5v5', nom: 'Coupe de la Résidence', format: 'Coupe à élimination directe', createur: 'MaPseudo', unite: 'Équipes', inscrits: 6, max: 8, estLeMien: true },
  { id: 2, discipline: 'Valorant', mode: '5v5', nom: 'Open ECE Valorant', format: 'Championnat', createur: 'ECE_Gaming', unite: 'Équipes', inscrits: 9, max: 16, estLeMien: false },
  { id: 3, discipline: 'Basketball', mode: '3x3', nom: 'Playground 3x3', format: 'Championnat', createur: 'BDE_Sport', unite: 'Équipes', inscrits: 4, max: 6, estLeMien: false },
  { id: 4, discipline: 'EA Sports FC', mode: '1v1', nom: 'Duel FC du vendredi', format: 'Coupe à élimination directe', createur: 'MaPseudo', unite: 'Joueurs', inscrits: 8, max: 8, estLeMien: true },
]

// Les boutons de filtre, dans l'ordre de la maquette.
const filtres = ['Toutes', 'Football', 'Basketball', 'EA Sports FC', 'Valorant']

function ListeTournois() {
  // L'état : le filtre actuellement choisi. Quand il change, React réaffiche la page.
  const [filtreActif, setFiltreActif] = useState('Toutes')

  // La liste affichée se déduit de l'état : on ne la stocke pas à part.
  const tournoisAffiches = filtreActif === 'Toutes'
    ? tournoisExemple
    : tournoisExemple.filter((tournoi) => tournoi.discipline === filtreActif)

  return (
    <>
      <h1 className="liste-tournois__titre">Tournois ouverts aux inscriptions</h1>
      <p className="texte-doux liste-tournois__intro">
        Rejoins un tournoi public en un clic, ou saisis un code d'accès pour un tournoi privé.
      </p>

      {/* Deux colonnes : les tournois à gauche, le panneau du code privé à droite. */}
      <div className="liste-tournois__colonnes">
        <section>
          <div className="filtres" role="group" aria-label="Filtrer par discipline">
            {filtres.map((filtre) => (
              <button
                key={filtre}
                type="button"
                className={`filtre ${filtre === filtreActif ? 'filtre--actif' : ''}`}
                aria-pressed={filtre === filtreActif}
                onClick={() => setFiltreActif(filtre)}
              >
                {filtre}
              </button>
            ))}
          </div>

          {tournoisAffiches.length > 0 ? (
            <div className="liste-tournois__grille">
              {tournoisAffiches.map((tournoi) => (
                <CarteTournoi key={tournoi.id} tournoi={tournoi} />
              ))}
            </div>
          ) : (
            <p className="texte-doux">Aucun tournoi ouvert dans cette discipline pour le moment.</p>
          )}
        </section>

        <PanneauCodePrive />
      </div>
    </>
  )
}

export default ListeTournois
