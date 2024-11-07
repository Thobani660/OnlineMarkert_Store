import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => setError('Failed to fetch products'));
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  };

  const productCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '15px',
    width: '300px',
    textAlign: 'center',
  };

  const productNameStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const productDescriptionStyle = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  };

  const productPriceStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Product List</h2>
      {error && <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <h3 style={productNameStyle}>{product.name}</h3>
            <p style={productDescriptionStyle}>{product.description}</p>
            <p style={productPriceStyle}>${product.price}</p>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
