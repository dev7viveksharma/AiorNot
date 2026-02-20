import { useState } from "react";
import {createBrowserRouter , RouterProvider } from "react-router-dom";
import {useAuth} from './AuthProvider.jsx';
import Applayout from "./layout/Applayout";
import Errorpage from "./layout/Errorpage";
import Home from "./pages/Home";
import Image from "./pages/image";
import Ai from "./pages/Ai";
import Text from "./pages/Text";
import Video from "./pages/video";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Usercard from "./Components/Usercard";
import Setting from "./Components/Setting.jsx";
import PageLoading from "./Components/PageLoading.jsx";
import './App.css';

function App() {
  const {islogin , isloading} = useAuth();
   const [userauthcard , setuserauthcard] = useState(false);
   const [issetting , setissetting] = useState(false);
      const opencard = () =>{
          if(userauthcard){
              setuserauthcard(false);
              return;
          }
  
          setuserauthcard(true);
      }
      
      const opensetting = ()=>{
        setissetting(!issetting);
      }

  const router = createBrowserRouter([
    {
      path : '/',
      element : <Applayout opencard = {opencard} opensettings={opensetting} user={islogin}/>,
      errorElement : <Errorpage/>,
      children : [
        {
          path : '',
          element : <Home />
        },
                {
          path : 'text',
          element : <Text/>
        },
                {
          path : 'image',
          element : <Image/>
        },
                {
          path : 'video',
          element : <Video/>
        },
                {
          path : 'ai',
          element : <Ai/>
        },
                {
          path : 'aboutus',
          element : <Aboutus/>
        },
                  {
          path : 'contactus',
          element : <Contactus/>
        },
      ]

  }])
  return (
    <>
    {
      isloading &&(
        <PageLoading/>
      )
    }
    {
     userauthcard &&(
                <Usercard card = {opencard}/>
            )
    }
    {
      issetting &&(
        <Setting/>
      )
    }
    {

    }
    <RouterProvider router={router}/>
    </>
  )
}

export default App
