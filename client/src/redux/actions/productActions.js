import axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };
};
