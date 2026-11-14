function Message ( { type = 'succes', children}) {
    return <div className={`message message--${type}`} role="alert">
        {children}
        </div>
}
export default Message