import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import api from '../api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      setUser(data); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Email or Password');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow border-0">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold">Login to Zenith</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">
                Sign In
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="mb-0 text-muted">New to Zenith Wellness?</p>
              <Link to="/register" className="text-primary fw-bold text-decoration-none">
                Sign Up Now
              </Link>
            </div>
            {/* ------------------------------- */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;