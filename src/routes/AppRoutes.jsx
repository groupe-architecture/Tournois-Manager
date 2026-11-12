import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'

import Accueil from '../pages/accueil/Accueil'
import Profil from '../pages/profil/Profil'
import Erreur403 from '../pages/erreurs/Erreur403'
import Erreur404 from '../pages/erreurs/Erreur404'


function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/profil" element={<Profil />} />


        <Route path="/403" element={<Erreur403 />} />
        <Route path="*" element={<Erreur404 />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes