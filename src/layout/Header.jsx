import { NavLink } from "react-router-dom";
import Routelink from "../Components/Routelink";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import '../Style/Header.css';
import { useState } from "react";
export default function Header({opencard , opensettings , user}){
    return (
        <>
        <header className="header">
            <div className="Logo">
                <NavLink>
                    <h1>AIorNot</h1>
                </NavLink>
            </div>
            <div className="headingList">
                <Routelink route={"/"} name={"Home"}/>
                <Routelink route={"/text"} name={"Text"}/>
                <Routelink route={"/image"} name={"Image"}/>
                <Routelink route={"/video"} name={"Video"}/>
                <Routelink route={"/ai"} name={"Modern Ai"}/>
                <Routelink route={"/aboutus"} name={"About Us"}/>
            </div>
            {/* { user &&
            <div className="burgericon">
                <GiHamburgerMenu />
            </div>
            } */}
            <div className="user">
                <button className={user ? "user-btn" : "unknown-user"} onClick={user ? opensettings : opencard}>{user ?<FaRegUser/> : "Sign Up"}</button>
            </div>
        </header>
        </>
    )
}