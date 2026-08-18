import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Videoplayer from "../Components/Videoplayer";
import "../Style/MediaDetail.css";

export default function MediaDetails(){
    const {id , mediaid , mediaType} = useParams();

    const{data , isLoading , error} = useQuery({
        queryKey : ["media"],
        queryFn : async() =>{
            try {
                const response = await axios.get("/File/fetchmedia",{useCredentials : true,
                    params : {
                        id : id ,
                        mediaid : mediaid,
                        mediatype : mediaType
                    }
                });
                if(response.data.success){
                    console.log(response.data.media)
                    return response.data.media;
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                console.log(errorMessage);
           }
        }

    })
    return(
        <section className="mediadetail-container">
            <div className="media-player-container">
                {!isLoading &&
                <div className="media-player">
                    { mediaType === "image" ?
                    (
                        <img className="media-img" src={data.url} alt="" />
                    ):(
                        <Videoplayer controls={true} video={data.url}/>
                    )}
                </div>
                }
            </div>
            <div className="media-details">
                {!isLoading &&
                <>
                <div className="propability-percentage-section">
                    <div className="isAi-section">
                        <h3>Ai-Probability : </h3>
                        <p>{data.aiResult.ai_probability}%</p>
                    </div>
                    <div className="isHuman-section">
                        <h3>Human-Probability : </h3>
                        <p>{data.aiResult.real_probability.toFixed(2)}%</p>
                    </div>
                    <div className="media-ai-result-container">
                        <h3>Is Ai Generated ?</h3>
                        <p>{data.aiResult.is_ai ? "true" : "false"}</p>
                    </div>
                    
                </div>
                <div className="media-report">
                    <div className="media-description">
                        <div className="media-description-header">
                            <h2>Media Details</h2>
                        </div>
                        <div className="media-name">
                            <h3>Media Name : </h3>
                            <p>{data.url.split("/").pop()} </p>
                        </div>
                        <div className="media-type">
                            <h3>Media Type : </h3>
                            <p>{data.mediaType}</p>
                        </div>
                        <div className="media-size">
                            <h3>media Size : </h3>
                            <p>{(data.size/(1024 * 1024)).toFixed(3)}mb</p>
                        </div>
                    </div>
                    <div className="media-other-details-container">
                        <div className="media-prediction-section">
                            <h3>Prediction :</h3>
                            <p>{data.aiResult.prediction}</p>
                        </div>
                        <div className="media-certainity-lvl-section">
                            <h3>Certainity Level :</h3>
                            <p>{data.aiResult.certainty_level}</p>
                        </div>
                    </div>
                </div>
                </>
                }
            </div>
        </section>
    )
        
}