import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA',
  },
  isEditing: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    toggleEditing(state) {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { updateUser, toggleEditing } = userSlice.actions;
export default userSlice.reducer;
