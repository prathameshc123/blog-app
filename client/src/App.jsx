import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-wrapper">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/login"           element={<Login />} />
              <Route path="/register"        element={<Register />} />
              <Route path="/posts/create"    element={<CreatePost />} />
              <Route path="/posts/:id/edit"  element={<EditPost />} />
              <Route path="/posts/:id"       element={<PostDetail />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2026 BlogGlow — Write. Share. Inspire.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
