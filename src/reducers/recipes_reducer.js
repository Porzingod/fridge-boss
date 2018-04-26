let initialState = {
  recipes: [],
  recipe: null,
  criteria: [],
  page: 0,
  errors: null,
  fetching: false,
  fetched: false
}

export const recipesReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "FETCH_RECIPES_PENDING":
      return {...state, fetching: true, fetched: false}
    case "FETCH_RECIPES_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria}
    case "FETCH_RECIPES_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "SEARCH_RECIPES_WITH_INGREDIENTS_PENDING":
      return {...state, fetching: true, fetched: false}
    case "SEARCH_RECIPES_WITH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria, page: 0}
    case "SEARCH_RECIPES_WITH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_PENDING":
      return {...state, fetching: true, fetched: false}
    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria}
    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "SEARCH_RECIPE_PENDING":
      return {...state, fetching: true, fetched: false}
    case "SEARCH_RECIPE_FULFILLED":
      return {...state, fetching: true, fetched: true, recipe: payload}
    case "SEARCH_RECIPE_REJECTED":
      return {...state, fetching: true, errors: payload}

    case "BACK_TO_RECIPES":
      return {...state, recipe: null}

    case "DECREASE_RECIPES_PAGE":
      return {...state, page: state.page - 1}
    case "INCREASE_RECIPES_PAGE":
      return {...state, page: state.page + 1}

    default:
      return state
  }
}
