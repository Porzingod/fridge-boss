import { config } from '../config.js'

const yummly = {
  appId: config["X-Yummly-App-ID"],
  appKey: config["X-Yummly-App-Key"]
}

const allowIngr = "&allowedIngredient[]="

const YUMMLY_SEARCH_RECIPES_URL = `http://api.yummly.com/v1/api/recipes?_app_id=${yummly.appId}&_app_key=${yummly.appKey}`

const holidays = ["Christmas", "Summer", "Thanksgiving", "New+Year", "Super+Bowl", "Game+Day", "Halloween", "Hanukkah", "4th+of+July"]

// fetch random recipes on home page so it's not empty
// export const fetchRecipes = () => {
//   return (dispatch) => {
//     let searchHoliday
//     dispatch({ type: "FETCH_RECIPES_PENDING"})
//     fetch(YUMMLY_SEARCH_RECIPES_URL + )
//   }
// }

export const searchRecipes = (ingredients) => {
  return (dispatch) => {
    let searchIngredients = ingredients.map(ingr => ingr.split(" ").join("+")).map(ingr => allowIngr + ingr).join("")
    dispatch({ type: "SEARCH_RECIPES_PENDING" })
    fetch(YUMMLY_SEARCH_RECIPES_URL + searchIngredients + "&requirePictures=true")
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
