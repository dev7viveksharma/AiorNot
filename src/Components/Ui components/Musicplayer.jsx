import { useRef , useState , useEffect } from 'react';
import MediaThemeTailwindAudio from 'player.style/tailwind-audio/react';

export default function Musicplayer({playing , setPlaying , url}) {

    const audioRef = useRef(null);

    useEffect(()=>{

        const audio = audioRef.current;

        const handlePlay = ()=>{
            setPlaying(true);
        };

        const handlePause = ()=>{
            setPlaying(false);
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return ()=>{

            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);

        };

    },[]);

  return (
    <>
      <MediaThemeTailwindAudio style={{width: "100%"}}>
        <audio
          ref={audioRef}
          slot="media"
          src={url}
          playsInline
          crossOrigin="anonymous"
        ></audio>
      </MediaThemeTailwindAudio>
    </>
  );
}