import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        updateCart: (state, data) => {
            state.cart.push(data.payload);
        },
        removeFromCart: state => {
            // state.cart = []
        }
    }
})

export const { updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice;