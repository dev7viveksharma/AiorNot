import { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import "./Collapsable.css";
export default function Collapsable({result}){
    const [isopen , setisopen] = useState(false);
    const content = useRef(null);
    const opendetails = () =>{
        setisopen(!isopen);
    }

    return(
        <div className="moredetails-menu">
            <div className="collapsingbtn" onClick={opendetails}>
                <p>more Info</p>
                <div className="details-droparrow">
                    <FaAngleDown/>
                </div>
            </div>
            <div className="information-container" style={{
                                                                    maxHeight: isopen
                                                                    ? content.current?.scrollHeight + "px"
                                                                    : "0px",
                                                                    display : "flex",
                                                                    overflow: "auto",
                                                                    transition: "max-height 0.3s ease",
                                                                    border : isopen ?"1px solid black" : "none"
            }}>
                {
                    result(content)
                }
            </div>
        </div>
    )
}