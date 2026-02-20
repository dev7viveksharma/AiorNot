import '../Style/Panelbutton.css';

export default function Panelbutton({name , icon , action}){
    return(
        <>
        <button onClick={action} className="panelbtn">
            <span>{name}</span>
            <span>{icon}</span>
        </button>
        </>
    )
}