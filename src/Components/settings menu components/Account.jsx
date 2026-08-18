import { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/Settingmenuoptions.css";
import Optionsection from "../Ui components/Optionsection.jsx";
import { FaRegUser } from "react-icons/fa";
import CircularLoader from "../Loaders/CircularLoader.jsx";
export default function Account(){
    const [userdata , setuserdata] = useState({
        name : "",
        email : "",
        createat : ""
    }); 
    const [isloading , setisloading] = useState(true);

    useEffect(()=>{
        const getaccountdata = async() =>{
          try {
              const response = await axios.get("auth/Accountinfo",{withCredentials : true});
              if(response.data.success){
                  setuserdata((prev)=>({
                    ...prev,
                      name : response.data.name,
                      email : response.data.email,
                      createat : response.data.createat,
                  }));
              }
          } catch (error) {
            console.log(error.message);
          }finally{
            // setisloading(false);
          }
        }

        getaccountdata();
    },[]);
    return(
        <>{
            isloading &&(
                <div className="accountLoader">
                    <CircularLoader/>
                </div> 
            )}
        {!isloading&&(
            <div className="Account-component">
                <div className="Account-heading">
                    <h2>Account</h2>
                </div>
                <Optionsection name={"Avatar"} data={<FaRegUser/>} action={""}/>
                <Optionsection name={"Full Name"} data={userdata.name} action={""}/>
                <Optionsection name={"Email"} data={userdata.email} action={""}/>
                <Optionsection name={"Password"} data={"********"} action={""}/>
            </div>
        )}
        </>
    )
}