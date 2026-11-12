import { useState } from 'react'

function PanneauNotifications({ notifications }) {
  const [ouvert, setOuvert] = useState(false)
  const nonLues = notifications.filter((n) => !n.lue).length

  return (
    <div className="menu-wrapper">
      <button className="cloche" onClick={() => setOuvert(!ouvert)} aria-label="Notifications">
        🔔
        {nonLues > 0 && <span className="cloche__compteur">{nonLues}</span>}
      </button>

      {ouvert && (
        <div className="menu-deroulant notifs">
          <div className="notifs__tete">
            <span>Notifications</span>
            <button>Tout marquer comme lu</button>
          </div>
          {notifications.map((n) => (
            <div key={n.id} className={`notif notif--${n.couleur} ${n.lue ? 'notif--lue' : ''}`}>
              <div className="notif__titre">{n.titre}</div>
              <div>{n.texte}</div>
              <div className="notif__temps">{n.temps}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PanneauNotifications