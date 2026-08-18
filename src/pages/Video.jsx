import { useReducer, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Meter from "../Components/Meter";
import Limit from "../Components/Limit";
import Videoplayer from "../Components/Videoplayer";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Warning from "../Components/Warning";
import Popmessage from "../Components/Ui components/Popmessage";
import PageLoading from "../Components/PageLoading";
import { TbAnalyze } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import axios from "axios";
import '../Style/Video.css';

export default function Video(){
    const {popup , setpopup} = useOutletContext();
    const videolink = useRef(null);
    const videoselector = useRef(null);
    const [isloading , setisloading] = useState(false);
    const [videourl , setvideourl] = useState(null);
    const [videosubmit , setvideosubmit] = useState(false);
    const [videoanalyzer , setvideoanalyzer] = useState(false);
    const [credits , setcredits] = useState(0);
    const [apiresponse , setapiresponse] = useState(null);

    const handlevideoselect = (event) =>{
        const link = event.target.files[0];
        if(!link) return;
        const url = URL.createObjectURL(link);
        videoselector.current.style.display = "none";
        setvideourl(url);
        setvideosubmit(true);
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
            setapiresponse(response.data.video);
            setcredits(response.data.newcredits);
            setpopup(prev => ({
                ...prev,
                show: true,
                message : "Video Processed Successfully",
                icon : <HiBadgeCheck/>,
                type : "success"
            }));
            setvideoanalyzer(true);
        }
       } catch (error) {
        console.log(error);
            setpopup(prev => ({
            ...prev,
            show: true,
            message : error.message ,
            icon : <BiErrorAlt/>,
            type : "error"
            }));
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
        {isloading &&
            <PageLoading/>
        }
        {popup.show &&
            <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>
        }
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
                {videosubmit &&(
                    <div className="video-controlpanel">
                    <div className={`video-player-container ${videoanalyzer ? "video-afteranalysis" : ""}`}>
                        <div className="video-preview">
                            <Videoplayer controls={true} video={videourl} autoplay={false} muted={false}/>
                        </div>
                        <div className="video-controls">
                            <Panelbutton name={"Analyse"} icon={<TbAnalyze/>}  action={handlesubmitvideo}/>
                            <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={handlechangevideo} />
                        </div>
                    </div>
                    {videoanalyzer &&
                        <div className="video-analysis-container">
                            <div className="meter-container">
                                <div className="ai-meter-container">
                                    <Meter percentage={apiresponse?.ai_probability}/>
                                    <p>AI Probability</p>
                                </div>
                                <div className="human-meter-container">
                                    <Meter percentage={apiresponse?.real_probability}/>
                                    <p>Human Probability</p>
                                </div>
                            </div>
                            <div className="about-video-info">
                                <div className="stats-block">
                                    <h3>Is AI:</h3>
                                    <p>{apiresponse?.is_ai ? "True" : "false"}</p>
                                </div>
                                <div className="stats-block">
                                    <h3>Prediction :</h3>
                                    <p>{apiresponse?.prediction}</p>
                                </div>
                                <div className="stats-block">
                                    <h3>Certainty Level :</h3>
                                    <p>{apiresponse?.certainity_level}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                )}
            </div>
            { videoanalyzer &&
                <>
                    <Warning/>
                    <Limit value={credits}/>
                </>
            }
        </section>
        </>
    )
}