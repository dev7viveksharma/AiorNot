import { IoLogInOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import Input from "./Input";
import OrDivider from "./OrDivider";
import OauthBtn from "./OauthBtn";
import { useState } from "react";
export default function Login({userdata , setuserdata , authUser, useremailauthentication , userpasswordauthentication , email , password , serverError ,disablebtn , switchToSignup}){

        const inputvalue = (event) =>{
            const {id , value} = event.target;
            setuserdata(
                prev =>({
                    ...prev , 
                    [id] : value
                })
            );
            
            if(id === "userEmail"){
                useremailauthentication(value);
            }else{
                userpasswordauthentication(value);
            }
        }

        const handlelogincheckbox = (event)=>{
            const ischacked = event.target.checked;
            return setuserdata(
                prev=>(
                    {
                        ...prev,
                        rememberMe : ischacked
                    }
                )
            )
        } 

    return(
            <div className="logincontainer">
                <div className="loginHeadingContainer">
                    <div className="loginBlock">
                        <div className="exitdooricon">
                            <IoLogInOutline/>
                        </div>
                        <p>Login</p>
                    </div>
                </div>
                <div className="contentContainer">
                    <div className="credential-section">
                        <form onSubmit={(event)=>authUser(event)} className="loginform">
                            <label htmlFor="userEmail" className="loginlabel">Email Address</label>
                            <div className="inputcontainer">
                                <Input type={"email"} placeholder={"Enter Your Email Address"} id ={"userEmail"} inputclass={"logininput"} value={userdata.userEmail} data={inputvalue}/>
                                <p className="cardError">{email}</p>
                            </div>
                            <label htmlFor="userPassword" className="loginlabel">Password</label>
                            <div className="inputcontainer">
                                <Input type={"Password"} placeholder={"Enter Your Password"} id ={"userPassword"} inputclass={"logininput"} value={userdata.userPassword} data={inputvalue}/>
                                <p className="cardError">{password}</p>                                
                            </div>
                            <div className="otherFeatures">
                            <div className="coverupcontainer">
                                <input type="checkbox" id="remember" checked ={userdata.rememberMe} onChange={handlelogincheckbox}/>
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/ForgetPassword">Forget Password?</a>
                            </div>
                            <button className="loginbtn" disabled={disablebtn}>Login</button>
                            <p className="serverError">{serverError}</p>
                        </form>
                    </div>
                    <OrDivider/>    
                    <div className="Oauth-section">
                        <OauthBtn icon ={<FaGoogle/>} name={"Google"} />
                        <p className="noaccountmsg">Don't have an account yet? <a className="switchcard" onClick={switchToSignup}>Sign up</a></p>
                    </div>
                </div>
            </div>
    )
}