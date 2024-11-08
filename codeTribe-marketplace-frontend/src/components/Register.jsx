import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../features/authSlice';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }))
      .unwrap()
      .then(() => {
        alert("Registration successful!");
        navigate('/login');
      })
      .catch((error) => {
        alert("Error registering: " + error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Register</button>
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
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: 'transparent',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px blue',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: 'white'
  },
  title: {
    color: 'white',
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

export default RegisterPage;
