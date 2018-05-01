// URLS
import { MY_API_URL } from '../constants'

export const fetchRecipes = (page) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_RECIPES_PENDING"})
    fetch(`${MY_API_URL}/fetch_recipes?q=${page}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "FETCH_RECIPES_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria
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
        let parsed = favorites.map( fave => {
          return {
            ...fave,
            ingredients: JSON.parse(fave.ingredients),
            attributes: {cuisine: JSON.parse(fave.cuisines_list)},
            smallImageUrls: [fave.smallImageUrls]
          }
        } )
        dispatch({
        type: "FETCH_FAVORITES_FULFILLED",
        payload: parsed
      })}
    )
      .catch(err => dispatch({
        type: "FETCH_FAVORITES_REJECTED",
        payload: err
      })
    )
  }
}

export const toggleBrowse = () => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_BROWSE" })
  }
}

export const toggleFavorites = () => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_FAVORITES" })
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

export const searchRecipesInitial = (ingredients, cuisine, course, allergies, diets) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_RECIPES_WITH_INGREDIENTS_PENDING", payload: {cuisine, course, ingredients, allergies, diets} })
    fetch(`${MY_API_URL}/search_recipes`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
        cuisine: cuisine,
        course: course,
        allergies: allergies,
        diets: diets,
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
            criteria: json.criteria
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

export const searchRecipes = (ingredients, page, cuisine, course, allergies, diets) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_PENDING" })
    fetch(`${MY_API_URL}/search_recipes`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
        cuisine: cuisine,
        course: course,
        allergies: allergies,
        diets: diets,
        q: page
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
          dispatch({
          type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria
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
    dispatch({ type: "FIND_RECIPE_PENDING"})
    fetch(`${MY_API_URL}/find_recipe?q=${recipeId}`)
      .then(res => res.json())
      .then(json => dispatch({
        type: "FIND_RECIPE_FULFILLED",
        payload: json
      })
    )
      .catch(err => dispatch({
        type: "FIND_RECIPE_REJECTED",
        payload: err
      })
    )
  }
}

export const addFavorite = (recipe, userId) => {
  let draftBody = {
    ...{},
    recipe: {
      recipeId: recipe.id,
      recipeName: recipe.recipeName,
      totalTimeInSeconds: recipe.totalTimeInSeconds,
    },
    user_id: userId,
    ingredients: recipe.ingredients,
  }
  let body = recipe.smallImageUrls
  ?
  { ...draftBody, recipe: { ...draftBody.recipe, smallImageUrls: recipe.smallImageUrls[0] } }
  :
  { ...draftBody, recipe: { ...draftBody.recipe, smallImageUrls: "" } }

  body = recipe.attributes.cuisine
  ?
  { ...body, cuisines: recipe.attributes.cuisine}
  :
  { ...body, cuisines: []}

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
  let body
  typeof recipe.id === "number" ?
  body = {user_id: userId, recipeId: recipe.recipeId}
  :
  body = {user_id: userId, recipeId: recipe.id}

  return (dispatch) => {
    dispatch({ type: "REMOVING_FAVORITE_PENDING", payload: recipe })
    fetch(`${MY_API_URL}/user_recipes/delete`, {
      method: "POST",
      body: JSON.stringify(body),
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
