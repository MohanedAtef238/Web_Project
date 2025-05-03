import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Playbar from './components/playbar/playbar';
import Login from './components/login/login';
import SignUp from './components/login/signup';
import Admin from './components/admin/admin.jsx';
import Addbook from './components/admin/addbook.jsx';
import Adduser from './components/admin/adduser.jsx';
import UploadPlaybar from './components/playbar/upload_playbar.jsx';
import AuthorProfile from './components/profile/AuthorProfile.jsx';
import UserProfile from './components/profile/UserProfile.jsx';
import DisplayBooks from './components/displaybooks/displaybooks.jsx';
import Playlist from './components/playlist/Playlist.jsx';
import Book from './components/book/BookView.jsx';
import BrowseCategories from './components/browsecategories/browsecategories.jsx';
import CategoryBooks from './components/Categorypage/catagorypage.jsx';
import Settings from './components/settings/settings.jsx';
import { AuthProvider } from './Context.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Streamer from './components/streamer/streamer.jsx';
import Listener from './components/listener/listener.jsx';

function AppWrapper() {
  const location = useLocation();
  const path = location.pathname;

  const hidePlaybar = path === '/' || path === '/signup' || path.startsWith('/admin');


  return (
    <AuthProvider>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            {/* <Route path="/testingroute" element={<ProtectedRoute><Admin /></ProtectedRoute>} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/admin/adduser" element={<ProtectedRoute><Adduser /></ProtectedRoute>} />
            <Route path="/admin/addbook" element={<ProtectedRoute><Addbook /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:username" element={<AuthorProfile />} />
            <Route path="/userprofile/:username" element={<UserProfile />} />
            <Route path="/homepage" element={<ProtectedRoute><DisplayBooks /></ProtectedRoute>} />
            <Route path="/playlist/:name" element={<Playlist />} />
            <Route path="/book/:title" element={<Book />} />
            <Route path="/browsecategories" element={<BrowseCategories />} />
            <Route path="/browsecategories/:id" element={<CategoryBooks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/streamer" element={<Streamer />} />
            <Route path="/listener" element={<Listener />} />
          </Routes>
        </div>

        {!hidePlaybar && <Playbar />}
      </div>
    </AuthProvider>
  );
}

function App() {
  return (
      <AppWrapper />
  );
}

export default App;
