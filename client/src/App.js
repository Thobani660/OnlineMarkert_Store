import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductForm from './components/ProductForm';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/products" component={ProductList} />
          <Route path="/cart" component={Cart} />
          <Route path="/add-product" component={ProductForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
