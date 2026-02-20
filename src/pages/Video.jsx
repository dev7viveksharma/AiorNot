import Meter from "../Components/Meter";
import Videoplayer from "../Components/Videoplayer";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import { TbAnalyze } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import '../Style/Video.css';
import { useRef, useState } from "react";
export default function Video(){
    const videolink = useRef(null);
    const videoselector = useRef(null);
    const [videoanalyzer , setvideoanalyzer] = useState(false);
    const [video , setvideo ] = useState(null);

    const handlevideoselect = (event) =>{
        const link = event.target.files[0];
        if(!link) return;
        const url = URL.createObjectURL(link);
        videoselector.current.style.display = "none";
        setvideo(url);
        setvideoanalyzer(true);

    }

    const handlesubmitvideo = () =>{
        console.log("video submit");
    }

    const handlechangevideo = () =>{
        if(!video) return;
        videolink.current.click();
    }


    return(
        <>
        <section className="video-section">
            <div className="videosection-heading">
                <h2>Instantly analyse any video and get accurate AIorNot insights in seconds</h2>
            </div>
            <div className="video-container">
                <div className="video-selector" ref={videoselector}>
                    <FirstInput ref={videolink} action={handlevideoselect} Filetype={"video/*"}/>
                </div>
                {videoanalyzer &&(
                    <div className="video-controlpanel">
                    <div className="video-player-container">
                        <div className="video-preview">
                            <Videoplayer video={video} autoplay={false} muted={false}/>
                        </div>
                        <div className="video-controls">
                            <Panelbutton name={"Analyse"} icon={<TbAnalyze/>}  action={handlesubmitvideo}/>
                            <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={handlechangevideo} />
                        </div>
                    </div>
                    <div className="video-analysis-container">
                        <div className="meter-container">
                            <div className="ai-meter-container">
                                 <Meter/>
                                <p>AI Probability</p>
                            </div>
                            <div className="human-meter-container">
                                <Meter/>
                                <p>Human Probability</p>
                            </div>
                        </div>
                        <div className="about-video-info">

                        </div>
                    </div>
                </div>
                )}
            </div>
            
        </section>
        </>
    )
}