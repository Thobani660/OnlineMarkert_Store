import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QB9mNFVlr9lrfFny3IGaUqxWFZalmgeV9GNYq4WNuMlugGENoOBp06IMRsHwnIaAr9BxBxHai40mM4Kuie0p96i00EcHan4cV'); // Replace with your public key

const ProductCard = ({ product }) => {
  const handleBuyNow = async () => {
    try {
      // Call your backend to create a Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Stripe checkout error: ', error);
        alert('Error redirecting to Stripe Checkout');
      }
    } catch (error) {
      console.error('Error in creating Stripe session: ', error);
      alert('Error with payment gateway');
    }
  };

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>${(product.price / 100).toFixed(2)}</p>
      <button style={styles.button} onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
    margin: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem',
    fontSize: '16px',
  },
};

export default ProductCard;
