import  article from '../../Data/Article.json';
import AiArticle from "../Components/AiArticle";
import "../Style/Ai.css";
export default function Ai(){
    return(
        <>
        <section className="modernai">
            <div className="Aicontent">
                <div className="aiheading">
                    <h2>Modern AI</h2>
                </div>
                <p> 
                    ModerAI is an artificial intelligence system designed for automated content moderation on digital platforms. It analyzes text, images, and other 
                    user-generated content to detect harmful or inappropriate material. The tool uses natural language processing and computer vision models to identify 
                    issues such as hate speech, harassment, explicit imagery, violence, misinformation, and spam. ModerAI operates in real time, allowing platforms to 
                    filter or review content instantly without relying completely on human moderators. <br />

                    The purpose of ModerAI is to create safe and reliable online environments by reducing toxic behaviour and preventing the spread of harmful content. It also helps organizations follow legal and community guidelines. 
                    ModerAI is commonly used in social media platforms, community forums, messaging apps,e-commerce review systems, and educational portals.
                    Its automation reduces the workload of human moderation teams and improves the overall efficiency of content management. <br />

                    Although ModerAI is highly effective, it is not perfect. It can sometimes misunderstand context, especially in sensitive or sarcastic conversations, 
                    and may require human review for complex situations. Continuous updates and training are necessary to maintain accuracy and fairness. Despite these limitations,
                    ModerAI is considered a valuable tool for maintaining digital safety and improving the user experience across modern online platforms. <br />
                </p>
            </div>
            <img src="/image/people-wearing-futuristic-high-tech-virtual-reality-glasses.jpg" alt="Ai image" loading='lazy'/>
        </section>
         <div className="Aiarticle">
                {
                    article.map((article , index)=>
                        <AiArticle heading={article.title} image={article.image} article={article.description} key={index}/>
                )}
        </div>
        </>
    )
}