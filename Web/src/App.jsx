import './App.css'
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Playbar from './components/playbar/playbar'
import Login from './components/login/login'
import SignUp from './components/login/signup'
import Admin from './components/admin/admin.jsx'
import Addbook from './components/admin/addbook.jsx'
import Adduser from './components/admin/adduser.jsx'
import UploadPlaybar from './components/playbar/upload_playbar.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testingroute" element={<Admin/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/adduser" element={<Adduser/>}/>
        <Route path="/admin/addbook" element={<Addbook/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <Playbar/> 
    </BrowserRouter>

  )
}

export default App;
