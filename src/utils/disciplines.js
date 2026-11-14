// Description des disciplines pour l'affichage (textes des maquettes).
// Ce fichier ne calcule rien : les vraies règles de score seront appliquées par l'API.

export const TYPES = [
  { valeur: 'sport', titre: 'Sport' },
  { valeur: 'jeu_video', titre: 'Jeu vidéo' },
]

export const DISCIPLINES = [
  {
    valeur: 'foot',
    type: 'sport',
    titre: 'Football',
    description: '5v5 ou 11v11 · nul possible',
    modes: ['5v5', '11v11'],
    regles: ['Score en buts', 'Match nul possible', '3 pts la victoire, 1 le nul, 0 la défaite', 'Stats : buts, passes déc., cartons, clean sheets'],
  },
  {
    valeur: 'basket',
    type: 'sport',
    titre: 'Basketball',
    description: '3x3 ou 5x5 · pas de nul',
    modes: ['3x3', '5x5'],
    regles: ['Score en points', 'Pas de match nul', '2 pts la victoire, 1 la défaite', 'Stats : points, rebonds, passes'],
  },
  {
    valeur: 'fifa',
    type: 'jeu_video',
    titre: 'EA Sports FC',
    description: '1v1 ou Clubs · nul possible',
    modes: ['1v1', 'Clubs'],
    regles: ['Score en buts', 'Match nul possible', '3 pts la victoire, 1 le nul, 0 la défaite', 'Stats : buts, passes déc., cartons, clean sheets'],
  },
  {
    valeur: 'valorant',
    type: 'jeu_video',
    titre: 'Valorant',
    description: '5v5 ou 1v1 · premier à 13 rounds',
    modes: ['5v5', '1v1'],
    regles: ['Premier à 13 rounds gagne', 'Pas de match nul', '1 pt la victoire, 0 la défaite', 'Stats : kills, deaths, assists'],
  },
]

export const VISIBILITES = [
  { valeur: 'public', titre: 'Public', description: 'Tout joueur connecté peut rejoindre.' },
  { valeur: 'prive', titre: 'Privé', description: 'Accès avec un code de 8 caractères.' },
]

export const FORMATS = [
  { valeur: 'championnat', titre: 'Championnat', description: 'Tout le monde rencontre tout le monde.' },
  { valeur: 'coupe', titre: 'Coupe', description: 'Élimination directe.' },
]

// Renvoie les disciplines d'un type ('sport' ou 'jeu_video').
export function disciplinesDuType(type) {
  return DISCIPLINES.filter((discipline) => discipline.type === type)
}

// Renvoie la description complète d'une discipline à partir de sa valeur.
export function trouverDiscipline(valeur) {
  return DISCIPLINES.find((discipline) => discipline.valeur === valeur)
}
