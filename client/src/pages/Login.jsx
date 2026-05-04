import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page fade-up">
      <div className="auth-card glass">
        <div className="auth-glow auth-glow-primary"></div>

        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-sub">Continue your storytelling journey</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit" className="btn btn-primary btn-full btn-lg auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
