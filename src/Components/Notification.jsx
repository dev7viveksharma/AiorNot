import { useState } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import CircularLoader from "./Loaders/CircularLoader";
import "../Style/Notification.css";
import { redirect } from "react-router-dom";
export default function Notification({ opencard , setisdot}){
    const{data , isLoading , error} = useQuery({
        queryKey : ["news"],
        queryFn : async() =>{
            try {
                const response = await axios.get("/File/news",{useCredentials : true});
                if(response.data.success){
                    return response.data.news;
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                console.log(errorMessage);
                return [];
           }
        }
    });

    const  handleclose = (event)=>{
        if( event.target === event.currentTarget){
            opencard(null);
        }
    }

    const handleopenlink = (url)=>{
        window.open(url , "_blank" , "noopener");
    }
    return(
        <div className="notification-container">
            <div className="notfication-header-container">
                <h3>AI Related News</h3>    
            </div>
            { !isLoading ?(
                <ul className="notification-list">
                {
                    data?.map((data , index)=>{
                        return( 
                        <li key={index} onClick={()=>handleopenlink(data.url)}>
                            <div className="thumbnail-img" >
                                <img src={data.thumbnail} alt="" />
                            </div>
                            <div className="news-headline-container">
                                <p>{data.title}</p>
                            </div>
                        </li>
                        )
                    })
                }
                </ul>
            ):(
                <div className="notificationLoading">
                    <CircularLoader/>
                </div>
            )}
        </div>
    )
}