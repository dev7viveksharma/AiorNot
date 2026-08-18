import { IoClose } from "react-icons/io5";
import axios from "axios";
import Login from "./Login";
import Signup from "./Signup";
import "../Style/Logincard.css";
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
export default function Logincard({card}){
    const queryClient = useQueryClient();
    const {setislogin} = useAuth();
    const [userdata , setuserdata] = useState({
        username : "",
        useremail : "",
        userpassword : "",
    });

    const [loginuserdata , setloginuserdata] = useState({
            userEmail : "",
            userPassword : "",
            rememberMe : false
        });
    const [error , seterror] = useState({
        name : "",
        email : "",
        password : ""
    });
    const [serverError , setserverError] = useState("");


    const [isdisabled , setisdisabled] = useState(false);

    const [showLogin, setShowLogin] = useState(true);

    const insertdata = async (event) =>{
        event.preventDefault();
        try {
            const url = '/auth/signup';
            const response = await axios.post(url ,{
                name : userdata.username , email : userdata.useremail , password : userdata.userpassword
            });

            if(response.data.success){
                setShowLogin(true);
                setloginuserdata(
                    prev=>(
                        {
                            ...prev , 
                            userEmail : response.data.email 
                        }
                    )
                )
            }
        } catch (error) {
            if (error.response) {
                console.log("Error:", error.response.data.message); // server responded with error
                setserverError(error.response.data.message);

            } else {
                console.log("Error:", error.message); // other errors (network etc.)
                
            }
        }
    }

    const authUser = async(event)=>{
        event.preventDefault();
        try {
            const url = '/auth/login';
            const response = await axios.post(url,{
                    email : loginuserdata.userEmail,
                    password : loginuserdata.userPassword,
                    rememberMe : loginuserdata.rememberMe
            });

            if(response.data.success){
                console.log("logged in");
                card();
                setislogin(response.data.islogin);
                queryClient.invalidateQueries({
                    queryKey : ["authentication"]
                })
            }
        } catch (error) {
            if (error.response){
                console.log("Error:", error.response.data.message); // server responded with error
                setserverError(error.response.data.message);
            } else {
                console.log("Error:", error.message); // other errors (network etc.)  
            }
        }
    }

    const usernameauthentication = (value)=> {
            const condition = /^[A-Za-z\s]+$/;
            if(!condition.test(value) && value.length != 0){
                seterror( 
                    data =>({
                    ...data , 
                    name : "Invalid Name",
                })
                );
                setisdisabled(true);
                return;
            }
            seterror(
                data =>({
                    ...data , 
                    name : "",
                })
            );
            setisdisabled(false);
        }

    const  useremailauthentication = (value)=>{
        const condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!condition.test(value) && value.length != 0){
            seterror( 
                data =>({
                ...data , 
                email : "Invalid email",
            })
            );
            setisdisabled(true);
            return;
        }
        seterror(
            data =>({
                ...data , 
                email : "",
            })
        );
        setisdisabled(false);
    }

    const userpasswordauthentication = (value)=>{
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
                password : findcondition.message,
            })
            );
            setisdisabled(true);
            return;
        }
        seterror(
            data =>({
                ...data , 
                password : "",
            })
        );
        setisdisabled(false);
    }
    return(
        <div className="usercard">
            <div className="crossContainer">
                <div className="crossicon" onClick={card}>
                    <IoClose/>
                </div>
            </div>
            {showLogin ?(
            <Login userdata ={loginuserdata} setuserdata={setloginuserdata} authUser={authUser} useremailauthentication={useremailauthentication} userpasswordauthentication={userpasswordauthentication} email={error.email} password={error.password} serverError={serverError} disablebtn={isdisabled} switchToSignup={()=>setShowLogin(false)}/>
            ):(
            <Signup userdata={userdata} setuserdata={setuserdata} insertuserdata={insertdata} usernameauthentication={usernameauthentication} useremailauthentication={useremailauthentication} userpasswordauthentication={userpasswordauthentication} name ={error.name} email={error.email} password={error.password} serverError={serverError} disablebtn={isdisabled} switchToLogin={()=>setShowLogin(true)}  />
            )}</div>
    )
}