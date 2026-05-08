import { useContext, useRef , useState } from "react";
import axios from "axios";
import Panelbutton from "../Components/Panelbutton";
import FirstInput from "../Components/FirstInput";
import Limit from "../Components/Limit";
import Meter from "../Components/Meter";
import Warning from "../Components/Warning";
import Collapsable from "../Components/Ui components/Collapsable";
import Popmessage from "../Components/Ui components/Popmessage";
import { useAuth } from "../AuthProvider";
import { TbAnalyze } from "react-icons/tb";
import { MdOutlineChangeCircle } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import { BiErrorAlt, BiSolidErrorAlt } from "react-icons/bi";
import { useOutletContext } from "react-router-dom";
import '../Style/Image.css';
export default function Image(){
    const {setisloading} = useAuth();
    const {popup , setpopup } = useOutletContext();
    const refimage = useRef(null);
    const inputref = useRef(null);
    const containeradjust = useRef(null);
    const [isanalyze , setisanalyze] = useState(false);
    const [showpanel , setshowpanel] = useState(false);
    const [apiresponse , setapiresponse] = useState(null);
    const [imgcredits , setimgcredits] = useState(0);

    const handleimageselection = (event) =>{
        const file = event.target.files[0];
        if(!file)return;
        refimage.current.src = URL.createObjectURL(file);
        if(refimage){
        refimage.current.style.display = "flex";        
        }
        setshowpanel(true);
    }

    const handleimagesubmit = async() =>{
        if(!inputref.current.files[0])return;

        const formdata = new FormData();
        formdata.append("file",inputref.current.files[0]);
        try {
            setisloading(true);
            console.log(inputref.current.files[0]);
            const url = "api/image";
            const response = await axios.post(url, formdata, {
                withCredentials: true,
                params: {
                    type: "image_count"
                }
            });
            console.log(response.data);
            if(response.data.success){
                setapiresponse(response.data.image);
                setimgcredits(response.data.newcredits);
                containeradjust.current.classList.add("showimageresult");
                   setpopup(prev => ({
                    ...prev,
                    show: true,
                    message : "Image processed successfully",
                    icon : <HiBadgeCheck/>,
                    type : "success"
                    }));

                setisanalyze(true);
             }
           
        } catch (error) {
           const errorMessage = error.response?.data?.message || error.message;
           setpopup(prev => ({
            ...prev,
            show: true,
            message : errorMessage ,
            icon : <BiErrorAlt/>,
            type : "error"
            }));
            
        }finally{
            setisloading(false);
        }
    }

    const moreinfo = () =>{
        if (!apiresponse?.type?.ai_generators) return null;
        
               return(
                <>
                <div className="aiusage-stats">
                {
                    Object.entries(apiresponse.type.ai_generators).map(([key, value], index) => (
                    <div className="usagebar-box" key={index}>
                        <p>{key}</p> :
                        <progress value={value} max={1.0} />
                    </div>
                    ))
                }
                </div>
                </>
               )         
    }
    const resultoutcomes = (content) =>{
        return(
            <>
            <div className="outcomebox" ref={content}>
                {moreinfo()}
                <div className="Ai-summary">
                    <p>{apiresponse.reasoning_summary}</p>
                </div>
            </div>
            </>
        )
    }

    const handleimagechange = () =>{
        inputref.current.click();
    }
    return(
        <>
        {popup.show &&
        <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>
        }
        <section className="imagesection">
            <div className="imageHeading">
                <h2>Instantly analyze any image and get accurate AI-generated insights in seconds</h2>
            </div>
            <div className="imageselectionsection " ref={containeradjust}>
                <div className="resultheader">
                {!apiresponse ? (
                    <p className="resultheader-p">
                        Please Insert Image for Analysis
                    </p>
                ) : (
                    <p className="resultheader-p">
                        {apiresponse.reasoning_summary}
                    </p>
                )}
                </div>
                <div className="i-selector">
                    <div className="imageinput">
                        <FirstInput action={handleimageselection} ref={inputref} Filetype={'image/*'}/>
                        <img  className ="uploadedimg" src="/image/face-recognition-personal-identification-collage.jpg" alt="" ref={refimage}/>
                    </div>
                    { showpanel &&
                    <div className="submitpanel">
                        <Panelbutton name={"Analyse"} icon={<TbAnalyze/>} action={handleimagesubmit}/>
                        <Panelbutton name={"Change"} icon={<MdOutlineChangeCircle/>} action={handleimagechange}/>
                    </div>
                    }
                </div>
                {isanalyze&&(
                <div className="imageresult-container">
                        <div className="stats-heading">
                                <h2>Image Stats</h2>
                        </div>
                        <div className="stats-container">
                            <div className="resultprobability">
                                <div className="ai-probability">
                                    <Meter percentage={apiresponse.ai_probability * 100}/>
                                    <p>AI Probability</p>
                                </div>
                                <div className="human-probability">
                                    <Meter percentage={apiresponse.real_probability * 100}/>
                                   <p> Human Probability</p>
                                </div>
                            </div>
                            <div className="image-stats-details">
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
                </div>
                )}
            </div>
            {isanalyze &&(
            <>
            <Collapsable result={resultoutcomes}/>
            <Warning/>
            <Limit value={imgcredits}/>
            </>
            )}
        </section>
        </>
    )
}
