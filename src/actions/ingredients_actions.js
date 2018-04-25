export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_INGREDIENTS_PENDING" })
    // fix this later to dynamically add user_id
    return fetch("http://localhost:3000/api/v1/users/1/ingredients")
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

export const addIngredient = (ingredient) => {
  return (dispatch) => {
    dispatch({ type: "ADDING_INGREDIENT_PENDING" })
    // fix this later to dynamically add user_id
    return fetch("http://localhost:3000/api/v1/users/1/ingredients", {
      method: "POST",
      body: JSON.stringify({ingredient: {...ingredient, user_id: 1}}),
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

export const deleteIngredient = (ingredientId) => {
  return (dispatch) => {
    dispatch({ type: "DELETING_INGREDIENT_PENDING" })
    // fix this later to dynamically add user_id
    return fetch(`http://localhost:3000/api/v1/users/1/ingredients/${ingredientId}`, {
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
