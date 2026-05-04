import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page fade-up">
      <div className="auth-card glass">
        <div className="auth-glow auth-glow-secondary"></div>

        <div className="auth-header">
          <h2 className="auth-title">Get Started</h2>
          <p className="auth-sub">Join our community of storytellers</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="johndoe"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="input"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-white btn-full btn-lg auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
