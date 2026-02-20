import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "../Style/PageLoading.css";
export default function PageLoading(){
    return(
        <>
        <div className="loading-overlay">
            <div className="loader-animation">
                <DotLottieReact
                src="https://lottie.host/7a77855a-bed9-497d-98fa-ec98eec61286/L8VOvRMdul.lottie"
                loop
                autoplay
                />
            </div>
        </div>
        </>
    )
}