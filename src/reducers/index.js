import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients_reducer'
import { recipesReducer } from './recipes_reducer'
import { userReducer } from './user_reducer'

export default combineReducers({
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
  user: userReducer,
})
