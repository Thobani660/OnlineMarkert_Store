import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem 0',
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        bottom: '0',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
        fontSize: '0.9rem',
      }}
    >
      <p style={{ margin: '0' }}>&copy; 2024 CodeTribe Marketplace</p>
    </footer>
  );
}

export default Footer;
