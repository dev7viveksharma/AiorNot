import { useState } from "react";
import Faq from "../Faq";
import HelpFAQ from "../../../Data/HelpFAQ.json";
import "../../Style/Settingmenuoptions.css";
export default function Help(){
    const [faq , setfaq ] = useState(HelpFAQ);
    const [isopen , setisopen] = useState(false);

    const dropdown=()=>{
        setisopen(!isopen);
    }
    return(
        <div className="Help-component">
            <div className="Help-heading">
                <h2>Help</h2>
            </div>
            { faq.map((data)=>(
                <div className="Help-settings-container" key={data.id}>
                <Faq answer={data.answer} question={data.question}/>
                {/*     <div className="menusettings-options-container help-faq-container">
                        <div className="option-name">
                             <p className="help-question">{data.question}</p>
                             {isopen &&
                             <p className="help-answer">{data.answer}</p>
                             }
                         </div>
                         <div className="option-action-container">
                             <div className="toggle">
                                 <span onClick={dropdown}>{isopen ? <IoIosArrowUp/>:<IoIosArrowDown/>}</span>                                
                             </div>
                        </div>
                        </div> */}
                </div>
            ))}
        </div>
    )
}