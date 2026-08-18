import "../../Style/Settingmenuoptions.css";
import Appearancetogglebtn from "../Ui components/Appearancetogglebtn";
export default function General(){
    return(
        <div className="general-component">
            <div className="general-heading">
                <h2>General</h2>
            </div>
            <div className="general-settings-container">
                <div className="menusettings-options-container">
                    <div className="option-name">
                        <p>Appearance</p>
                    </div>
                    <div className="option-action-container">
                        <div className="toggle">
                            <div className="togglebtn">
                                <Appearancetogglebtn/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menusettings-options-container">
                    <div className="option-name">
                        <p>Notification</p>
                    </div>
                    <div className="option-action-container">
                        <div className="toggle">
                            <div className="togglebtn">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}