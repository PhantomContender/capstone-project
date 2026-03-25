import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () =>
{
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUser(null); 
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ZENITH WELLNESS
        </Link>
        
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Home</Link>

          {user ? (
            <>
              <span className="nav-link text-info">Hello, {user.name}</span>
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="nav-link text-muted">Hello, Guest</span>
              <Link className="nav-link" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;