import { Outlet } from 'react-router-dom';
import { useState ,  useEffect , useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTitle from '../Components/PageTitle';
import Setting from '../Components/Setting';
import Notification from '../Components/Notification';
export default function Applayout({opencard , user}){
const profilerref = useRef(null);
const notificationref = useRef(null);
const [issetting , setissetting] = useState(false);
const [isnotification , setisnotification] = useState(false);
const[isdot , setisdot] = useState(true);
const [popupmessage , setpopupmessage] = useState({
  show : false ,
  message : "",
  icon : null,
  type : ""
});

const opensetting = ()=>{
    setissetting(!issetting);
}

const  openNotification = ()=>{
  setisnotification(!isnotification);
}
useEffect(()=>{

    function handleclick(event){
      if(issetting && profilerref.current && !profilerref.current.contains(event.target)){
          opensetting();
      }

      if(isnotification && notificationref.current && !notificationref.current.contains(event.target)){
          openNotification();
      }
    }

    document.addEventListener("click", handleclick)
    return () => document.removeEventListener("click", handleclick)
    },[issetting , isnotification]
  );


    return(
        <>
        <PageTitle/>
        <Header opencard={opencard}  opensettings={opensetting} openNotification={openNotification} user={user} ref={profilerref} notificationref={notificationref} isdot={isdot}/>
        {
        issetting &&(
        <Setting opensettings ={opencard}/>
            )
        }
        {
          isnotification &&
          <Notification opencard={opencard} setisdot={setisdot}/>
        }

        <Outlet context={{setpopup : setpopupmessage , popup : popupmessage}}/>
        <Footer/>
        </>        
    )
}