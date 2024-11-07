import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: '#fff',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          CodeTribe Marketplace
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          style={{
            color: '#fff',
            textDecoration: 'none',
            marginLeft: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            color: '#fff',
            textDecoration: 'none',
            marginLeft: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          Register
        </Link>
        <Link
          to="./ProfilePage"
          style={{
            color: '#fff',
            textDecoration: 'none',
            marginLeft: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
