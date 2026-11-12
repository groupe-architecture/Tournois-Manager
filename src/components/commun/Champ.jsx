function Champ({ label, id , type = 'text', placeholder, ...reste}) {
    return (
        <div className="champ">
            <label htmlFor={id}>{label}</label>
            <input  id={id} name={id} type={type} placeholder={placeholder} {...reste} />
        </div>
    )
}
export default Champ