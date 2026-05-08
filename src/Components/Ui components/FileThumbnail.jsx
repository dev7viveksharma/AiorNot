import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./FileThumbnail.css";
export default function FileThumbnail({title , image}){
    const [isopen  , setisopen] = useState(false);
    return (
        <>
        <div className="file-card-container">
            <div className="file-card-thumbnail-header">
                <p>{title}</p>
                <span className="thumbnail-features-container" onClick={()=>setisopen(!isopen)}>
                    <BsThreeDotsVertical/>
                </span>
            </div>
            <div className="file-Thumbnail">
                <img className="img-thumbnail" src={image} alt="" />
                <div className="cover-view-overlay">
                    <p>View</p>
                </div>
            <div className={`file-menu ${isopen?"show" : ""}`}>
                    <p>Edit</p>
                    <p>Delete</p>
                    <p>Share</p>
                </div>
            </div>
        </div>
        </>
    )
}