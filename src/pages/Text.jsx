import { useRef , useState } from "react";
import Warning from "../Components/Warning";
import Meter from "../Components/Meter";
import "../Style/Text.css";
export default function Text(){
    const textinput = useRef(null);
    let [insertedtext, setinsertedtext] = useState(false);
    let [submittext , setsubmittext] = useState('');
    const [text , settext] = useState("");
    const handletextsubmit = async () =>{
        const value = textinput.current.value;
        if(value.length >= 20){
            try {
                const url = '/text';
                const response = await axios.get(url , {text : text},
                    {
                        withCredentials : true
                    }
                );
                } catch (error) {
                
                }
            setsubmittext(value);
            setinsertedtext(true);
            textinput.current.value= "";
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
                            <textarea name="" id="" className="routed-textarea" value={submittext}></textarea>
                        </div>
                        <div className="detected-text-container">
                            <p></p>
                            <div className="text-stats">
                                <div className="ai-probability">
                                   <Meter/>
                                   <p>Ai-Probability</p>
                                </div>
                                <div className="human-probability">
                                    <Meter/>
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
                        <textarea name="" id="" placeholder="enter your Text" ref={textinput}></textarea>
                        <button onClick={handletextsubmit}>Send</button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}