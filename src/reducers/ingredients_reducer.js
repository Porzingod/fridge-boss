let initialState = {
  ingredients: [],
  errors: null,
  fetching: false,
  fetched: false,
  posting: false,
  posted: false
}

export const ingredientsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "ADDING_INGREDIENT_PENDING":
      return {...state, posting: true, posted: false}
    case "ADDING_INGREDIENT_FULFILLED":
      return {...state, posting: false, posted: true, ingredients: [...state.ingredients, payload]}
    case "ADDING_INGREDIENT_REJECTED":
      return {...state, posting: false, posted: false, errors: payload}
    case "FETCH_INGREDIENTS_PENDING":
      return {...state, fetching: true}
    case "FETCH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, ingredients: [...state.ingredients, ...payload]}
    case "FETCH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}
    default:
      return state
  }
}
