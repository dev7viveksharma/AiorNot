import { useRef, useState } from "react";
import { TbAnalyze, TbContainer } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Musicplayer from "../Components/Ui components/Musicplayer";
import Soundwaves from "../Components/Ui components/Soundwaves";
import Meter from "../Components/Meter";
import "../Style/Music.css";
export default function Music(){
    const inputref = useRef(null);
    const [isfile , setisfile ] = useState(false);
    const [musicurl , setmusicurl] = useState(null);
    const[playing , setplaying] = useState(false);

    const handleMusicselection = (event) =>{
         const files = event.target.files[0];
         if(!files)return;
         
         const music = URL.createObjectURL(files);
         setmusicurl(music)
         setisfile(true);

    }
    return(
        <>
        <section className="music-section">
            <div className="music-heading">
                <h3>Instantly analyze any music and get accurate AI-generated insights in seconds</h3>
            </div>
            <div   className={`music-card-section ${isfile ? "after-music-insert" : ""}`}>
            { !isfile ? (
                <>
                <div className="music-poster">
                    <img src="/image/3d-music-related-scene.jpg" alt="" />
                </div>
                
                <div className="music-selection-container">
                    <div className="music-insert">
                        <FirstInput action={handleMusicselection} ref={inputref} Filetype={'audio/*'}/>
                    </div>
                </div>
                </>
                ):(
                <>
                <div className="music-result-container">
                    <div className="music-result">
                        <div className="ai-music-meter">
                            <Meter percentage={100}/>
                            <p>AI Probability</p>
                        </div>
                        <div className="human-music-meter">
                            <Meter percentage={100}/>
                            <p>Human Probability</p>
                        </div>
                        <div className="music-result-stats">
                           <div className="stats-block">
                                <h3>Prediction :</h3>
                                <p>Real</p>
                            </div>
                            <div className="stats-block">
                                <h3>Certainty Level :</h3>
                                <p>Meduim</p>
                            </div>
                        </div>
                    </div>
                    <Soundwaves playing={playing} />
                </div>
                <div className="music-player-container">
                    <Musicplayer playing={playing} setPlaying={setplaying} url={musicurl}/>
                </div>
                <div className="feature-btn-container">
                      <Panelbutton name={"Analyse"} icon={<TbAnalyze/>} action={""}/>
                      <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={""}/>                
                </div>
                </>
                )
            }
            </div>
        </section>
        </>
    )
}