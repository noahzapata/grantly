import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicture: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  address: {
    country: '',
    province: '',
    city: '',
  },
  email: '',
  mobile: '',
  comments: [],
  favs: [],
  products: [],
  shoppingHistory: [],

  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      (state.profilePicture = action.payload.profilePicture),
        (state.firstName = action.payload.firstName),
        (state.lastName = action.payload.lastName),
        (state.birthdate = action.payload.birthdate),
        (state.address.country = action.payload.address.country),
        (state.address.province = action.payload.address.province),
        (state.address.city = action.payload.address.city),
        (state.email = action.payload.email),
        (state.mobile = action.payload.mobile),
        (state.comments = action.payload.comments),
        (state.favs = action.payload.favs),
        (state.products = action.payload.mobile),
        (state.shoppingHistory = action.payload.shoppingHistory);
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
