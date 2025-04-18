import { useState } from 'react';
import './settings.css'

export default function Settings() {
  const [isSideDetailsOpen, setIsSideDetailsOpen] = useState(false);

  const toggleSideDetails = () => {
    setIsSideDetailsOpen(!isSideDetailsOpen);
  };

  return (
    <div className="settings-container">
      
        <h2 className='settext'>Settings</h2>
        <ul>
          <li>Account</li>
          <li>Privacy</li>
        </ul> 

      <div className="settings-content">
        <h3 className='generalset'>General Settings</h3>

        <div className="setting-option">
          <label>Notifications</label>
          <button className="toggle-btn">Enable</button>
        </div>
      </div>
    </div>
  );
}

