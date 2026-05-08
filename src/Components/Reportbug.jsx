import "../Style/Reportbug.css";
import Input from "./Input";
export default function Reportbug(){
    return(
        <div className="bug-report-parent-container">
            <div className="report-bug-container">
                <div className="reportbug-card">
                    <h2 className="report-card-heading">F🔍und a Bug ? </h2>
                    <form action="" className="reportbug-form">
                        <div className="username-report-section">
                            <div className="firstname-section">
                                <label htmlFor="firstname" className="contact-label">First Name</label>
                                <Input type={"text"} placeholder={"first name"} id={"firstname"} inputclass={"feedback-input report-input"} />
                            </div>
                            <div className="lastname-section">
                                <label htmlFor="lastname" className="contact-label">Last Name</label>
                                <Input type={"text"} placeholder={"last name"} id={"lastname"} inputclass={"feedback-input report-input"}/>
                            </div>
                        </div>
                        <div className="user-report-email-section">
                            <label htmlFor="reportmail" className="contact-label">Email Address</label>
                            <Input type={"email"} placeholder={"email address"} id={"reportmail"} inputclass={"feedback-input report-input"}/>
            
                        </div>
                        <div className="report-description-section">
                            <div className="bug-type-section">
                                <label for="bugType" className="contact-label">Bug Type</label>
                                <select id="bugType" name="bugType" className="feedback-input report-input" required>
                                    <option value="" disabled selected>Select bug type</option>
                                    <option value="not-working">Something isn't working</option>
                                    <option value="incorrect-result">Incorrect result</option>
                                    <option value="upload-problem">Upload problem</option>
                                    <option value="performance">Slow or performance issue</option>
                                    <option value="ui-layout">UI / layout problem</option>
                                    <option value="error-crash">Error message or crash</option>
                                    <option value="security">Security or privacy concern</option>
                                    <option value="other">Other issue</option>
                                </select>
                            </div>
                            <div className="bug-level-section">
                                <label htmlFor="buglvl" className="contact-label">Bug Level</label>
                                <select value="" id="buglvl" className="feedback-input report-input" required>
                                    <option name="" id="">select bug level</option>
                                    <option name="" id="">Low</option>
                                    <option name="" id="">Moderate</option>
                                    <option name="" id="">High</option>
                                    <option name="" id="">Severe</option>
                                </select>
                            </div>
                        </div>
                        <div className="bug-file-section">
                            <label htmlFor="bug-file">Add a Visual Bug Proof</label>
                            <input type="file" className="bug-file-input " accept="image/*,video/*"/>
                        </div>
                         <div className="bug-description-section">
                            <label htmlFor="bug-description" className="contact-label">Describe Bug </label>
                            <textarea name="" id="bug-description" className="bugreport-textarea"></textarea>
                        </div>
                        <div className="report-submit-section">
                            <p><input type="checkbox" /> you agree to our <a href="#">terms </a>and <a href="#">privacy policy</a></p>
                            <button type="submit" className="report-submitbtn ">Send</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}