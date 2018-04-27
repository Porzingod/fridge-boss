import { config } from '../config.js'

export const yummly = {
  appId: config["X-Yummly-App-ID"],
  appKey: config["X-Yummly-App-Key"]
}

const shutterStock = {
  key: config["ShutterStock-Consumer-Key"],
  secret: config["ShutterStock-Consumer-Secret"]
}

// RAILS BACKEND
export const MY_API_URL = `http://localhost:3000/api/v1`

// YUMMLY
export const YUMMLY_RECIPES_API_URL = `http://api.yummly.com/v1/api/recipes`

export const YUMMLY_GET_RECIPE_API_URL = `http://api.yummly.com/v1/api/recipe/`

export const MY_YUMMLY_ID_AND_KEY = `?_app_id=${yummly.appId}&_app_key=${yummly.appKey}`

export const allowedIngr = "&allowedIngredient[]="

export const allowedHoliday = "&allowedHoliday[]=holiday^holiday-"

const yummlyHolidays = ["Christmas", "Summer", "Thanksgiving", "New+Year", "Super+Bowl", "Game+Day", "Halloween", "Hanukkah", "4th+of+July"]

export const nearestHoliday = yummlyHolidays[1]

export const results = (count, page) => `&maxResult=${count}&start=${count * page}`

// ShutterStock
const SHUTTERSTOCK_API_URL = 'https://api.shutterstock.com/v2/images/search'
