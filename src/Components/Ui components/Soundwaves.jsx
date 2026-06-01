import { useState, useRef } from "react";
import "./Soundwaves.css";

export default function Soundwaves({playing}) {

    return (
        <div className="waves-container">
               <div className={`wave ${playing ? "active" : ""}`}>
                {Array.from({length:30}).map((_,i)=>(
                <span key={i}></span>
                ))}
            </div>
        </div>
    );
}