import { NavLink, useNavigate } from "react-router-dom";
export default function Link({heading , links}){
    const navigate = useNavigate();
    const handleredirect = (link)=>{
        navigate(link);
    }
    return(
        <>
        <div className="links">
            <h4>{heading}</h4>
            {
               links.map((list , index)=>
                <NavLink to={list.link} key={index} onClick={()=>handleredirect(list.link)}>
                    <p>{list.name}</p>
                </NavLink>
               ) 
            }
        </div>
        </>
    )
}