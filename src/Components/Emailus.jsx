import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import Popmessage from "../Components/Ui components/Popmessage";
import { useOutletContext } from "react-router-dom";
import { BiErrorAlt } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import CircularLoader from "./Loaders/CircularLoader";
import "../Style/Emailus.css";
export default function Emailus({info}){
    const {popup , setpopup} = useOutletContext();
    const [isloading , setisloading] = useState(false);
    const [message , setmessage] = useState({
        firstname : info.firstname,
        lastname : info.lastname,
        usercontactemail : info.email,
        contactmessage : "",
        AgreeTC : false
    });

    const storeinfo = (event) =>{
        const {id , value} = event.target;
        setmessage((data)=>({
            ...data , 
            [id] : value
        }));
    }

    const sendEmail = async(event) =>{
        event.preventDefault();
        setisloading(true);
        try {
            const url = 'report/ContactMessage';
            const response = await axios.post(url , {message : message } , {credentials : true})
            if(response.data.success){
                setpopup((prev)=>({
                    ...prev , 
                    show : true,
                    message : response.data.message,
                    icon : <HiBadgeCheck/>,
                    type : "success"
                }));
            }
        } catch (error) {
              const errorMessage = error.response?.data?.message || error.message;
                       setpopup(prev => ({
                        ...prev,
                        show: true,
                        message : errorMessage ,
                        icon : <BiErrorAlt/>,
                        type : "error"
                        }));
                console.log(errorMessage);
        }finally{
            setisloading(false);
        }
    }


    return(
        <div className="email-parent-container">
            {
                popup.show &&
                <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>

            }
            <div className="email-container">
                <div className="contact-card">
                    <form action="" className="feedback-card-form" onSubmit={sendEmail}>
                        <div className="username-section">
                            <div className="firstname-section">
                                <label htmlFor="firstname" className="contact-label">First Name</label>
                                <Input type={"text"} placeholder={"first name"} id={"firstname"} inputclass={"feedback-input"} value={message.firstname} data={storeinfo} readOnly={true}/>
                            </div>
                            <div className="lastname-section">
                                <label htmlFor="lastname" className="contact-label">Last Name</label>
                                <Input type={"text"} placeholder={"last name"} id={"lastname"} inputclass={"feedback-input"} value={message.lastname} data={storeinfo} readOnly={true}/>
                            </div>
                        </div>
                        <div className="contact-email-section">
                            <label htmlFor="usercontactemail" className="contact-label">Email Address</label>
                            <Input type={"email"} placeholder={"email address"} id={"usercontactemail"} inputclass={"feedback-input"} value={message.usercontactemail} data={storeinfo} readOnly={true}/>
                        </div>
                        <textarea name="user-message" className="user-feedback-message" value={message.message} id="contactmessage" onChange={storeinfo}></textarea>
                        <div className="feedback-submit-section">
                            <p><input type="checkbox"  id="AgreeTC" onChange={(event)=>{setmessage((data)=>({...data , AgreeTC : event.target.checked}))}}/> you agree to our <a href="#">terms </a>and <a href="#">privacy policy</a></p>
                            <button type="submit" className="contact-email-submitbtn" disabled={message.AgreeTC && message.contactmessage.length != 0 && !isloading ? false : true}>{ isloading ? <CircularLoader/> : "Send"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}