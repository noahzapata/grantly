import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dropdown: false,
  profilePicture: '',
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  birthdate: '',
  genre: '',
  mobile: '',
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      (state.firstName = action.payload.firstName),
        (state.country = action.payload.country),
        (state.firstName = action.payload.firstName),
        (state.lastName = action.payload.lastName),
        (state.email = action.payload.email),
        (state.profilePicture = action.payload.profilePicture),
        (state.mobile = action.payload.mobile);
    },
    setUserLogin: (state, action) => {
      state.isLogin = action.payload.isLogin;
    },
    dropMenuValidator: (state, action) => {
      state.dropdown = action.payload.dropdown;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserData,
  setUserLogin,
  dropMenuValidator,
  setProfilePicture,
} = userSlice.actions;

export default userSlice.reducer;
