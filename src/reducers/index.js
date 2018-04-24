import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients_reducer'

export default combineReducers({
  ingredients: ingredientsReducer,
})
