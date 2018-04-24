// export const addIngredient = (ingredient) => {
//   return {
//     type: "ADD_INGREDIENT",
//     payload: ingredient
//   }
// }

export const addIngredient = (ingredient) => {
  return (dispatch) => {
    dispatch({ type: "ADDING_INGREDIENT_PENDING" })
    return fetch("http://localhost:3000/api/v1/users/1/ingredients", {
      method: "POST",
      // fix this later to dynamically add user_id
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
    }))
    .catch(err => dispatch({
      type: "ADDING_INGREDIENT_REJECTED",
      payload: err
    }))
  }
}

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_INGREDIENTS_PENDING" })
    return fetch("http://localhost:3000/api/v1/users/1/ingredients")
    .then(res => res.json())
    .then(ingredients => {dispatch({
      type: "FETCH_INGREDIENTS_FULFILLED",
      payload: ingredients
    })})
    .catch(err => dispatch({
      type: "FETCH_INGREDIENTS_REJECTED",
      payload: err
    }))
  }
}
