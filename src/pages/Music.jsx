import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { TbAnalyze, TbContainer } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Musicplayer from "../Components/Ui components/Musicplayer";
import Soundwaves from "../Components/Ui components/Soundwaves";
import Popmessage from "../Components/Ui components/Popmessage";
import Meter from "../Components/Meter";
import "../Style/Music.css";
export default function Music(){
    const {popup , setpopup } = useOutletContext();
    const inputref = useRef(null);
    const [isfile , setisfile ] = useState(false);
    const [musicurl , setmusicurl] = useState(null);
    const [musicfile , setmusicfile] = useState(null);
    const [result , setresult] = useState(false);
    const[playing , setplaying] = useState(false);

    const handlesubmitmusic = async()=>{
        try {
            const formdata = new FormData();
            formdata.append("music",musicfile);
            
            const url = "api/music";

            const response = await axios.post(url ,formdata,{withCredentials : true  ,
            params:{
                type : "music_count"
            }});

            if(response.data.success){
                 setpopup(prev => ({
                                    ...prev,
                                    show: true,
                                    message : response.data.message,
                                    icon : <HiBadgeCheck/>,
                                    type : "success"
                                    }));
            }
        } catch (error) {
            console.log("Music API error:", error);
        }
    }

    const handlechangeMusic = ()=>{}

    const handleMusicselection = (event) =>{
         const files = event.target.files[0];
         if(!files)return;
         setmusicfile(files);
         const music = URL.createObjectURL(files);
         setmusicurl(music)
         setisfile(true);

    }
    return(
        <>
        {popup.show &&
            <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>
        }
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
                    { result &&
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
                    }
                    <Soundwaves playing={playing} />
                </div>
                <div className="music-player-container">
                    <Musicplayer playing={playing} setPlaying={setplaying} url={musicurl}/>
                </div>
                <div className="feature-btn-container">
                      <Panelbutton name={"Analyse"} icon={<TbAnalyze/>} action={handlesubmitmusic}/>
                      <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={handlechangeMusic}/>                
                </div>
                </>
                )
            }
            </div>
        </section>
        </>
    )
}