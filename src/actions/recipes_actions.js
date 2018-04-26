import { config } from '../config.js'

const yummly = {
  appId: config["X-Yummly-App-ID"],
  appKey: config["X-Yummly-App-Key"]
}

const shutterStock = {
  key: config["ShutterStock-Consumer-Key"],
  secret: config["ShutterStock-Consumer-Secret"]
}

// YUMMLY
const YUMMLY_RECIPES_API_URL = `http://api.yummly.com/v1/api/recipes`
const YUMMLY_GET_RECIPE_API_URL = `http://api.yummly.com/v1/api/recipe/`
const MY_YUMMLY_ID_AND_KEY = `?_app_id=${yummly.appId}&_app_key=${yummly.appKey}`
const allowedIngr = "&allowedIngredient[]="
const allowedHoliday = "&allowedHoliday[]=holiday^holiday-"
const yummlyHolidays = ["Christmas", "Summer", "Thanksgiving", "New+Year", "Super+Bowl", "Game+Day", "Halloween", "Hanukkah", "4th+of+July"]
const nearestHoliday = yummlyHolidays[1]
const results = (count, page) => `&maxResult=${count}&start=${count * page}`

// ShutterStock
const SHUTTERSTOCK_API_URL = 'https://api.shutterstock.com/v2/images/search'

export const fetchRecipes = (page) => {
  // debugger
  return (dispatch) => {
    dispatch({ type: "FETCH_RECIPES_PENDING"})
    fetch(YUMMLY_RECIPES_API_URL + MY_YUMMLY_ID_AND_KEY + allowedHoliday + nearestHoliday + results(40, page))
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "FETCH_RECIPES_FULFILLED",
          payload: {
            matches: json.matches,
            criteria: json.criteria.allowedIngredient
          }
        })}
      )
      .catch(err => dispatch({
        type: "FETCH_RECIPES_REJECTED",
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
    let searchIngredients = ingredients.map(ingr => ingr.name.split(" ").join("+")).map(ingr => allowedIngr + ingr).join("")
    dispatch({ type: "SEARCH_RECIPES_WITH_INGREDIENTS_PENDING" })
    fetch(YUMMLY_RECIPES_API_URL + MY_YUMMLY_ID_AND_KEY + searchIngredients + results(40, 0))
      .then(res => res.json())
      .then(json => {
        debugger
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
    let searchIngredients = ingredients.map(ingr => ingr.name.split(" ").join("+")).map(ingr => allowedIngr + ingr).join("")
    dispatch({ type: "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_PENDING" })
    fetch(YUMMLY_RECIPES_API_URL + MY_YUMMLY_ID_AND_KEY + searchIngredients + results(40, page))
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
    fetch(YUMMLY_GET_RECIPE_API_URL + recipeId + MY_YUMMLY_ID_AND_KEY)
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
  return(dispatch) => {
    dispatch({ type: "BACK_TO_RECIPES" })
  }
}

export const addFavorite = (recipe) => {
  return(dispatch) => {
    dispatch({ type: "ADD_FAVORITE", payload: recipe })
  }
}

export const removeFavorite = (recipe) => {
  return(dispatch) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: recipe })
  }
}
