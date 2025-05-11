import { useEffect, useRef, useState } from 'react';
import './playbar.css';
import SideDetails from '../sideDetails/SideDetails';
import dummyaudio from '../../../public/sample.mp3';

export default function Playbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSideDetailsOpen, setIsSideDetailsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef(null);
  const sliderRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();

    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log('no audio selected')
      return;}
      else console.log('there is audio');

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (sliderRef.current) {
        sliderRef.current.value = (audio.currentTime / audio.duration) * 100 || 0;
      }
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const formatTime = (seconds) => { 
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleSideDetails = () => {
    setIsSideDetailsOpen(!isSideDetailsOpen);
  };


/////////////////////////////////////////
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);


////////////////////////////////////////

  return (
    <>
      <div id="audio-player-container">
        <div id="playbar-actions">
          <div className="controls">
            <button className="skip-icon" style={{ transform: 'scaleX(-1)' }}></button>
            <button
              id="play-icon"
              onClick={togglePlay}
              className={isPlaying ? 'playing' : 'paused'}
            ></button>
            <button className="skip-icon"></button>
          </div>

          {/* /////////////////////////////////////// */}
             <select 
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="text-sm px-2 py-1 rounded bg-gray-800 text-white">
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
          {/* /////////////////////////////////////// */}

          <button className="hamburger-menu" onClick={toggleSideDetails}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div id="time-bar">
          <input type="range" id="seek-slider" max="100" value={(currentTime / duration) * 100 || 0} onChange={handleSeek}/>
          <span id="current-time" className="time" style={{ marginBottom: '1%' }}>
            {formatTime(currentTime)}/ {formatTime(duration)}
          </span>
        </div>
      </div>

     
      <audio ref={audioRef} src={dummyaudio}/>

      <SideDetails isOpen={isSideDetailsOpen} onClose={() => setIsSideDetailsOpen(false)} />
    </>
  );
}
