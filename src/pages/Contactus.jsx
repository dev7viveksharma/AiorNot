import "../Style/Contactus.css";
import Settingbtn from "../Components/Settingbtn";
import Contactperson from "../Components/Contactperson";
import Emailus from "../Components/Emailus";
import Reportbug from "../Components/Reportbug";
import { useState , useRef , useEffect } from "react";
import axios from "axios";
import { GoBug } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
export default function Contactus(){
    const [info , setinfo] = useState({
        firstname : "",
        lastname : "",
        email : "",
    });
    const {popup , setpopup} = useOutletContext();
    const [contactactive , setcontactactive ] = useState("person");
    const [bgColor , setbgcolor] = useState("cornflowerblue");
    const handlecontact = (action) =>{
        setcontactactive(action);
    }

    const changecolor = (color)=>{
        setbgcolor(color);
    }


    useEffect(()=>{
        try {
            const getinfo = async() =>{
                const response = await axios.get("auth/Accountinfo",{withCredentials : true});
                if(response.data.success){
                    const name = response.data.name.split(" ");
                    setinfo((data)=>({
                        ...data ,  
                        firstname : name[0],
                        lastname : name[1],
                        email : response.data.email,
                        
                    }));
                }
            }
            getinfo();
            } catch (error) {
            console.log(error.message);
         }
    },[]);

    const contactcomponents =  {
        person : <Contactperson/>,
        email : <Emailus info={info} context={popup , setpopup}/>,
        reportbug : <Reportbug info={info} context={popup , setpopup}/>
    }
    return(
        <>
        <div className="contactUscontainer">
            <div className="team-info-section" style={{backgroundColor: bgColor}}>
                <div className="contactus-heading">
                    <h1>Contact Us</h1>
                </div>
                <div className="contact-msg">
                    <p>If you have any questions or want to report a bug via email, we’ll be happy to help and appreciate your feedback.</p>
                </div>
                <div className="contact-details">
                    <Settingbtn name={"Report Bug"} icon={<GoBug/>} action={()=>{handlecontact("reportbug"); changecolor("#DC4654");}} btnclass={"contactus-btn"} />
                    <Settingbtn name={"email us"} icon={<MdOutlineEmail/>} action={()=>{handlecontact("email"); changecolor("cornflowerblue")}} btnclass={"contactus-btn"}/>
                </div>
            </div>
            <div className="contact-section">
                {
                    contactcomponents[contactactive]
                }
            </div>
        </div>
        </>
    )
}