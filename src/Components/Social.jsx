import { NavLink } from "react-router-dom"
export default function Social({route}){
    return(
        <>
        <div className="socialcontainer">
            <NavLink>{route}</NavLink>
        </div>
        </>
    )
}