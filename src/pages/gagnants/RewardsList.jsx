/**
 * Les trois distinctions individuelles sous le podium (figure 20).
 * @param {Array} distinctions - [{ titre, nom, detail }]
 */
export default function RewardsList({ distinctions = [] }) {
  return (
    <ul className="distinctions">
      {distinctions.map((distinction) => (
        <li key={distinction.titre} className="distinctions__carte">
          <p className="surtitre distinctions__titre">{distinction.titre}</p>
          <p className="distinctions__nom">{distinction.nom}</p>
          <p className="distinctions__detail">{distinction.detail}</p>
        </li>
      ))}
    </ul>
  );
}
