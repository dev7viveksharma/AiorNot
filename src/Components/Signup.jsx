import { IoLogOutOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import Input from "./Input";
import OrDivider from "./OrDivider";
import OauthBtn from "./OauthBtn";


export default function Signup({userdata , setuserdata , insertuserdata , usernameauthentication , useremailauthentication , userpasswordauthentication , name , email , password , serverError ,disablebtn , switchToLogin}){
 
    
    const inputvalue = (event) =>{
        const {id , value} = event.target;
        setuserdata(
            prev =>({
                ...prev , 
                [id] : value
            })
        );
        
        if(id === "username"){
            usernameauthentication(value);
        }else if(id === "useremail"){
            useremailauthentication(value);
        }else{
            userpasswordauthentication(value);
        }
    }

    return(
        <div className="signupcontainer">
            <div className="signupHeadingContainer">
                <div className="signupBlock">
                    <div className="enterdooricon">
                        <IoLogOutOutline/>
                    </div>
                    <p>Sign Up</p>
                </div>
            </div>
            <div className="contentContainer">
                <div className="credential-section">
                    <form onSubmit={(event) => insertuserdata(event)} className="signupform">
                        <label htmlFor="username" className="signuplabel">User Name</label>
                        <div className="inputcontainer">
                            <Input type={"text"} placeholder={"Enter Your Valid Name"} id ={"username"} inputclass={"signupinput"} value = {userdata.username}  data = {inputvalue}/>
                            <p className="cardError">{
                                name
                            }</p>
                        </div>
                        <label htmlFor="useremail" className="signuplabel">Email Address</label>
                        <div className="inputcontainer">
                            <Input type={"email"} placeholder={"Enter Your Email Address"} id ={"useremail"} inputclass={"signupinput"} value = {userdata.useremail} data = {inputvalue}/>
                             <p className="cardError">{
                                email
                            }</p>
                        </div>
                        <label htmlFor="userpassword" className="signuplabel">Password</label>
                        <div className="inputcontainer">
                            <Input type={"Password"} placeholder={"Enter Your Password"} id ={"userpassword"} inputclass={"signupinput"} value = {userdata.userpassword} data = {inputvalue}/>
                             <p className="cardError">{
                                password
                            }</p>
                        </div>                        
                        <button className="signupbtn" disabled={disablebtn} >Create An Account</button>
                        <p className="serverError">{serverError}</p>
                    </form>
                </div>
                <OrDivider/>    
                <div className="Oauth-section">
                    <OauthBtn icon ={<FaGoogle/>} name={"Google"} />
                    <p className="noaccountmsg">Already have an account? <a className="switchcard" onClick={switchToLogin}>Login</a></p>
                </div>
            </div>
        </div>
    )
}