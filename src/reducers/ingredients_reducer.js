let initialState = {
  ingredients: [],
  selectedIngredients: [],
  errors: null,
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  deleting: false,
  deleted: true
}


export const ingredientsReducer = (state = initialState, {type, payload}) => {
  const sortIngredients = (array) => {
    return array.sort((a, b) => {
      let aDate = a.expiration_date
      let bDate = b.expiration_date
      if (aDate === bDate) { return 0 }
      else { return aDate < bDate ? -1 : 1 }
    })
  }
  switch(type) {
    case "FETCH_INGREDIENTS_PENDING":
      return {...state, fetching: true}
    case "FETCH_INGREDIENTS_FULFILLED":
      let sortedFetchedIngredients = sortIngredients(payload)
      return {...state, fetching: false, fetched: true, ingredients: sortedFetchedIngredients, selectedIngredients: sortedFetchedIngredients.slice(0, 3)}
    case "FETCH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}
    case "ADDING_INGREDIENT_PENDING":
      return {...state, posting: true, posted: false}
    case "ADDING_INGREDIENT_FULFILLED":
      let sortedIngredientsPlusAdded = sortIngredients([...state.ingredients, payload])
      return {...state, posting: false, posted: true, ingredients: sortedIngredientsPlusAdded, selectedIngredients: sortedIngredientsPlusAdded.slice(0, 3)}
    case "ADDING_INGREDIENT_REJECTED":
      return {...state, posting: false, posted: false, errors: payload}
    case "DELETING_INGREDIENT_PENDING":
      return {...state, deleting: true, deleted: false}
    case "DELETING_INGREDIENT_FULFILLED":
      let ingredientsLessDeleted = state.ingredients.filter( ingr => ingr.id !== payload )
      return {...state, deleting: false, deleted: true, ingredients: ingredientsLessDeleted, selectedIngredients: ingredientsLessDeleted.slice(0,3)}
    case "DELETING_INGREDIENT_REJECTED":
      return {...state, deleting: false, deleted: false, errors: payload}
    case "SELECT_INGREDIENT":
      let selectedIngredient = state.ingredients.find( ingr => ingr.id === payload )
      return {...state, selectedIngredients: [...state.selectedIngredients, selectedIngredient]}
    case "DESELECT_INGREDIENT":
      let ingredientsLessDeselected = state.selectedIngredients.filter( ingr => ingr.id !== payload )
      return {...state, selectedIngredients: ingredientsLessDeselected}
    default:
      return state
  }
}
