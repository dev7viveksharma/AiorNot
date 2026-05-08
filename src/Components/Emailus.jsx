import { useState } from "react";
import "../Style/Emailus.css";
import Input from "./Input";
export default function Emailus(){
    const [message , setmessage] = useState({
        firstname : "",
        lastname : "",
        email : "",
        message : ""
    });
    return(
        <div className="email-parent-container">
            <div className="email-container">
                <div className="contact-card">
                    <form action="" className="feedback-card-form">
                        <div className="username-section">
                            <div className="firstname-section">
                                <label htmlFor="firstname" className="contact-label">First Name</label>
                                <Input type={"text"} placeholder={"first name"} id={"firstname"} inputclass={"feedback-input"} value={message.firstname}/>
                            </div>
                            <div className="lastname-section">
                                <label htmlFor="lastname" className="contact-label">Last Name</label>
                                <Input type={"text"} placeholder={"last name"} id={"lastname"} inputclass={"feedback-input"} value={message.lastname}/>
                            </div>
                        </div>
                        <div className="contact-email-section">
                            <label htmlFor="user-contact-email" className="contact-label">Email Address</label>
                            <Input type={"email"} placeholder={"email address"} id={"user-contact-email"} inputclass={"feedback-input"} value={message.email}/>
                        </div>
                        <textarea name="user-message" className="user-feedback-message" value={message.message}></textarea>
                        <div className="feedback-submit-section">
                            <p><input type="checkbox" /> you agree to our <a href="#">terms </a>and <a href="#">privacy policy</a></p>
                            <button type="submit" className="contact-email-submitbtn">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}