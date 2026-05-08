import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoutes({children}){
    const {isloading , setisloading} = useAuth();
    const [isauth , setisauth] = useState(null);
    useEffect(()=>{
        const authorise = async() =>{
            try {
            const response = await axios.get("auth/routeprotection",{ withCredentials: true });
            if(response.data.isauth){
                setisauth(response.data.isauth);
            }

            } catch (error) {
                setisauth(false); 
            }
            setisloading(false);
        }
        authorise();
        
    },[]);   

    if(isauth === false){
        return <Navigate to={"/"} replace/>
    }

    return children;
}