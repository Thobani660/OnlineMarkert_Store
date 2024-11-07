import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { useNavigate } from 'react-router-dom'; // For navigating to the checkout page

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to store cart items
  const [isCartVisible, setIsCartVisible] = useState(false); // State to control cart visibility
  const navigate = useNavigate();

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

  // Function to add item to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Function to proceed with checkout
  const handleCheckout = () => {
    if (cart.length > 0) {
      // Here you can navigate to the checkout page or integrate with a payment gateway
      navigate('/checkout', { state: { cartItems: cart } });
    } else {
      alert('Your cart is empty. Please add items to proceed.');
    }
  };

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
                <button style={styles.cardButton} onClick={() => addToCart(product)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No products found</p>
        )}
      </div>

      {/* Cart Icon and Cart Display */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#2ecc71',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        onClick={() => setIsCartVisible(!isCartVisible)}
      >
        Cart ({cart.length})
      </div>

      {/* Cart Popup */}
      {isCartVisible && (
        <div style={styles.cart}>
          <h3 style={styles.cartTitle}>Your Cart</h3>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <div key={index} style={styles.cartItem}>
                  <p>{item.title}</p>
                  <span>${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button style={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </>
          ) : (
            <p style={{ color: '#666' }}>No items in cart</p>
          )}
        </div>
      )}
    </div>
  );
}

// Inline styles for the product cards and cart
const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    width: '250px',
    height: '340px',
    textAlign: 'center',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '130px',
    objectFit: 'cover',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  cardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 180px)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.75rem',
    height: '60px',
    overflow: 'hidden',
  },
  cardPrice: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '1rem',
  },
  cardButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s ease',
  },
  cart: {
    position: 'fixed',
    bottom: '60px',
    left: '20px',
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
    padding: '1rem',
    zIndex: 1000,
  },
  cartTitle: {
    fontSize: '1.2rem',
    color: '#333',
    borderBottom: '1px solid #ddd',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    padding: '0.3rem 0.5rem',
  },
  checkoutButton: {
    marginTop: '1rem',
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
  },
};

export default ProductList;
