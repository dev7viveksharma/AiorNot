import { useNavigate } from "react-router-dom";
import "../Style/Button.css";
export default function Button({values , icons , route}){
    const navigate = useNavigate();
    const handleclick = () =>{
        navigate(route);
    }
    return(
        <button className="btn" onClick={handleclick}>
            <span className="text-span">{values}</span>
            <span className="icon-span">{icons}</span>
        </button>
    )
}