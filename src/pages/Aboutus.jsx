import Button from '../Components/Button.jsx';
import Stats from '../Components/Stats.jsx';
import Videoplayer from '../Components/Videoplayer.jsx';
import { IoMdContact } from "react-icons/io";
import '../Style/Aboutus.css';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
export default function Aboutus(){
    const fetchStats = async() =>{
        try {
            const response = await axios.get("File/UsageCount");
            if(response.data.success){
                console.log(response.data.result);
                return response.data.result;
            }
        } catch (error) {
            console.log(error.data.message || error.message);
        }
    }
    const {data , isLoading} = useQuery({
        queryKey : ['countstats'],
        queryFn : fetchStats,
        staleTime : 5 * 60 * 1000,
        gcTime : 30 * 60 * 1000,
    });
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
                    <Stats value={data?.find(item => item.toolname === "Text")?.useCount ?? 0} topic={"Ai Texts Detected"} isLoading={isLoading}/>
                    <Stats value={data?.find(item => item.toolname === "Image")?.useCount ?? 0} topic={"Ai Images Detected"} isLoading={isLoading}/>
                    <Stats value={data?.find(item => item.toolname === "Video")?.useCount ?? 0} topic={"Ai videos Detected"} isLoading={isLoading}/>
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