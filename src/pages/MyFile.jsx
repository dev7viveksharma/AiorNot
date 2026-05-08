import { useState } from "react";
import Settingbtn from "../Components/Settingbtn";
import { CiImageOn , CiVideoOn } from "react-icons/ci";
import Emptyfile from "../Components/Emptyfile";
import Imagefile from "../Components/Imagefile";
import Videofile from "../Components/Videofile";
import "../Style/MyFile.css";
export default function MyFile(){
    const filecomponents = {
        empty : <Emptyfile/>,
        image : <Imagefile/>,
        video : <Videofile/>
    }

    const [activefile , setactivefile] = useState("empty");
    const handlefiles = (type)=>{
        setactivefile(type);
    }

    return(
        <div className="files">
            <div className="file-container">
                <div className="file-sidebar">
                    <div className="file-header">

                    </div>
                        <Settingbtn name={"Image"} icon ={<CiImageOn/>} action={()=>handlefiles("image")} btnclass={"filebtn"}/>
                        <Settingbtn name={"Video"} icon ={<CiVideoOn/>} action={()=>handlefiles("video")} btnclass={"filebtn"}/>
                </div>
                <div className="file-contentcontainer">
                    {
                        filecomponents[activefile]
                    }
                </div>
            </div>
           
        </div>
    )
}