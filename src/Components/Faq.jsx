import { IoIosArrowDown , IoIosArrowUp } from "react-icons/io";
import '../Style/Faq.css';
import { useState } from "react";
export default function Faq({answer , question}){
    const [isopen , setisopen] = useState(false);
    const handledropdown =  () =>{
        setisopen(!isopen);
    }
    return(
        <>
        <div className="faq">
            <div className="question">
                <p>{question}</p>
               {
                !isopen ? <IoIosArrowDown onClick={handledropdown} className="arrow"/> :  <IoIosArrowUp onClick={handledropdown} className="arrow"/>
               }
            </div>
            {isopen &&
            <div className="answer">
                <p>{answer}</p>
            </div>
            }
        </div>
        </>
    )
}