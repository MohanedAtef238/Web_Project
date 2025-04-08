import './App.css'
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Playbar from './components/playbar/playbar'
import Login from './components/login/login'
import SignUp from './components/login/signup'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <Playbar/> 
    </BrowserRouter>

  )
}

export default App;
