import { useRef } from "react";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Limit from "../Components/Limit";
import { TbAnalyze } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import '../Style/Image.css';
export default function Image(){
    const refimage = useRef(null);
    const inputref = useRef(null);
    const handleimageselection = (event) =>{
        const file = event.target.files[0];
        if(!file)return;
        refimage.current.src = URL.createObjectURL(file);
        if(refimage){
        refimage.current.style.display = "flex";
        }
    }

    const handleimagesubmit = () =>{
        console.log("image submit");
    }

    const handleimagechange = () =>{
        inputref.current.click();
    }
    return(
        <>
        <section className="imagesection">
            <div className="imageHeading">
                <h2>Instantly analyze any image and get accurate AI-generated insights in seconds</h2>
            </div>
            <div className="imageselectionsection">
                <div className="resultheader">
                    Please Insert Image for Analysis
                </div>
                <div className="i-selector">
                    <div className="imageinput">
                        <FirstInput action={handleimageselection} ref={inputref} Filetype={'image/*'}/>
                        <img  className ="uploadedimg" src="/image/face-recognition-personal-identification-collage.jpg" alt="" ref={refimage}/>
                    </div>
                    <div className="submitpanel">
                        <Panelbutton name={"Analyse"} icon={<TbAnalyze/>} action={handleimagesubmit}/>
                        <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={handleimagechange}/>
                    </div>
                </div>
                <div className="resultprobability">
                </div>
            </div>
            <Limit value={1}/>
        </section>
        </>
    )
}