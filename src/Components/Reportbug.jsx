import { useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { BiErrorAlt } from "react-icons/bi";
import CircularLoader from "./Loaders/CircularLoader";
import Popmessage from "./Ui components/Popmessage";
import Input from "./Input";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "../Style/Reportbug.css";

export default function Reportbug({info}){
    const {popup , setpopup} = useOutletContext();
    const [isloading , setisloading] = useState(false);
    const [reportinfo , setreportinfo] = useState({
        firstname : info.firstname,
        lastname : info.lastname,
        reportmail : info.email,
        bugType : "",
        buglvl : "",
        bugfile : null,
        bugdescription : "",
        AgreeTC : false
    });

    const storeinfo = (event) =>{
        const {id , value} = event.target;
        setreportinfo((data)=>({
            ...data , 
            [id] : value
        }));
    }

    const storeEvidenceFile = (event) =>{
        setreportinfo((prev)=>({
            ...prev , 
            bugfile : event.target.files[0] || null
        }));
    }

    const handleReportBug = async(event) =>{
        event.preventDefault();
        try {
            if(reportinfo.bugType === "" && reportinfo.buglvl === ""){
                throw new Error("Please Select all fields");
            }
            setisloading(true);
            const formData = new FormData();

            formData.append("bugType", reportinfo.bugType);
            formData.append("buglvl", reportinfo.buglvl);
            formData.append("bugfile", reportinfo.bugfile);
            formData.append("bugdescription", reportinfo.bugdescription);
            formData.append("AgreeTC", reportinfo.AgreeTC);

            const url = "report/ReportBug";

            const response = await axios.post(url , formData ,{withCredentials : true});

            if(response.data.success){
                setpopup((prev)=>({
                    ...prev , 
                    show : true,
                    message : response.data.message,
                    icon : <HiBadgeCheck/>,
                    type : "success"
                }));
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
            console.log(errorMessage);
        }finally{
            setisloading(false);
        }
    }
    return(
        <div className="bug-report-parent-container">
            {
                popup.show &&
                <Popmessage message={popup.message} icon={popup.icon} onclose={() =>setpopup(prev => ({ ...prev, show: false }))} type={popup.type}/>

            }
            <div className="report-bug-container">
                <div className="reportbug-card">
                    <h2 className="report-card-heading">F🔍und a Bug ? </h2>
                    <form action="" className="reportbug-form" onSubmit={handleReportBug}>
                        <div className="username-report-section">
                            <div className="firstname-section">
                                <label htmlFor="firstname" className="contact-label">First Name</label>
                                <Input type={"text"} placeholder={"first name"} id={"firstname"} inputclass={"feedback-input report-input"} value={reportinfo.firstname} readOnly={true}/>
                            </div>
                            <div className="lastname-section">
                                <label htmlFor="lastname" className="contact-label">Last Name</label>
                                <Input type={"text"} placeholder={"last name"} id={"lastname"} inputclass={"feedback-input report-input"} value={reportinfo.lastname} readOnly={true}/>
                            </div>
                        </div>
                        <div className="user-report-email-section">
                            <label htmlFor="reportmail" className="contact-label">Email Address</label>
                            <Input type={"email"} placeholder={"email address"} id={"reportmail"} inputclass={"feedback-input report-input"} value={reportinfo.reportmail} readOnly={true}/>
                        </div>
                        <div className="report-description-section">
                            <div className="bug-type-section">
                                <label htmlFor="bugType" className="contact-label">Bug Type</label>
                                <select id="bugType" name="bugType" className="feedback-input report-input" value={reportinfo.bugType} onChange={storeinfo} required>
                                    <option value=""> Select Bug Type</option>
                                    <option value="not working">Something isn't working</option>
                                    <option value="incorrect result">Incorrect result</option>
                                    <option value="upload problem">Upload problem</option>
                                    <option value="performance">Slow or performance issue</option>
                                    <option value="ui layout">UI / layout problem</option>
                                    <option value="error crash">Error message or crash</option>
                                    <option value="security">Security or privacy concern</option>
                                    <option value="other">Other issue</option>
                                </select>
                            </div>
                            <div className="bug-level-section">
                                <label htmlFor="buglvl" className="contact-label">Bug Level</label>
                                <select id="buglvl" className="feedback-input report-input" value={reportinfo.buglvl} onChange={storeinfo} required>
                                    <option  value="" >select bug level</option>
                                    <option  value="Low">Low</option>
                                    <option  value="Moderate">Moderate</option>
                                    <option  value="High">High</option>
                                    <option  value="Severe">Severe</option>
                                </select>
                            </div>
                        </div>
                        <div className="bug-file-section">
                            <label htmlFor="bugfile">Add a Visual Bug Proof</label>
                            <input id="bugfile" type="file" className="bug-file-input " onChange={storeEvidenceFile} accept="image/*,video/*"/>
                        </div>
                         <div className="bug-description-section">
                            <label htmlFor="bugdescription" className="contact-label">Describe Bug </label>
                            <textarea name="" id="bugdescription" className="bugreport-textarea" onChange={storeinfo} value={reportinfo.bugdescription}></textarea>
                        </div>
                        <div className="report-submit-section">
                            <p><input type="checkbox" id="AgreeTC" onChange={(event)=> {setreportinfo((prev)=>({...prev , AgreeTC : event.target.checked }))}} /> you agree to our <a href="#" >terms </a>and <a href="#">privacy policy</a></p>
                            <button type="submit" className="report-submitbtn " disabled ={reportinfo.bugdescription.length !== 0 && reportinfo.AgreeTC && !isloading ? false : true}>{ isloading ? <CircularLoader/> : "Send"}</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}