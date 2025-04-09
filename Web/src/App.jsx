import './App.css'
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Playbar from './components/playbar/playbar'
import Login from './components/login/login'
import SignUp from './components/login/signup'
import Admin from './components/admin/admin.jsx'
import Addbook from './components/admin/addbook.jsx'
import Adduser from './components/admin/adduser.jsx'
import UploadPlaybar from './components/playbar/upload_playbar.jsx'
import AuthorProfile from './components/profile/AuthorProfile.jsx'
import DisplayBooks from './components/searchbar/searchbar.jsx'

function App() {
  return (
    
    <BrowserRouter>
    
    {/* i added this to make sure the playbar is always visible on the page just like spotify, content will be generated from other components on top of it and the playbar will fill the bottom  */}
      <div style={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            <Route path="/testingroute" element={<Admin/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/admin/adduser" element={<Adduser/>}/>
            <Route path="/admin/addbook" element={<Addbook/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile/:username" element={<AuthorProfile/>}/>
            <Route path="/homepage" element={<DisplayBooks/>}/>
          </Routes>
        </div>
        
        <Playbar/>
        
      </div>
    </BrowserRouter>
  )
}

export default App;
