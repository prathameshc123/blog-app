import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar glass">
      <Link to="/" className="navbar-logo">BLOGGLOW</Link>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Explore</Link>
        <div className="navbar-divider"></div>
        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/posts/create" className="btn btn-primary">Write</Link>
              <div className="navbar-user">
                <div className="navbar-avatar">{user.username[0].toUpperCase()}</div>
                <button onClick={handleLogout} className="btn-danger">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Sign In</Link>
              <Link to="/register" className="btn btn-white">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
