import Button from '../Components/Button.jsx';
import Stats from '../Components/Stats.jsx';
import Videoplayer from '../Components/Videoplayer.jsx';
import { IoMdContact } from "react-icons/io";
import '../Style/Aboutus.css';
export default function Aboutus(){
    return(
        <>
        <section className="about-us">
            <div className="image-container">
                <img src="/image/aiornot aboutus.png" alt="" className='about-us-image'/>
                <div className="info-container">
                    <div className="about-us-context">
                    <h1>About Us</h1>
                    <p> Check Before believing Something</p>
                    </div>
                    <div className="contactbtn">
                    <Button values={"Contact Us"} icons={<IoMdContact/>} route={'/contactus'}/>
                    </div>
                </div>
            </div>
            <div className="web-stats-container">
                    <Stats value={100} topic={"Ai Texts Detected"}/>
                    <Stats value={10} topic={"Ai Images Detected"}/>
                    <Stats value={52} topic={"Ai videos Detected"}/>
            </div>
            <div className="about-AiorNot">
                <div className="aboutus-content">
                    <h1>About AIorNot</h1>
                    <p>
                        AI or Not is a smart and user-friendly platform that instantly analyzes images and text to determine whether they are AI-generated or real.
                         Using fast and accurate detection methods, the website helps users verify authenticity, get quick insights, and make informed decisions. 
                        It’s designed for creators, students, professionals, and anyone who wants to check the originality of digital content in just a few seconds.
                    </p>
                </div>
                <div className="video-container">
                    <Videoplayer video={'/video/AI Authenticity Checker.mp4'}/>
                </div>
            </div>
        </section>
        </>
    )
}