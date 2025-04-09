import { useState } from 'react';
import './playbar.css';
import SideDetails from '../sideDetails/SideDetails';

export default function Playbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSideDetailsOpen, setIsSideDetailsOpen] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying); 

    if(isPlaying){

    }
  };

  const toggleSideDetails = () => {
    setIsSideDetailsOpen(!isSideDetailsOpen);
  };

  return (
    <>
      <div id="audio-player-container">
        <div id="playbar-actions">
          <div className="controls">
            <button className="skip-icon" style={{ transform: 'scaleX(-1)' }}></button>
            <button id="play-icon" onClick={togglePlay} className={isPlaying ? 'playing' : 'paused'}></button>
            <button className="skip-icon"></button>
          </div>
          <button className="hamburger-menu" onClick={toggleSideDetails}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <br></br>
        <div id="time-bar">
          <input type="range" id="seek-slider" max="100" defaultValue="0" />
          <span id="current-time" className="time" style={{ marginBottom: '1%' }}>0:00</span>
        </div>
      </div>
      <SideDetails isOpen={isSideDetailsOpen} onClose={() => setIsSideDetailsOpen(false)} />
    </>
  );
}
  