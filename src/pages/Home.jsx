import Button from '../Components/Button'
import Image from '../Components/ImageC';
import Whyneed from '../Components/WhyNeed';
import { SiImagedotsc } from "react-icons/si";
import { MdSlowMotionVideo } from "react-icons/md";
import Homevideo from '../Components/Homevideo';
import '../Style/Home.css'


export default function Home(){
    return(
        <>
        <Homevideo/>
        <section className='mainContainer'>
                <div className="imagecontainer">
                    <div className='i-info'>
                        <h2>AI Image Detection</h2>
                        <p>
                        Our Image AI Detection system analyzes photos using advanced pattern recognition, metadata verification,
                        and visual-signature analysis to determine whether the content is real, edited, or fully AI-generated.
                        It scans pixel structures, lighting behavior, texture accuracy, and AI artifacts to provide a clear
                        authenticity score with a simple, easy-to-read report.
                        </p>
                        <Button values={"start with Image"} icons={<SiImagedotsc/>} route={'image'}/>
                    </div>   
                    <div className="postercontainer">
                        <Image src ={'/image/face-recognition-personal-identification-collage.jpg'} transform = "perspective(500px) rotateY(-10deg)"/>
                    </div>                 
                </div>
                <div className="videocontainer">
                    <div className="postercontainer">
                        <Image src={'/image/futuristic-ai-dashboard-display.jpg'} transform ="perspective(500px) rotateY(10deg)"/>
                    </div>
                    <div className='v-info'> 
                        <h2>AI Video Detection</h2>
                        <p> Our Video AI Detection technology analyzes motion patterns, facial movements, audio consistency,
                        and deepfake markers to identify whether a video has been created or modified using AI.
                        It provides a detailed authenticity score and highlights any unusual or synthetic behavior,
                        ensuring complete trust in your video content.
                        </p>                                            
                        <Button values={"start with Video"} icons={<MdSlowMotionVideo/>} route={'video'}/>                 
                    </div>
                </div>
        </section>
        <Whyneed/>
        </>
    )
}