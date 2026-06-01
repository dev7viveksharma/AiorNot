export default function Videoplayer({controls , video , autoplay , muted}){
    return(
       <video key={video} controls={controls} controlsList="nodownload" autoPlay={autoplay} muted={muted} onContextMenu={(e) => e.preventDefault()} >
            <source src={video} type="video/mp4" />
        </video>
    )
}