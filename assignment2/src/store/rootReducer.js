import { combineReducers } from 'redux'
import CartSlice from './CartSlice'

export default combineReducers({
  cartReducer: CartSlice.reducer
})