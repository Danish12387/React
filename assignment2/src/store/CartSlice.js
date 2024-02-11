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
        removeFromCart: (state, action) => {
            const uidToRemove = action.payload;
            state.cart = state.cart.filter(item => item.id !== uidToRemove);
        },
    }
})

export const { updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice;