import '../Style/ImageC.css';
export default function Image({src , transform}){
    return(
        <>
        <div className="wrapper" style={{ '--customTransform': transform }} >
        <img className="imagecomponent" src={src} alt=""/>
        </div>
        </>
    )
}