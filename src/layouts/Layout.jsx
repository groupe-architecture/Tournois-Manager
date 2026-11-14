import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Navbar />
      <main className="conteneur" style={{ paddingTop: 'var(--espace-6)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout