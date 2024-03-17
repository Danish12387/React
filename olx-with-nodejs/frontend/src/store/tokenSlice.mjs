import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: ''
    },
    reducers: {
        updateToken: (state, data) => {
            state.token = data.payload;
        },
        removeToken: (state, action) => {
            // const uidToRemove = action.payload;
            // state.cart = state.cart.filter(item => item.id !== uidToRemove);
        }
    }
})

export const { updateToken, removeToken } = tokenSlice.actions;

export default tokenSlice;