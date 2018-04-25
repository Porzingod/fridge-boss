import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class RecipesList extends React.Component {
  render() {
    return(
      <div>
        Recipes
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes
  }
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({
//     fetchIngredients: fetchIngredients,
//     searchRecipes: searchRecipes
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList)
export default connect(mapStateToProps)(RecipesList)
