import { NavLink } from "react-router-dom";
import Routelink from "../Components/Routelink";
import CompanyLogo from "../Components/Ui components/CompanyLogo";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import '../Style/Header.css';
import { useState , useRef} from "react";
export default function Header({opencard , opensettings , openNotification, user , ref , notificationref , isdot}){
    return (
        <>
        <header className="header">
            <div className="Logo">
                <NavLink>
                    <CompanyLogo/>
                    
                </NavLink>
            </div>
            <div className="headingList">
                <Routelink route={"/"} name={"Home"}/>
                <Routelink route={"/text"} name={"Text"}/>
                <Routelink route={"/image"} name={"Image"}/>
                <Routelink route={"/video"} name={"Video"}/>
                <Routelink route={"/music"} name={"Music"}/>
                <Routelink route={"/ai"} name={"Modern Ai"}/>
                <Routelink route={"/aboutus"} name={"About Us"}/>
            </div>
            {/* { user &&
            <div className="burgericon">
                <GiHamburgerMenu />
            </div>
            } */}
            <div className="user">
                {user &&
                <div className="ai-notification" onClick={openNotification} ref={notificationref}>
                    <IoMdNotificationsOutline/>
                    <p className={isdot ?"gotNews" : "noNews" }></p>
                </div>
                }
                <button className={user ? "user-btn" : "unknown-user"} ref={ref} onClick={user ? ()=> opensettings("settingmenu") : ()=>opencard("login")}>{ user ?<FaRegUser/> : "Sign Up"}</button>
            </div>
        </header>
        </>
    )
}