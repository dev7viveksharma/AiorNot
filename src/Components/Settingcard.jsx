import "../Style/Settingcard.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Settingbtn from "./Settingbtn";
import General from "./settings menu components/General";
import Account from "./settings menu components/Account";
import Upgradeplans from "./settings menu components/Upgradeplans";
import Privacy from "./settings menu components/Privacy";
import Help from "./settings menu components/Help";
export default function Settingcard({opencard}){
    const alloptions = {
        General :<General/>,
        Account :<Account/>,
        Upgradeplans : <Upgradeplans/>,
        Privacy : <Privacy/>,
        Help : <Help/> 
    }

    const [menuoption , setmenuoption] = useState("General");
    
    const  handleclose =(event)=>{
            if( event.target === event.currentTarget){
                opencard(null);
            }
        }

    const handlemenuclick = (value) =>{
        setmenuoption(value);
    }
    return(
        <div className="settingsmenu-bg" onClick={handleclose} >
            <div className="setting-menu">
                <div className="card-sidemenu">
                    <div className="menu-backbtn">
                        <div className="menuclose-btn" onClick={()=>opencard(null)}>
                            <IoMdClose/>
                        </div>
                    </div>
                    <div className="menu-option">
                        <Settingbtn name={"General"} btnclass={"settingsmenubtn"} action={()=>handlemenuclick("General")}/>
                        <Settingbtn name={"Account"} btnclass={"settingsmenubtn"} action={()=>handlemenuclick("Account")}/>
                        <Settingbtn name={"Upgrade & plans"} btnclass={"settingsmenubtn"} action={()=>handlemenuclick("Upgradeplans")}/>
                        <Settingbtn name={"Privacy"} btnclass={"settingsmenubtn"} action={()=>handlemenuclick("Privacy")}/>
                        <Settingbtn name={"Help"} btnclass={"settingsmenubtn"} action={()=>handlemenuclick("Help")}/>
                    </div>
                </div>
                <div className="setting-option-detail">
                    {
                        alloptions[menuoption]
                    }
                </div>
            </div>
        </div>

    )
}