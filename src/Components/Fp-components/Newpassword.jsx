import { useEffect } from "react";
import Input from "../Input";
import "../../Style/ForgetPassword.css";
import { CgPassword } from "react-icons/cg";
import { useState } from "react";
import { VscLaw } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Newpassword({errorfunction ,  email , page, setisloading , setpage , goback}){

    const navigate = useNavigate();
    const [password , setpassword] = useState({
        fpNewPassword : "",
        fpconfirmNewPassword : ""
    });
    const [isdisabled , setisdisabled] = useState(false);
    const [error , seterror] = useState({
        NewPassword : "",
        confirmNewPassword : "" 
    });
    const [showpassword , setshowpassword] = useState({
        NewPassword : false,
        confirmNewPassword : false
    });

    const handleAuthpassword = (value)=>{
        const condition = [
            {test:/[a-z]/.test(value) , message : "please add atleast 1 lowercase"},
            {test:/[A-Z]/.test(value) , message : "please add atleast 1 uppercase"},
            {test:/[0-9]/.test(value) , message : "please add atleast 1 Number"},
            {test:/[!@#$%^&*()?<>]/.test(value) , message : "please add atleast 1 special character"},
            {test : value.length > 8 , message : "password must be 8 character long"}
        ];    
        const findcondition = condition.find(condition => !condition.test);
        if(findcondition && value.length != 0){
            seterror( 
                data =>({
                ...data , 
                NewPassword : findcondition.message,
            })
            );
            setisdisabled(true);
            return;
        }
        seterror(
            data =>({
                ...data , 
                NewPassword : "",
            })
        );
        setisdisabled(false);
    }

    const handleconfirmpassword = (value) =>{
        if(password.fpNewPassword !== value && value.length !== 0){
            seterror((data)=>({
                    ...data ,
                    confirmNewPassword : "Password Do Not Match"
            }));
            setisdisabled(true);
            return;
        }

        seterror((data)=>({
            ...data ,
            confirmNewPassword : ""
        }));
        setisdisabled(false);
    }

    const handlepasswordInput = (event) =>{
        const {id , value} = event.target;
        setpassword((data)=>({
            ...data ,
            [id] : value 
        }));

        if(id === "fpNewPassword"){
            handleAuthpassword(value);
        }
    }

    const handlePassowordSave = async()=>{
        try {
            setisloading(true);
            const url = "auth/ChangePassword";
            const response = await axios.post(url , {
                password : password.fpNewPassword,
                email : email,
            });
            if(response.data.success === true){
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorfunction(errorMessage);
        }finally{
            setisloading(false);
        }
    }

useEffect(() => {
    if (
        password.fpconfirmNewPassword &&
        password.fpNewPassword !== password.fpconfirmNewPassword
    ) {
        seterror((prev) => ({
            ...prev,
            confirmNewPassword: "Passwords do not match"
        }));
    } else {
        seterror((prev) => ({
            ...prev,
            confirmNewPassword: ""
        }));
    }
}, [password.fpNewPassword, password.fpconfirmNewPassword]);

    return(
        <>
        <div className="fp-newpassword-container">
            <div className="fp-newpassword">
                <label htmlFor="fpNewPassword">Enter New Password</label>
                <Input type={showpassword.NewPassword ? "text" : "password"} placeholder={"Enter New Password"} id={"fpNewPassword"} inputclass={"fp-newpassword-input"} value={password.fpNewPassword} data={(event)=>handlepasswordInput(event)}/>
                <p className="showpass" onClick={()=> setshowpassword((data)=>({...data,NewPassword : !data.NewPassword}))}>{showpassword.NewPassword ? "Hide" : "Show"}</p>
                 {
                    error.NewPassword !== "" &&
                    <p className="errormsg">{error.NewPassword}</p> 
                }
            </div>
            <div className="fp-confirm-newpassword">
                <label htmlFor="fpconfirmNewPassword">Enter New Confirm Password</label>
                <Input type={showpassword.confirmNewPassword ? "text" : "password" } placeholder={"Confirm New Password"} id={"fpconfirmNewPassword"} inputclass={"fp-confirm-newpassword-input"} value={password.fpconfirmNewPassword} data={(event)=>handlepasswordInput(event)}/>
                <p className="showpass" onClick={()=> setshowpassword((data)=>({...data , confirmNewPassword : !data.confirmNewPassword}))}>{showpassword.confirmNewPassword ? "Hide" : "Show"}</p>
                {
                    error.confirmNewPassword !== "" &&
                    <p className="errormsg">{error.confirmNewPassword}</p> 
                }
            </div>
            <div className="fp-password-confirm-btn-container">
                <button className="fp-confirm-btn" disabled={isdisabled} onClick={handlePassowordSave}>Confirm</button>
                <button className="backbtn" onClick={goback}><span><IoIosArrowRoundBack/></span>back</button>
            </div>
        </div>
        </>
    )
}