import { useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../layout/Footer";
import Popmessage from "../Components/Ui components/Popmessage";
import GetEmail from "../Components/Fp-components/GetEmail";
import GetOTP from "../Components/Fp-components/GetOTP";
import Newpassword from "../Components/Fp-components/Newpassword";
import { LuMailX } from "react-icons/lu";
import PageLoading from "../Components/PageLoading"
import "../Style/ForgetPassword.css";
export default function ForgetPassword(){
    const [isloading , setisloading] = useState(false);
    const [popup , setpopup] = useState(false);
    const [errormsg , seterrormsg] = useState(null);
    const [pageoptions , setpageoptions] = useState("email");
    const [email , setemail] = useState("");

    const errorfunction = (message) =>{
        seterrormsg(message);
        setpopup(true);
    }

    const page = {
        email : <GetEmail errorfunction = {errorfunction} setpage={setpageoptions} email={email} setemail={setemail} setisloading={setisloading}/>,
        otp : <GetOTP errorfunction = {errorfunction} setpage={setpageoptions} email={email} setisloading={setisloading}/>,
        newpassword : <Newpassword errorfunction = {errorfunction} email={email} setisloading={setisloading} />
    }
    return (
        <>
        {
            isloading &&
            <PageLoading/>
        }
        <header className="fp-header">
            <NavLink>
                    <h1 className="fp-logo">AIorNot</h1>
            </NavLink>
        </header>
        <section className="fp-section">
            { popup &&
                <Popmessage message={errormsg} icons={<LuMailX/>} onclose = { ()=>{setpopup(false)}} type={"error"}/>
            }             
            {
                page[pageoptions]
            }
        </section>
        <Footer/>
        </>
    )
}