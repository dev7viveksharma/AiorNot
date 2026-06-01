import { useEffect, useState } from "react";

export default function Timer({handletime , time , setTime}){

    useEffect(()=>{
        const interval = setInterval(()=>{

            setTime((prev)=>{

                if(prev <= 1){
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            });

        },1000);

        return ()=> clearInterval(interval);

    },[time]);

    useEffect(()=>{
        if(time === 0){
            handletime();
        }
    },[time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return(
        <>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </>
        )
}