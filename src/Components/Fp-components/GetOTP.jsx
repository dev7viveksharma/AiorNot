import BoxInput from "../Ui components/BoxInput";
import { IoIosArrowRoundBack } from "react-icons/io";
import Timer from "../Ui components/Timer";
import "../../Style/ForgetPassword.css";
import { useRef, useState } from "react";
import axios from "axios";

export default function GetOTP({errorfunction ,setpage , page , email , setisloading , sethistory , goback}){
    const [timeout , settimeout] = useState(false);
    const [otp , setotp] = useState(["","","",""]);
    const [Time, setTime] = useState(300);
    const otpvalue = useRef([]);
    const otpLength = Array.from({length : 4});

    const handleOtpInput = async(event , index) =>{
        const value = event.target.value;
        const tempOtp = [...otp];
        tempOtp[index] = value;
        setotp(tempOtp);

        if(event.target.value.length === 1 && index < otpLength.length-1 ){
            otpvalue.current[index+1].focus();
        }

        if(index === otpLength.length - 1 && index != ""){
            try {
                setisloading(true);
                const updatedOtp = tempOtp.join("");
                const url = "auth/checkOTP";
                const response = await axios.post(url , {
                    otp : updatedOtp ,
                    email : email
                });
                if(response.data.success){
                    sethistory(prev =>{return [...prev , page]});
                    setpage("newpassword")
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                errorfunction(errorMessage);
            }finally{
                setisloading(false);
            }
        }
    }

    const handletime = () => {
        settimeout(true);
    }

    const handleresend = async()=>{
        try {
            setisloading(true);
            const url = "auth/ResendOTP";
            const response = await axios.post(url , {email : email});
            if(response.data.success){
                settimeout(false);
                setTime(300);
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
        <div className="fp-otp-container">
            <div className="fp-otp-banner">
                <div className="fp-lock-logo">
                    <img src="image/password.png"/>
                </div>
                <div className="fp-banner-text">
                    <h3>Verify OTP TO Proceed</h3>
                    <p>please check your Email</p>
                </div>
            </div>
            <div className="fp-otp-input-container">
                <div className="fp-otp-input">
                    {
                        otpLength.map((_,index)=>

                            <BoxInput key={index} num={(el)=>{otpvalue.current[index] = el}} handleOtpInput={(event)=>handleOtpInput(event , index)}/>
                        )
                    }
                </div>
                <div className="fp-timer-container">
                    <p>
                        <span>didn't get email?</span>{" "}
                        {
                            timeout ? 
                            (<a onClick={handleresend}>Resend</a>)
                            :
                            (<a>Resend</a>)
                        }
                        <Timer handletime={handletime} time={Time} setTime={setTime}/>
                    </p>
                    <button onClick={goback}><span><IoIosArrowRoundBack/></span>back</button>
                </div>
            </div>
        </div>
        </>
    )
}