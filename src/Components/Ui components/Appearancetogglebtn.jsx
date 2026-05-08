import "./Appearancetogglebtn.css";
export default function Appearancetogglebtn(){
    return(
        <div className="Appearance-toggle-switch">
            <label className="switch-label">
            <input type="checkbox" className="checkbox" defaultChecked/>
            <span className="slider"></span>
            </label>
        </div>  
    )
}