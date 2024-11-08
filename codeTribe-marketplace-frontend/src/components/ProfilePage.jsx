import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, toggleEditing } from "../../src/features/userSlice";
import { addProduct, setProducts } from "../../src/features/productSlice";
import ProductCard from "./ProductCard"; // ProductCard Component for displaying products
import { getAuth } from "firebase/auth";


function AdminProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isEditing = useSelector((state) => state.user.isEditing);
  const products = useSelector((state) => state.products.products); // Redux state for products

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "", // Added imageUrl field
  });
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Fetch products and user data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(productList)); // Save products in Redux
    };

    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(updateUser(storedUser));
      }
    };

    fetchProducts();
    fetchUserData();
    setIsLoading(false);
  }, [dispatch]);

  const handleUserChange = (e) => {
    const updatedUser = { ...user, [e.target.name]: e.target.value };
    dispatch(updateUser(updatedUser)); // This will update the user in Redux
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  

  const handleSaveUser = async () => {
    if (userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          name: user.name,
          email: user.email,
          address: user.address,
        });
        dispatch(toggleEditing());
        alert("User information updated!");
      } catch (error) {
        console.error("Error updating user: ", error);
        alert("Error updating user information");
      }
    }
  };

  const handleProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        imageUrl: newProduct.imageUrl, // Saving imageUrl
      });

      const newProductData = { ...newProduct, id: docRef.id };

      // Add product to Redux store
      dispatch(addProduct(newProductData));

      // Save product to localStorage
      const updatedProducts = [...products, newProductData];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setNewProduct({
        title: "",
        description: "",
        price: "",
        imageUrl: "", // Reset imageUrl input
      });

      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product: ", error);
      alert("Error creating product");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "2rem",
        fontFamily: "Roboto, sans-serif",
        height: "100vh",
      }}
    >
      {/* Left Side: Profile Information */}
      <div
        style={{
          width: "30%",
          padding: "2rem",
          backgroundColor: "transparent",
          borderRadius: "10px",
          boxShadow: "0 6px 20px blue",
          color:'white'
        }}
      >
        <h2 style={{ color: "#4CAF50", marginBottom: "1rem" }}>User Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleUserChange}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleUserChange}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={handleSaveUser}
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <button
              onClick={() => dispatch(toggleEditing())}
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#2196F3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Middle: New Product Form */}
      <div
        style={{
          width: "30%",
          padding: "2rem",
          backgroundColor: "transparent",
          borderRadius: "10px",
          boxShadow: "0 6px 20px blue",
          alignItems:"center",
          justifyContent: "center",
          textAlign:"center"
        }}
      >
        <h3 style={{ color: "#FF5722", marginBottom: "1rem" }}>
          Create New Product
        </h3>
        <form onSubmit={handleCreateProduct}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleProductChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleProductChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleProductChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Product Image URL"
            value={newProduct.imageUrl}
            onChange={handleProductChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Right Side: Display Products */}
      <div
        style={{
          width: "30%",
          padding: "2rem",
          backgroundColor: "transparent",
          borderRadius: "10px",
          boxShadow: "0 6px 20px blue",
        }}
      >
        <h3 style={{ color: "#4CAF50", marginBottom: "1rem" }}>Products</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
