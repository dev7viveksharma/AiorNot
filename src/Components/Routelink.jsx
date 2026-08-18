import { NavLink } from "react-router-dom";
import '../Style/Routelink.css';
export default function Routelink({route , name}){
    return(
        <>
        <NavLink to={route} className={({isActive})=>isActive ? "headerlinks Active" : "headerlinks"}>
            {name}
        </NavLink>
        </>
    )
}