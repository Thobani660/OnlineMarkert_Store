import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../firebase';

// Async thunk for user registration
export const registerUser = createAsyncThunk('user/register', async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

// Async thunk for user sign-in
export const signInUser = createAsyncThunk('user/signIn', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    isEditing: false, // Added for toggleEditing functionality
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, toggleEditing, updateUser } = userSlice.actions; // Export updateUser
export default userSlice.reducer;
