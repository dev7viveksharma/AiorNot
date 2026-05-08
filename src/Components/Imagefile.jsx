import StorageLimitBar from "./Ui components/StorageLimitBar";
import FileLoader from "../Components/Loaders/FileLoader";
import FileThumbnail from "./Ui components/FileThumbnail";
import "../Style/Imagefile.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Imagefile(){
    const [fileloading , setfileloading] = useState(true);
    const [imagefiles , setimagefiles] = useState([]);
    const [usage , setusage]=useState({
        total : null,
        totalformat : null,
        used : null,
        usedformat : null
    });
    const loaderlength = Array.from({length : 14});

    useEffect(()=>{
        const getfile = async() =>{
            try {
                const url = 'File/getimage';
                const response = await axios.get(url,{withCredentials : true});
                if(response.data.success){
                    setimagefiles(response.data.images);
                    setusage({
                        total : response.data.planlimit.size,
                        totalformat : response.data.planlimit.sizeformat,
                        used : response.data.userused.size,
                        usedformat : response.data.userused.sizeformat
                    });

                    console.log(usage);
                    setfileloading(false);
                }
                
            } catch (error) {
                console.log(error);
            }finally{
                setfileloading(false);
            }
        }
        getfile();
        console.log(usage);
    },[]);
    return(
        <>
        <div className="file-image-container">
            <div className="limitheader">
                {!fileloading &&
                <StorageLimitBar total={usage.total} totalformat={usage.totalformat} used={usage.used} usedformat={usage.usedformat}/>
                }
            </div>
            <div className="my-file-section">
                {fileloading ?(
                    loaderlength.map((_,i)=>(
                        <FileLoader key={i}/>
                    ))
                    ):(
                        imagefiles.map((image , index)=>(
                            <FileThumbnail title={image.url.split("/").pop()} image={image.url} key={index}/>
                        ))
                    
                    )
                }
            </div>
        </div>
        </>
    )
}