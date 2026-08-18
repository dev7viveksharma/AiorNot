import "../Style/Setting.css";
import { useNavigate } from "react-router-dom";
import Settingbtn from "./Settingbtn";
import { useAuth } from "../AuthProvider.jsx";
import axios from "axios";
import { CiSettings , CiFolderOn , CiLogout  } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MenuLoading from "./Loaders/MenuLoading.jsx";
import { FaRegUser } from "react-icons/fa";

export default function Setting({opensettings}){
    const queryClient =  useQueryClient();
    const {setislogin , islogin , userinfo} = useAuth();
    const[info ,setinfo] = useState({
        name : "",
        email : ""
    });
    const [menuloading , setmenuloading] = useState(false);
    useEffect(()=>{
        const getinfo = async() =>{
            setmenuloading(true);
          try {
              const url = "auth/Accountinfo";
              const response = await axios.get(url , {withCredentials : true});
              if(response.data.success){
                   setinfo((prev)=>({
                      ...prev,
                        name : response.data.name,
                        email : response.data.email,
                    }));
              }
          } catch (error) {
            console.log(error.message);
          }finally{
            setmenuloading(false);
          }
        }
        if(userinfo.name === null || userinfo.email === null){
           getinfo();
        }
    },[]);
    const navigate = useNavigate();
    const logout = async()=>{
        try {
            const url = "/auth/logout";
            const response = await axios.post(url);
    
            if(response.data.success){
                setislogin(false);
                queryClient.invalidateQueries({
                    queryKey : ["authentication"]
                });
            }
        } catch (error) {
            console.log(error);
        }

    }
    const routeuser = (route)=>{
        navigate(route);
    }


    return(
        <>
        
        <div className="setting-overlay-container">
            <div className="setting-card">
                <div className="Profile-section">
                    {menuloading && (
                        <MenuLoading/>
                    )}
                    {!menuloading &&(
                        <>
                        <div className="profile-pic-section">
                            <div className="picture-container">
                                <FaRegUser/>
                            </div>
                        </div>
                        <div className="profile-info-section">
                            <div className="user-name">
                            <p className="info">{userinfo.name !== null ? userinfo.name : info.name}</p>
                            </div>
                            <div className="user-email">
                                <p className="info">{userinfo.email !== null ? userinfo.email : info.email}</p>
                            </div>
                        </div>
                        </>
                    )}
                </div>
                <div className="feature-section">
                    <div className="file-section">
                        <Settingbtn name={'My Files'} icon ={<CiFolderOn/>} action={()=>routeuser("/myfiles")} btnclass={"settingbtn"}/>
                    </div>
                    <div className="contact-section">
                        <Settingbtn name={'Contact Us'}icon ={<IoMdContact/>} action={()=>routeuser("/contactus")} btnclass={"settingbtn"}/>
                    </div>                    
                    <div className="setting-section">
                        <Settingbtn name={'Settings'} icon ={<CiSettings/>} action={()=>opensettings("settingmenu")} btnclass={"settingbtn"}/>
                    </div>
                    <div className="logout-section">
                        <Settingbtn name={'Logout'} icon ={<CiLogout/>} action={logout} btnclass={"settingbtn"}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}