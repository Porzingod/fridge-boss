let initialState = {
  ingredients: [],
  errors: null,
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  deleting: false,
  deleted: true
}

export const ingredientsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "FETCH_INGREDIENTS_PENDING":
      return {...state, fetching: true}
    case "FETCH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, ingredients: [...state.ingredients, ...payload]}
    case "FETCH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}
    case "ADDING_INGREDIENT_PENDING":
      return {...state, posting: true, posted: false}
    case "ADDING_INGREDIENT_FULFILLED":
      return {...state, posting: false, posted: true, ingredients: [...state.ingredients, payload]}
    case "ADDING_INGREDIENT_REJECTED":
      return {...state, posting: false, posted: false, errors: payload}
    case "DELETING_INGREDIENT_PENDING":
      return {...state, deleting: true, deleted: false}
    case "DELETING_INGREDIENT_FULFILLED":
      let ingredients = state.ingredients.filter( ingr => ingr.id !== payload )
      return {...state, deleting: false, deleted: true, ingredients: ingredients}
    case "DELETING_INGREDIENT_REJECTED":
      return {...state, deleting: false, deleted: false, errors: payload}
    default:
      return state
  }
}
