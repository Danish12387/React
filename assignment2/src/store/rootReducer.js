import { combineReducers } from 'redux';
import cartSlice from './CartSlice';
import themeSlice from './themeSlice';

const rootReducer = combineReducers({
    themeReducer: themeSlice.reducer,
    cartReducer: cartSlice.reducer
})

export default rootReducer;export default rootReducer;
export default rootReducer;
