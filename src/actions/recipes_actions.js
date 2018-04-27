// URLS
import { MY_API_URL } from '../constants'

export const fetchRecipes = (page) => {
  // debugger
  return (dispatch) => {
    dispatch({ type: "FETCH_RECIPES_PENDING"})
    fetch(`${MY_API_URL}/fetch_recipes?q=${page}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "FETCH_RECIPES_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria.allowedIngredient
          }
        })
      })
      .catch(err => dispatch({
        type: "FETCH_RECIPES_REJECTED",
        payload: err
      })
    )
  }
}

export const fetchFavorites = (userId) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_FAVORITES_PENDING" })
    fetch(`${MY_API_URL}/users/${userId}/favorites`)
      .then(res => res.json())
      .then(favorites => {
        dispatch({
        type: "FETCH_FAVORITES_FULFILLED",
        payload: favorites
      })}
    )
      .catch(err => dispatch({
        type: "FETCH_FAVORITES_REJECTED",
        payload: err
      })
    )
  }
}

export const decreasePage = () => {
  return (dispatch) => {
    dispatch({ type: "DECREASE_RECIPES_PAGE" })
  }
}

export const increasePage = () => {
  return (dispatch) => {
    dispatch({ type: "INCREASE_RECIPES_PAGE" })
  }
}

export const fetchRecipeImage = () => {

}

export const searchRecipesInitial = (ingredients) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_RECIPES_WITH_INGREDIENTS_PENDING" })
    fetch(`${MY_API_URL}/search_recipes`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
        q: 0
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
          dispatch({
          type: "SEARCH_RECIPES_WITH_INGREDIENTS_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria.allowedIngredient
          }
        })
      }
    )
      .catch(err => dispatch({
        type: "SEARCH_RECIPES_WITH_INGREDIENTS_REJECTED",
        payload: err
      })
    )
  }
}

export const searchRecipes = (ingredients, page) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_PENDING" })
    fetch(`${MY_API_URL}/search_recipes`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
        q: page
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        // debugger
          dispatch({
          type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria.allowedIngredient
          }
        })
      }
    )
      .catch(err => dispatch({
        type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_REJECTED",
        payload: err
      })
    )
  }
}

export const getRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_RECIPE_PENDING"})
    fetch(`${MY_API_URL}/find_recipe?q=${recipeId}`)
      .then(res => res.json())
      .then(json => dispatch({
        type: "SEARCH_RECIPE_FULFILLED",
        payload: json
      })
    )
      .catch(err => dispatch({
        type: "SEARCH_RECIPE_REJECTED",
        payload: err
      })
    )
  }
}

export const backToRecipes = () => {
  return (dispatch) => {
    dispatch({ type: "BACK_TO_RECIPES" })
  }
}

export const addFavorite = (recipe, userId) => {
  let draftBody = {
    ...{},
    recipe: {
      recipeId: recipe.id,
      recipeName: recipe.recipeName,
      totalTimeInSeconds: recipe.totalTimeInSeconds
    },
    user_id: userId,
    ingredients: recipe.ingredients
  }
  let body = recipe.smallImageUrls
  ?
  { ...draftBody, recipe: { ...draftBody.recipe, smallImageUrls: recipe.smallImageUrls[0] } }
  :
  { ...draftBody, recipe: { ...draftBody.recipe, smallImageUrls: "" } }

  return (dispatch) => {
    dispatch({ type: "ADDING_FAVORITE_PENDING", payload: recipe })
    fetch(`${MY_API_URL}/recipes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(recipe => dispatch({
          type: "ADDING_FAVORITE_FULFILLED"
        })
      )
  }
}

export const removeFavorite = (recipe, userId) => {
  return (dispatch) => {
    dispatch({ type: "REMOVING_FAVORITE_PENDING", payload: recipe })
    fetch(`${MY_API_URL}/user_recipes/delete`, {
      method: "POST",
      body: JSON.stringify({user_id: userId, recipeId: recipe.id}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => dispatch({
        type: "REMOVING_FAVORITE_FULFILLED"
      })
    )
  }
}
