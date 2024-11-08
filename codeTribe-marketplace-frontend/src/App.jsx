import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import UserSignIn from "./components/userSignIn";
import UserSignUp from "./components/userSignUp";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/userSignIn" element={<UserSignIn />} />
            <Route path="/userSignUp" element={<UserSignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
