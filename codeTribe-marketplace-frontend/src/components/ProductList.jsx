import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

function ProductList() {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>Product List</h2>
      <div style={styles.cardContainer}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={styles.card}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/300'}
                alt={product.title}
                style={styles.cardImage}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{product.title}</h3>
                <p style={styles.cardDescription}>{product.description}</p>
                <span style={styles.cardPrice}>${product.price}</span>
                <button style={styles.cardButton}>Buy Now</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No products found</p>
        )}
      </div>
    </div>
  );
}

// Inline styles for the product cards
const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem', // Reduced gap between cards
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px', // Slightly smaller border radius
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    width: '250px', // Reduced width of the card
    height: '340px', // Reduced height of the card
    textAlign: 'center',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '130px', // Reduced image height
    objectFit: 'cover',
    borderTopLeftRadius: '8px', // Slightly smaller border radius
    borderTopRightRadius: '8px', // Slightly smaller border radius
  },
  cardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 180px)', // Ensures padding and description fit within card height
  },
  cardTitle: {
    fontSize: '1.25rem', // Reduced font size
    color: '#333',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: '0.9rem', // Reduced font size
    color: '#666',
    marginBottom: '0.75rem',
    height: '60px', // Height for description
    overflow: 'hidden',
  },
  cardPrice: {
    fontSize: '1.1rem', // Slightly smaller price font size
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '1rem',
  },
  cardButton: {
    padding: '0.5rem 1rem', // Smaller padding for the button
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem', // Smaller button text size
    transition: 'background-color 0.3s ease',
  },
};

export default ProductList;
