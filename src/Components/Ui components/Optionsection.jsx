import { RiArrowRightSLine } from "react-icons/ri";

export default function Optionsection({name , data , action}){
    return(
    <div className="All-settings-container">
        <div className="menusettings-options-container">
            <div className="option-name">
                <p>{name}</p>
            </div>
            <div className="option-action-container">
                <div className="toggle">
                     <div className="toggledata">
                        {data}
                    </div>
                    <a onClick={action} className="menu-actionarrow"><RiArrowRightSLine/></a>
                </div>
            </div>
        </div>
    </div>
    )
}