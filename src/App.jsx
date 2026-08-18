import { useState } from "react";
import {createBrowserRouter , RouterProvider } from "react-router-dom";
import {useAuth} from './AuthProvider.jsx';
import Applayout from "./layout/Applayout";
import Errorpage from "./layout/Errorpage";
import Home from "./pages/Home";
import Image from "./pages/Image.jsx";
import Ai from "./pages/Ai";
import Text from "./pages/Text";
import Video from "./pages/video";
import Music from "./pages/Music.jsx";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Usercard from "./Components/Usercard";
import PageLoading from "./Components/PageLoading.jsx";
import MyFile from "./pages/MyFile.jsx";
import MediaDetails from "./pages/MediaDetail.jsx";
import Settingcard from "./Components/Settingcard.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import './App.css';

function App() {
  const {islogin , isloading} = useAuth();
  
  const [userauthcard , setuserauthcard] = useState(null);

  const opencard = (option) =>{
    setuserauthcard(option);
  }   

  const cardcomponents = {
    login : <Usercard card = {opencard}/>,
    settingmenu : <Settingcard opencard ={opencard}/>,
  }
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Applayout opencard = {opencard}  user={islogin}/>,
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
          path : 'music',
          element : <Music/>
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
          element :<ProtectedRoutes> 
                    <Contactus/>
                   </ProtectedRoutes>
        },
        {
          path : 'myfiles',
          element :<ProtectedRoutes>
                    <MyFile/>
                   </ProtectedRoutes>
        },
        {
          path : 'media/:mediaType/:id/:mediaid',
          element :<ProtectedRoutes>
                   <MediaDetails/>
                  </ProtectedRoutes>
        }
      ]

  },{
    path : "ForgetPassword",
    element : <ForgetPassword/>,
    errorElement : <Errorpage/>,
  }])
  return (
    <>
    {
      isloading &&(
        <PageLoading/>
      )
    }
    {
     userauthcard && cardcomponents[userauthcard]
    }
    <RouterProvider router={router} />
    </>
  )
}

export default App
