// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Firebase config
import { loginUser } from '../../firebase'; // Import the login user action
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/adminProfile'); // Adjust route to admin profile
        } else {
          navigate('/userProfile'); // Adjust route to user profile
        }
      }

      // Dispatch user data to Redux store
      dispatch(loginUser(user));

    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '600',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
};

export default LoginPage;
