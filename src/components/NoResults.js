import React from 'react'

import { connect } from 'react-redux'

import { List } from 'semantic-ui-react'

const NoResults = (props) => {
  const ingredientNames = props.selectedIngredients.map( ingr => ingr.name )
  const last = ingredientNames.length - 1
  const ingredients = `"${ingredientNames.slice(0, last).join(", ")} and ${ingredientNames[last]}"`
  return (
    <div style={{float: 'right', width: 1000, margin: 200}}>
      <h3>
        We couldn't find any recipes including {ingredients}
      </h3>
      <hr></hr>
      <h4>
        Search Tips:
      </h4>
      <List>
        <List.Item>Double check your spelling.</List.Item>
        <List.Item>Try using single words (e.g. "chicken", "tomato).</List.Item>
        <List.Item>Try searching for an ingredient that is less specific.</List.Item>
      </List>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedIngredients: state.ingredients.selectedIngredients
  }
}

export default connect(mapStateToProps)(NoResults)
