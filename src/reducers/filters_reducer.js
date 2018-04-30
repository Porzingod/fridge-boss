const initialState = {
  courses: [
    "Main Dishes", "Desserts", "Side Dishes", "Lunch and Snacks", "Appetizers", "Salads", "Breads", "Breakfast and Brunch", "Soups", "Beverages", "Condiments and Sauces", "Cocktails"
  ],
  cuisines: [
    "American", "Italian", "Asian", "Mexican", "Southern & Soul Food", "French", "Southwestern", "Barbecue", "Indian", "Chinese", "Cajun & Creole", "English", "Mediterranean", "Greek", "Spanish", "German", "Thai", "Moroccan", "Irish", "Japanese", "Cuban", "Hawaiian", "Swedish", "Hungarian", "Portugese"
  ],
  cuisineFilter: null,
  allergyFilter: null,
}

export const filtersReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    default:
      return state
  }
}
