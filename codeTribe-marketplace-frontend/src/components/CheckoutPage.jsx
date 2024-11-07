// CheckoutPage.js

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../features/cartSlice'; // Add your slice actions for cart
import { useNavigate } from 'react-router-dom';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QB9mNFVlr9lrfFny3IGaUqxWFZalmgeV9GNYq4WNuMlugGENoOBp06IMRsHwnIaAr9BxBxHai40mM4Kuie0p96i00EcHan4cV');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Total Price Calculation
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  // Handle Payment Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    // Call your backend to create the PaymentIntent
    const { clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount * 100 }), // Amount in cents
    }).then((res) => res.json());

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else {
      dispatch(clearCart());
      navigate('/confirmation'); // Redirect to a confirmation page
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => dispatch(removeItemFromCart(item.id))} style={styles.removeButton}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <CardElement />
          <button type="submit" disabled={!stripe} style={styles.submitButton}>
            Pay Now
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </form>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <CheckoutForm />
    </div>
  </Elements>
);

// Inline styles
const styles = {
  removeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.25rem 0.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default CheckoutPage;
