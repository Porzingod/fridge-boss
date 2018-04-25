let initialState = {
  recipes: [],
  errors: null,
  fetching: false,
  fetched: false
}

export const recipesReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "FETCH_RECIPES_PENDING":
      return {...state, fetching: true, fetched: false}
    case "FETCH_RECIPES_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload}
    case "FETCH_RECIPES_REJECTED":
      return {...state, fetching: false, errors: payload}
    case "SEARCH_RECIPES_PENDING":
      return {...state, fetching: true, fetched: false}
    case "SEARCH_RECIPES_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload}
    case "SEARCH_RECIPES_REJECTED":
      return {...state, fetching: false, errors: payload}
    default:
      return state
  }
}
