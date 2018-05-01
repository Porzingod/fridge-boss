const initialState = {
  courses: [
    "Main Dishes", "Desserts", "Side Dishes", "Lunch", "Snacks", "Appetizers", "Salads", "Breads", "Breakfast and Brunch", "Soups", "Beverages", "Condiments and Sauces", "Cocktails"
  ],
  cuisines: [
    "American", "Kid Friendly", "Italian", "Asian", "Mexican", "Southern", "French", "Southwestern", "Barbecue", "Indian", "Chinese", "Cajun", "English", "Mediterranean", "Greek", "English", "Spanish", "German", "Thai", "Moroccan", "Irish", "Japanese", "Cuban", "Hawaiian", "Swedish", "Hungarian", "Portugese"
  ],
  allergies: [
    {id: 393, name: "Gluten-Free"},
    {id: 394, name: "Peanut-Free"},
    {id: 398, name: "Seafood-Free"},
    {id: 399, name: "Sesame-Free"},
    {id: 400, name: "Soy-Free"},
    {id: 396, name: "Dairy-Free"},
    {id: 397, name: "Egg-Free"},
    {id: 401, name: "Sulfite-Free"},
    {id: 395, name: "Tree Nut-Free"},
    {id: 392, name: "Wheat-Free"}
  ],
  diets: [
    {id: 388, name: "Lacto vegetarian"},
    {id: 389, name: "Ovo vegetarian"},
    {id: 390, name: "Pescetarian"},
    {id: 386, name: "Vegan"},
    {id: 387, name: "Lacto-ovo vegetarian"},
    {id: 403, name: "Paleo"}
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
