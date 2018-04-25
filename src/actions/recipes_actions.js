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
const YUMMLY_API_URL = `http://api.yummly.com/v1/api/recipes?_app_id=${yummly.appId}&_app_key=${yummly.appKey}`
const allowedIngr = "&allowedIngredient[]="
const allowedHoliday = "&allowedHoliday[]=holiday^holiday-"
const yummlyHolidays = ["Christmas", "Summer", "Thanksgiving", "New+Year", "Super+Bowl", "Game+Day", "Halloween", "Hanukkah", "4th+of+July"]
const nearestHoliday = yummlyHolidays[1]

// ShutterStock
const SHUTTERSTOCK_API_URL = 'https://api.shutterstock.com/v2/images/search'

export const fetchRecipes = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_RECIPES_PENDING"})
    fetch(YUMMLY_API_URL + allowedHoliday + nearestHoliday)
      .then(res => res.json())
      .then(json => dispatch({
          type: "FETCH_RECIPES_FULFILLED",
          payload: json.matches
        })
      )
      .catch(err => dispatch({
        type: "FETCH_RECIPES_REJECTED",
        payload: err
      })
    )
  }
}

export const fetchRecipeImage = () => {

}

export const searchRecipes = (ingredients) => {
  return (dispatch) => {
    let searchIngredients = ingredients.map(ingr => ingr.split(" ").join("+")).map(ingr => allowedIngr + ingr).join("")
    dispatch({ type: "SEARCH_RECIPES_PENDING" })
    fetch(YUMMLY_API_URL + searchIngredients)
      .then(res => res.json())
      .then(json => {
        debugger
        dispatch({
        type: "SEARCH_RECIPES_FULFILLED",
        payload: json.matches
      })}
    )
      .catch(err => dispatch({
        type: "SEARCH_RECIPES_REJECTED",
        payload: err
      })
    )
  }
}
