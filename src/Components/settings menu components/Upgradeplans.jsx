import "../../Style/Settingmenuoptions.css";
export default function Upgradeplans(){
    return(
        <div className="Upgradeplans-component">
            <div className="Upgradeplans-heading">
                <h2>User plans & Services</h2>
            </div>
            <div className="Upgradeplans-settings-container">
                <div className="menusettings-options-container">
                    <div className="option-name">
                        <p>Account Type </p>
                    </div>
                    <div className="option-action-container">
                        <div className="toggle">
                            Basic
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}