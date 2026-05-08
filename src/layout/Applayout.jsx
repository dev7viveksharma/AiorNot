import { Outlet } from 'react-router-dom';
import { useState ,  useEffect , useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import Setting from '../Components/Setting';

export default function Applayout({opencard , user , opensettingmenu }){
const profilerref = useRef(null);
const [issetting , setissetting] = useState(false);
const [popupmessage , setpopupmessage] = useState({
  show : false ,
  message : "",
  icon : null,
  type : ""
});

const opensetting = ()=>{
    setissetting(!issetting);
  }
useEffect(()=>{
    function handleclick(event){
      if(issetting && profilerref.current && !profilerref.current.contains(event.target)){
        opensetting();
      }
    }

    document.addEventListener("click", handleclick)
    return () => document.removeEventListener("click", handleclick)
    },[issetting]
  );


    return(
        <>
        <Header opencard={opencard}  opensettings={opensetting}  user={user} ref={profilerref}/>
        {
        issetting &&(
        <Setting opensettings ={opensettingmenu}/>
            )
        }
        <Outlet context={{setpopup : setpopupmessage , popup : popupmessage}}/>
        <Footer/>
        </>        
    )
}