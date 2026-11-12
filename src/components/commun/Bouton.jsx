import { Link } from 'react-router-dom'

function Bouton({ children , variante = 'principale', to , large = false, ...reste})  {
    const classes = `bouton  bouton--${variante} ${large ? 'bouton--large' : ''}`
    if (to) {
        return <Link to={to} className={classes} {...reste}>{children}</Link>
    }
    return <button className={classes} {...reste}>{children}</button>
} 
export default Bouton