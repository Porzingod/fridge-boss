let initialState = {
  recipes: [],
  recipe: null,
  criteria: [],
  favorites: [],
  page: 0,
  errors: null,
  fetching: false,
  fetched: false,
  fetchingFavorites: false,
  fetctedFavorites: false,
  posting: false,
  posted: false,
  deleting: false,
  deleted: false,
}

export const recipesReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "FETCH_RECIPES_PENDING":
      return {...state, fetching: true, fetched: false}
    case "FETCH_RECIPES_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria}
    case "FETCH_RECIPES_REJECTED":
      return {...state, fetching: false, errors: payload}

// recipeslist did mount
    case "FETCH_FAVORITES_PENDING":
      return {...state, fetchingFavorites: true, fetchedFavorites: false}
    case "FETCH_FAVORITES_FULFILLED":
      return {...state, fetchingFavorites: false, fetchedFavorites: true, favorites: payload}
    case "FETCH_FAVORITES_REJECTED":
      return {...state, fetchingFavorites: false, errors: payload}

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

    case "DECREASE_RECIPES_PAGE":
      return {...state, page: state.page - 1}
    case "INCREASE_RECIPES_PAGE":
      return {...state, page: state.page + 1}

    case "BACK_TO_RECIPES":
      return {...state, recipe: null}

    case "ADD_FAVORITE":
      return {...state, favorites: [...state.favorites, payload]}
    case "REMOVE_FAVORITE":
      let favorites = state.favorites.filter( recipe => recipe.id !== payload.id )
      return {...state, favorites: favorites}

    case "ADDING_FAVORITE_PENDING":
      return {...state, posting: true, posted: false, favorites: [...state.favorites, payload]}
    case "ADDING_FAVORITE_FULFILLED":
      return {...state, posting: false, posted: true}

    case "REMOVING_FAVORITE_PENDING":
      let updatedFavorites = state.favorites.filter( recipe => recipe.recipeId !== payload.recipeId)
      return {...state, deleting: true, deleted: false, favorites: updatedFavorites}
    case "REMOVING_FAVORITE_FULFILLED":
      return {...state, deleting: false, deleted: true}
    case "REMOVING_FAVORITE_REJECTED":
      return {...state, deleting: false, errors: payload}

    case "CREATING_USER_RECIPE_JOIN_PENDING":
      return {...state}
    case "CREATING_USER_RECIPE_JOIN_FULFILLED":
      return {...state}
    case "CREATING_USER_RECIPE_JOIN_REJECTED":
      return {...state}

    case "DESTROYING_USER_RECIPE_JOIN_PENDING":
      return {...state}
    case "DESTROYING_USER_RECIPE_JOIN_FULFILLED":
      return {...state}
    case "DESTROYING_USER_RECIPE_JOIN_REJECTED":
      return {...state}

    default:
      return state
  }
}
