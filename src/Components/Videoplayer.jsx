export default function Videoplayer({video , autoplay , muted}){
    return(
       <video key={video} controls controlsList="nodownload" autoPlay={autoplay} muted={muted} onContextMenu={(e) => e.preventDefault()} >
            <source src={video} type="video/mp4" />
        </video>
    )
}