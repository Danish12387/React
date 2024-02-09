import { combineReducers } from 'redux'
import CartSlice from './CartSlice'

const rootReducer = combineReducers({
    cartReducer: CartSlice.reducer
})

export default rootReducer;