import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

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
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Admin button */}
        <button
          onClick={toggleAdminDropdown}
          style={{
            color: '#fff',
            backgroundColor: '#4CAF50',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginRight: '0.5rem', // Reduced margin
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Admin
        </button>

        {/* Admin Dropdown */}
        {isAdminDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: '#333',
              borderRadius: '5px',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
              zIndex: 1,
              width: '50px', // Optional, to control dropdown width
            }}
          >
            <Link
              to="/login"
              style={{
                display: 'block',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                borderRadius: '5px 5px 0 0',
                width: '50px'

              }}
            >
              Admin Login
            </Link>
            <Link
              to="/Register"
              style={{
                display: 'block',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: '#2196F3',
                borderRadius: '0 0 5px 5px',
                width: '50px'

              }}
            >
              Admin Register
            </Link>
          </div>
        )}
        
        {/* User button */}
        <button
          onClick={toggleUserDropdown}
          style={{
            color: '#fff',
            backgroundColor: '#2196F3',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginRight: '0.5rem', // Reduced margin
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          User
        </button>

        {/* User Dropdown */}
        {isUserDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: '#333',
              borderRadius: '5px',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
              zIndex: 1,
              width: '50px', // Optional, to control dropdown width
            }}
          >
            <Link
              to="/userSignIn"
              style={{
                display: 'block',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: '#2196F3',
                borderRadius: '5px 5px 0 0',
                width: '50px'
              }}
            >
              User Login
            </Link>
            <Link
              to="/userSignUp"
              style={{
                display: 'block',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                borderRadius: '0 0 5px 5px',
                width: '50px'

              }}
            >
              User Register
            </Link>
          </div>
        )}

        {/* Profile button */}
        <Link
          to="/ProfilePage"
          style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            backgroundColor: '#2196F3',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
