import { useReducer, useRef, useState } from "react";
import { useAuth } from "../AuthProvider";
import { useOutletContext } from "react-router-dom";
import Meter from "../Components/Meter";
import Videoplayer from "../Components/Videoplayer";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Popmessage from "../Components/Ui components/Popmessage";
import { TbAnalyze } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import axios from "axios";
import '../Style/Video.css';

export default function Video(){
    const {setisloading} = useAuth();
    const {popup , setpopup} = useOutletContext();
    const videolink = useRef(null);
    const videoselector = useRef(null);
    const [videourl , setvideourl] = useState(null);
    const [videoanalyzer , setvideoanalyzer] = useState(false);
   

    const handlevideoselect = (event) =>{
        const link = event.target.files[0];
        if(!link) return;
        const url = URL.createObjectURL(link);
        videoselector.current.style.display = "none";
        setvideourl(url);
        setvideoanalyzer(true);

    }

    const handlesubmitvideo = async() =>{
       try {
        setisloading(true);
        if(!videolink.current.files[0]) return;
        console.log(videolink.current.files[0]);
        const formdata = new FormData();
        formdata.append("file" , videolink.current.files[0])
        const url = "api/video";
        const response = await axios.post(url , formdata , {withCredentials : true , 
        params:{
            type : "video_count"
        }});

        if(response.data.success){
            URL.revokeObjectURL(videourl);
        }
       } catch (error) {
            console.log(error);
       }finally{
            setisloading(false);
       }
    }

    const handlechangevideo = () =>{
        if(!videolink.current) return;
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
                    <div className="webvideoplayer-container">
                        <div className="webvideo-overlay">
                            <Videoplayer controls={false} video={"/video/AI Video Detected Instantly.mp4"} autoplay={true} muted={true}/>
                        </div>
                    </div>
                    <div className="video-input-container">
                        <div className="video-input-heading-tag">
                            <h4>Ai Video Detection</h4>
                            <h4>DeepFake Detection</h4>
                        </div>
                        <FirstInput ref={videolink} action={handlevideoselect} Filetype={"video/*"}/>
                    </div>
                </div>
                {videoanalyzer &&(
                    <div className="video-controlpanel">
                    <div className="video-player-container">
                        <div className="video-preview">
                            <Videoplayer controls={true} video={videourl} autoplay={false} muted={false}/>
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