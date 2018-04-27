import { MY_API_URL } from '../constants'

export const fetchIngredients = (userId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_INGREDIENTS_PENDING" })
    // fix this later to dynamically add user_id
    return fetch(`${MY_API_URL}/users/${userId}/ingredients`)
      .then(res => res.json())
      .then(ingredients => dispatch({
        type: "FETCH_INGREDIENTS_FULFILLED",
        payload: ingredients
      })
    )
      .catch(err => dispatch({
        type: "FETCH_INGREDIENTS_REJECTED",
        payload: err
      })
    )
  }
}

export const addIngredient = (ingredient, userId) => {
  return (dispatch) => {
    dispatch({ type: "ADDING_INGREDIENT_PENDING" })
    // fix this later to dynamically add user_id
    return fetch(`${MY_API_URL}/users/${userId}/ingredients`, {
      method: "POST",
      body: JSON.stringify({ingredient: {...ingredient, user_id: userId}}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(ingredient => dispatch({
        type: "ADDING_INGREDIENT_FULFILLED",
        payload: ingredient
      })
    )
      .catch(err => dispatch({
        type: "ADDING_INGREDIENT_REJECTED",
        payload: err
      })
    )
  }
}

export const deleteIngredient = (ingredientId, userId) => {
  return (dispatch) => {
    dispatch({ type: "DELETING_INGREDIENT_PENDING" })
    // fix this later to dynamically add user_id
    return fetch(`${MY_API_URL}/users/${userId}/ingredients/${ingredientId}`, {
      method: "DELETE"
    })
      .then(res => dispatch({
        type: "DELETING_INGREDIENT_FULFILLED",
        payload: ingredientId
      })
    )
      .then(err => dispatch({
        type: "DELETING_INGREDIENT_REJECTED",
        payload: err
      })
    )
  }
}

export const selectIngredient = (ingredientId) => {
  return (dispatch) => {
    dispatch({ type: "SELECT_INGREDIENT", payload: ingredientId })
  }
}

export const deselectIngredient = (ingredientId) => {
  return (dispatch) => {
    dispatch({ type: "DESELECT_INGREDIENT", payload: ingredientId })
  }
}

export const clearSelection = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_SELECTED_INGREDIENTS" })
  }
}
