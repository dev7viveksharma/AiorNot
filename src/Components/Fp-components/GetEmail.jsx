import { useState } from "react";

import "../../Style/ForgetPassword.css";
import axios from "axios";
export default function GetEmail({errorfunction , setpage , email , setemail , setisloading}){
    const [isdisabled , setisdisabled] = useState(true);
    const [error , seterror] = useState(null);

    const  useremailauthentication = (event)=>{
        const value = event.target.value;
        setemail(value);
        
        const condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!condition.test(value)){
            seterror("Invalid Email");
            return;
        }
        seterror("");
        setisdisabled(false);
    }

    const verifyemail = async(event) =>{
        event.preventDefault();
        setisloading(true);
        const url = "auth/VerifyEmail";
        try {
            const response = await axios.post(url,{
                email : email
            });

            if(response.data.success){
                setpage("otp");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorfunction(errorMessage);
        }finally{
            setisloading(false);
        }
    }
    return(
        <>
        <div className="fp-getemail">
            <form action="" onSubmit={verifyemail} className="fp-emailform">
                 <div className="fp-container">
                    <label htmlFor="fp-email" className="fp-label">Enter Your Registered Email</label>
                    <input type="email" id="fp-email" placeholder="Enter Valid Email Address" value={email} onChange={useremailauthentication}/>
                    <p className="fp-error">{error}</p>
                 </div>
                <button className="fp-btn" disabled={isdisabled}>Next</button>
            </form>
        </div>
        </>
    )
}