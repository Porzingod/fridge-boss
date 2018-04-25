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

  let sortedIngredients = []
  let selectedIngredients = []
  let updatedIngredients = []
  let findSelectedIngredients = (array) => array.filter( ele => ele.selected == true)
  let updateAtIndex = (array, index) => array.map((ele, i) => index === i ? {...ele, selected: !ele.selected} : ele)

  switch(type) {
    case "FETCH_INGREDIENTS_PENDING":
      return {...state, fetching: true}
    case "FETCH_INGREDIENTS_FULFILLED":
      sortedIngredients = sortIngredients(payload)
      let selectedTrue = sortedIngredients.slice(0,3).map( ingr => {return {...ingr, selected: true}} )
      let selectedFalse = sortedIngredients.slice(3).map( ingr => {return{...ingr, selected: false}} )
      let selectionApplied = [...selectedTrue, ...selectedFalse]
      return {...state, fetching: false, fetched: true, ingredients: selectionApplied, selectedIngredients: selectedTrue}
    case "FETCH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "ADDING_INGREDIENT_PENDING":
      return {...state, posting: true, posted: false}
    case "ADDING_INGREDIENT_FULFILLED":
      sortedIngredients = sortIngredients([...state.ingredients, {...payload, selected: false}])
      selectedIngredients = findSelectedIngredients(sortedIngredients)
      return {...state, posting: false, posted: true, ingredients: sortedIngredients, selectedIngredients: selectedIngredients}
    case "ADDING_INGREDIENT_REJECTED":
      return {...state, posting: false, posted: false, errors: payload}

    case "DELETING_INGREDIENT_PENDING":
      return {...state, deleting: true, deleted: false}
    case "DELETING_INGREDIENT_FULFILLED":
      let ingredientsMinusDeleted = state.ingredients.filter( ingr => ingr.id !== payload )
      selectedIngredients = findSelectedIngredients(ingredientsMinusDeleted)
      return {...state, deleting: false, deleted: true, ingredients: ingredientsMinusDeleted, selectedIngredients: selectedIngredients}
    case "DELETING_INGREDIENT_REJECTED":
      return {...state, deleting: false, deleted: false, errors: payload}

    case "SELECT_INGREDIENT":
      let selectedIndex = state.ingredients.findIndex( ingr => ingr.id == payload )
      updatedIngredients = updateAtIndex(state.ingredients, selectedIndex)
      selectedIngredients = findSelectedIngredients(updatedIngredients)
      return {...state, ingredients: updatedIngredients, selectedIngredients: selectedIngredients}

    case "DESELECT_INGREDIENT":
      let deselectedIndex = state.ingredients.findIndex( ingr => ingr.id == payload )
      updatedIngredients = updateAtIndex(state.ingredients, deselectedIndex)
      selectedIngredients = findSelectedIngredients(updatedIngredients)
      return {...state, ingredients: updatedIngredients, selectedIngredients: selectedIngredients}

    case "CLEAR_SELECTED_INGREDIENTS":
      updatedIngredients = state.ingredients.map( ingr => {return{...ingr, selected: false}} )
      return {...state, ingredients: updatedIngredients, selectedIngredients: []}

    default:
      return state
  }
}
