import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./Popmessage.css";
export default function Popmessage({message , icon , onclose , type}){
    useEffect(()=>{
        const closeup = setTimeout(() => {
            onclose();
        }, 3000)

        return () => clearTimeout(closeup);
        },[])
    return(
        <div className="popup-message-bg" >
            <div className="popup-message-container">
                <div className="popup-content">
                    <p className={`popup-icon ${type}`}>{icon}</p>
                    <p className="popup-message">{message}</p>
                </div>
                <div className={`popup-line ${type}`}></div>
            </div>
        </div>
    )
}