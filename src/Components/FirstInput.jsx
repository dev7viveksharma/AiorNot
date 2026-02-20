import React , { forwardRef } from "react";
import { ImBoxAdd } from "react-icons/im";
import '../Style/FirstInput.css';
export default function FirstInput({action ,  ref , Filetype}){
    return(
        <div className="Fileinputcontainer">
            <label htmlFor="fileinput" className="circularbtn">
                <ImBoxAdd/>
                <input type="file" id="fileinput" accept={Filetype} className="inputtaker"  onChange={action} ref={ref}/>
        </label>
        </div>
    )
}