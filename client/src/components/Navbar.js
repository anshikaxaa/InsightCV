import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📊</span>
          InsightCV
        </Link>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/upload" className={`nav-link ${isActive('/upload')}`}>
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/analysis" className={`nav-link ${isActive('/analysis')}`}>
              Analysis
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/results" className={`nav-link ${isActive('/results')}`}>
              Results
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 