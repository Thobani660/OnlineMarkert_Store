// src/components/UserSignUp.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }))
      .then(() => navigate('/userSignIn'))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{height:'100vh'}}>
        <div style={styles.container}>
      <h2 style={styles.heading}>User Sign Up</h2>
      <form onSubmit={handleSignUp} style={styles.form}>
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
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      {status === 'loading' && <p style={styles.message}>Registering...</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '150px'
      },
  heading: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    marginTop: '1rem',
  },
};

export default UserSignUp;
