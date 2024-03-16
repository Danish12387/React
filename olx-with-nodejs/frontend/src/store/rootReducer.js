import { combineReducers } from 'redux';
import cartSlice from './cartSlice'
import themeSlice from './themeSlice';

const rootReducer = combineReducers({
    themeReducer: themeSlice.reducer,
    cartReducer: cartSlice.reducer
})

export default rootReducer;