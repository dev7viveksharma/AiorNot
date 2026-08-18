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
    const [history , sethistory] = useState([]);
    const [email , setemail] = useState("");

    const errorfunction = (message) =>{
        seterrormsg(message);
        setpopup(true);
    }

    const handleback = () =>{
        sethistory(prev =>{
           const newhistory = [...prev];
           const lastpage = newhistory.pop();
           if(lastpage){
            setpageoptions(lastpage);
           }

           return newhistory;
        })
    }

    const page = {
        email : <GetEmail errorfunction = {errorfunction} setpage={setpageoptions} page={pageoptions} email={email} setemail={setemail} setisloading={setisloading} sethistory={sethistory}/>,
        otp : <GetOTP errorfunction = {errorfunction} setpage={setpageoptions} page={pageoptions} email={email} setisloading={setisloading} sethistory={sethistory} goback={handleback}/>,
        newpassword : <Newpassword errorfunction = {errorfunction} email={email}  page={pageoptions} setisloading={setisloading} sethistory={sethistory} goback={handleback}/>
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