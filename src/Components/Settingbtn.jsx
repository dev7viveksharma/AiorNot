import "../Style/Settingbtn.css";
export default function Settingbtn({name ,icon , action , btnclass}){
    return(
        <>
            <button onClick={action} className ={btnclass} >
                <span className="settingsicon">{icon}</span>
                <span className="settingsname">{name}</span>
            </button>
        </>
    )
}