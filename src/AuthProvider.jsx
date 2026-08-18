import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const AuthContext = createContext();

export default function AuthProvider({children}){
  const [islogin , setislogin] = useState(false);
  const [isloading , setisloading] = useState(true);
  const [userinfo , setuserinfo] = useState({
    name : null ,
    email : null,
    id : null
  })
  const verifyuser = async()=>{
    try {
      const url = 'auth/verify';
      const response = await axios.get(url);
      if(response.data.success){
        setislogin(response.data.exist);
        setuserinfo((prev)=>({
          ...prev , 
          name : response.data.name,
          email : response.data.email,
          id : response.data.id
        }));
      }
      return response.data
    } catch (error) {
      console.log(error.message);
    }finally{
      setisloading(false);
    }
  }

  const {data , isLoading}= useQuery({
    queryKey : ["authentication"],
    queryFn : verifyuser,
    refetchOnWindowFocus : false,
  });
    
  
    return(
    <AuthContext.Provider value={{islogin , setislogin , isloading , setisloading , userinfo}}>
      {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);