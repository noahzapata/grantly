import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

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
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROP_MENU_VALIDATOR:
      return {
        ...state,
        dropdown: !state.dropdown,
      };
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: action.payload,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        isLogin: !state.isLogin,
      };
    case SET_ALL_DATAUSER:
      return {
        ...state,
        country: action.payload.country,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
        mobile: action.payload.mobile,
      };
    default:
      return state;
  }
};
export default userReducer;
