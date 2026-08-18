import { useRef , useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Warning from "../Components/Warning";
import Meter from "../Components/Meter";
import Limit from "../Components/Limit";
import Popmessage from "../Components/Ui components/Popmessage";
import PageLoading from "../Components/PageLoading";
import { BiErrorAlt } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import "../Style/Text.css";
export default function Text(){
    const {popup , setpopup } = useOutletContext();
    const textinput = useRef(null);
    const [isloading , setisloading] = useState(false);
    const [insertedtext, setinsertedtext] = useState(false);
    const [credits , setcredits] = useState(0); 
    const [submittext , setsubmittext] = useState('');
    const [textresult , settextresult] = useState({
        aiWords : null ,
        fakePercentage : null,
        isHuman : null ,
        otherFeedback : null,
        sentences : [],
        status : false,
        textWords : null
    });
    const [text , settext] = useState("");

    const handletextsubmit = async () =>{
        const value = textinput.current.value;
        if(value.length <= 400){
            setpopup(prev => ({
                ...prev,
                show: true,
                message : " Input is Too Small" ,
                icon : <BiErrorAlt/>,
                type : "error"
            }));
            return ;
        }
        try {
            setisloading(true);
            const url = 'api/text';
            const response = await axios.post(url , {text : value , type : "text_count"},
                {
                    withCredentials : true
                }
            );

            if(response.data.success){
                setsubmittext(value);
                settextresult(textinput =>({
                    ...textinput , ...response.data.text
                }));
                setinsertedtext(true);
                setcredits(response.data.newcredits);
                textinput.current.value= "";

                setpopup(prev => ({
                    ...prev,
                    show: true,
                    message : "Video Processed Successfully",
                    icon : <HiBadgeCheck/>,
                    type : "success"
                    }));
            }
            } catch (err) {
            if (err.response) {
                // backend sent error
                    setpopup(prev => ({
                    ...prev,
                    show: true,
                    message : err.response.data.message || "Server error" ,
                    icon : <BiErrorAlt/>,
                    type : "error"
                }));
            } else if (err.request) {
                // no response
                    setpopup(prev => ({
                    ...prev,
                    show: true,
                    message : " No Response from Server" ,
                    icon : <BiErrorAlt/>,
                    type : "error"
                }));                    
            } else {
                // other error
                    setpopup(prev => ({
                    ...prev,
                    show: true,
                    message : err.message || "Server error" ,
                    icon : <BiErrorAlt/>,
                    type : "error"
                }));                    }
        }finally{
            setisloading(false);
        }
    }
    return(
        <>
        {popup.show &&
                <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>
        }
        {isloading &&
         <PageLoading/>
        }
        <section className="text">
            <div className="text-main-container">
                <div className="text-detector-container">
                {!insertedtext &&
                    <div className="intro-title">
                        <h1>Detect AI generated Text so no Buddy will Become fool</h1>
                        <p>Just paste your text and Start</p>
                    </div>
                }
                { insertedtext &&
                    <div className="ai-result-container">
                        <div className="routed-text-container">
                            <textarea name="" id="" className="routed-textarea" value={submittext} disabled></textarea>
                        </div>
                        <div className="detected-text-container">
                            <div className="ai-text-details">
                                <div className="text-words-number-container">
                                    <div className="aiwords-container">
                                        <h3>AI Words : </h3>
                                        <h3 className="aiwordsnum">{textresult.aiWords}</h3>
                                    </div>
                                    <div className="totalwords-container">
                                        <h3>Text Words : </h3>
                                        <h3 className="totalwords">{textresult.textWords}</h3>
                                    </div>
                                </div>
                                <div className="aisentence-container">
                                    <div className="sussy-sentence-heading">
                                        <h3>Here are All suspecious sentences</h3>
                                    </div>
                                     <div className="suspecious-sentence">
                                        <ul className="text-list">
                                            {
                                                textresult.sentences.map((sentences , index) =>{
                                                    return <li key={index}>{index+1} : {sentences}</li>
                                                })
                                            }
                                        </ul>
                                    </div>   
                                </div>
                            </div>
                            <div className="text-stats">
                                <div className="ai-probability">
                                   <Meter percentage={textresult.fakePercentage}/>
                                   <p>Ai-Probability</p>
                                </div>
                                <div className="human-probability">
                                    <Meter percentage={textresult.isHuman}/>
                                    <p>Human-Probability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                </div>
                { insertedtext &&
                    <Warning/>
                }
                <div className="textarea-container">
                    <div className="maintext-container">
                        <textarea name="" id="" placeholder="enter your Text" ref={textinput} maxLength={3000}></textarea>
                        <button onClick={handletextsubmit}>Send</button>
                    </div>
                </div>
                <div className="text-error-container">
                    <p className="texterror">
                        {}
                    </p>
                </div>
            </div>
        </section>
        { insertedtext &&
            <Limit value={credits}/>
        }
        </>
    )
}