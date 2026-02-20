import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
export default function Applayout({opencard , opensettings , user}){
    
    return(
        <>
        <Header opencard={opencard}  opensettings={opensettings}  user={user}/>
        <Outlet/>
        <Footer/>
        </>        
    )
}