import React from 'react'

import '../styles/NoResults.css'

import { connect } from 'react-redux'

const NoResults = (props) => {
  const ingredientNames = props.searchedIngredients.map( ingr => ingr.name )
  const last = ingredientNames.length - 1
  const ingredients = `"${ingredientNames.slice(0, last).join(", ")} and ${ingredientNames[last]}"`
  return (
    <div className="No-results-page">
      <h3>
        We couldn't find any recipes including {ingredients}
      </h3>
      <hr width="60%"></hr>
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
    searchedIngredients: state.recipes.searchedIngredients
  }
}

export default connect(mapStateToProps)(NoResults)
