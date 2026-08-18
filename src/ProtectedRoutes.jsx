import { Navigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function ProtectedRoutes({children}){

    const {data : isauth , isLoading , error} = useQuery({
        queryKey : ["protectedLink"],
        queryFn :  async() =>{
                    try {
                        const response = await axios.get("auth/routeprotection",{ withCredentials: true });
                        return response.data.isauth;
                    } catch (error) {
                        return false;
                    }
                }   
    });
    
    if(error || !isauth && !isLoading){
        return <Navigate to={"/"} replace/>
    }

    return children;
}