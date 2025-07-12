
const Notification = ({message, bool}) => {
    const style = bool? {color: "green"} : {color : "red"}
    if (!message) return <></>
    return (
        <div className="message" style={style}>{message}</div>
    )
}

export default Notification