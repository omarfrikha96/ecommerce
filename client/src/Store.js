import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo') //bring init value of userInfo from local storage
    ? JSON.parse(localStorage.getItem('userInfo')) // if is true convert cartItems from string to JSON
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    cartItems: localStorage.getItem('cartItems') //bring init value of cartItems from local storage
      ? JSON.parse(localStorage.getItem('cartItems')) // if is true convert cartItems from string to JSON
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); //store in local storage type script with key cartItems
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      //use filter to delete item from cart
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); //store in local storage type script with key cartItems
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],  //rest to empty array
          shippingAddress: {}, //rest to empty object
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
