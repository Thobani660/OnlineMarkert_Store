import React, { useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const handleRemove = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
