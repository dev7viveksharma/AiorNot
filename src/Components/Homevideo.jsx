import Videoplayer from "./Videoplayer"
import "../Style/Homevideo.css";
export default function Homevideo(){
    return(
        <div className="introduction-video-container">
            <div className="video-heading">
                <h2>AI or Not? Find Out Instantly</h2>
                <p>Analyze videos in seconds and uncover whether they're created by humans or artificial intelligence</p>
            </div>
            <div className="homepage-video-container">
                <div className="video-controller-container">
                    <Videoplayer video={'/video/AI Authenticity Checker.mp4'} autoplay={true} muted={true}/>
                </div>
            </div>
        </div>
    )
}