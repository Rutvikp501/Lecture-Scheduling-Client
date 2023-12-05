import React, { useRef,useEffect } from 'react';

export default function VideoPlayer({ url }) {
    const videoRef = useRef(null);
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, []);
  
    return (
      <>
        {/* <ReactPlayer autoPlay ref={playerRef} url={VIDEO_PATH} controls={true}
  loop={true}
  muted={true} /> */}
        <video  src={url} muted loop playsInline autoPlay/>
      </>
    );
  }
  