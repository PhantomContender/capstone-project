import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">ZENITH WELLNESS</Link>
      </div>
    </nav>
  );
};

export default Navbar;