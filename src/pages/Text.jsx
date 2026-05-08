import { useRef , useState } from "react";
import axios from "axios";
import Warning from "../Components/Warning";
import Meter from "../Components/Meter";
import "../Style/Text.css";
import { useAuth } from "../AuthProvider";
export default function Text(){
    const {isloading , setisloading} = useAuth();
    const textinput = useRef(null);
    const [insertedtext, setinsertedtext] = useState(false);
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
    const [texterror , settexterror] = useState(null);
    const [text , settext] = useState("");
    const handletextsubmit = async () =>{
        const value = textinput.current.value;
        if(value.length >= 400){
            try {
                setisloading(true);
                settexterror(null);
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

                    textinput.current.value= "";
                }
                } catch (err) {
                        if (err.response) {
                        // backend sent error
                        settexterror(err.response.data.message || "Server error");
                    } else if (err.request) {
                        // no response
                        settexterror("No response from server");
                    } else {
                        // other error
                        settexterror("Error: " + err.message);
                    }
                }finally{
                    setisloading(false);
                }
        }
    }
    return(
        <>
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
                        {
                            texterror
                        }
                    </p>
                </div>
            </div>
        </section>
        </>
    )
}