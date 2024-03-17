import { combineReducers } from 'redux';
import cartSlice from './cartSlice'
import themeSlice from './themeSlice';
import tokenSlice from './tokenSlice.mjs';

const rootReducer = combineReducers({
    themeReducer: themeSlice.reducer,
    cartReducer: cartSlice.reducer,
    tokenReducer: tokenSlice.reducer
})

export default rootReducer;