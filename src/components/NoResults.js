import React from 'react'

import { connect } from 'react-redux'

const NoResults = (props) => {
  const ingredientNames = props.selectedIngredients.map( ingr => ingr.name )
  const last = ingredientNames.length - 1
  const ingredients = `"${ingredientNames.slice(0, last).join(", ")} and ${ingredientNames[last]}"`
  return (
    <div style={{width: "auto"}}>
      <h3>
        We couldn't find any recipes including {ingredients}
      </h3>
      <hr></hr>
      <h3>
        Search Tips:
      </h3>
      <div>
        <p>Double check your spelling.</p>
        <p>Try using single words (e.g. "chicken", "tomato).</p>
        <p>Try searching for an ingredient that is less specific.</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.ingredients.selectedIngredients
  }
}

export default connect(mapStateToProps)(NoResults)
