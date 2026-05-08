import { useRef } from "react";
import FirstInput from "../Components/FirstInput";
import "../Style/Music.css";
export default function Music(){
    const musicref = useRef(null);

    const handleMusicselection = () =>{

    }
    return(
        <>
        <section className="music-section">
            <div className="music-heading">
                <h3>Instantly analyze any music and get accurate AI-generated insights in seconds</h3>
            </div>
            <div className="music-card-section">
                <div className="music-poster">
                    <img src="../../public/image/3d-music-related-scene.jpg" alt="" />
                </div>
                <div className="music-selection-container">
                    
                    <div className="music-insert">
                        <FirstInput action={handleMusicselection} ref={musicref} Filetype={'audio/*'}/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}