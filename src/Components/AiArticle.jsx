import "../Style/AiArticle.css";
export default function AiArticle({heading , image , article}){
    return(
        <>
        <section className="article">
            <div className="article-heading">
                <h2>{heading}</h2>
            </div>
            <div className="article-content">
                <div className="articleimagecontainer">
                    <img src={image} alt="" />
                </div>
                <div className="article-container">
                    <p>
                        {article}
                    </p>
                </div>
            </div>
        </section>
        </>
    )
}