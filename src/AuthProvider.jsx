import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export default function AuthProvider({children}){
  const [islogin , setislogin] = useState(false);
  const [isloading , setisloading] = useState(true);
  const verifyuser = async()=>{
    try {
      const url = 'auth/verify';
      const response = await axios.get(url);
      if(response.data.success){
        setislogin(response.data.exist);
      }
    } catch (error) {
      console.log(error.message);
    }finally{
      setisloading(false);
    }
  }

  useEffect(()=>{
    verifyuser();
  },[])
    return(
    <AuthContext.Provider value={{islogin , setislogin , isloading}}>
      {children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);