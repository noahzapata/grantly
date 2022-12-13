import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const initialState = {
  cart: { cartItems: [] },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    },

    removeFromOrder: (state, action) => {
      const index = state.cart.cartItems.findIndex(
        (orderItem) => orderItem.id === action.payload.id
      );
      let newOrder = [...state.cart.cartItems];
      if (index >= 0) {
        //the item exists in order; remove it
        newOrder.splice(index, 1); //(position, number of item to delete)
      } else {
        console.warn(
          `can not remove item(id: ${action.payload.id}) as its not in the order`
        );
      }
      state.cart.cartItems = newOrder;
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.order,
        };
      },
    },
  },
});

export const { addToOrder, removeFromOrder } = orderSlice.actions;

export const selectItems = (state) => state.order.cart;
export const selectTotal = (state) =>
  state.order.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export default orderSlice.reducer;
