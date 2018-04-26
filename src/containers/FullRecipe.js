import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { backToRecipes } from '../actions/recipes_actions'

import RaisedButton from 'material-ui/RaisedButton'

const divHeight = window.innerHeight - 82

const style = {
  fullRecipe: {
    width: "auto",
    maxWidth: "85%",
    height: divHeight,
    maxHeight: 850,
    overflowY: 'auto',
  },
  button: {
    marginBottom: 10
  }
}

class FullRecipe extends React.Component {

  render() {
    console.log(this.props.recipe)
    const {attributes, images, source, id, ingredientLines, name, numberOfServings, totalTime} = this.props.recipe
    const {course, cuisine} = attributes
    const {hostedLargeUrl} = images[0]
    const {sourceDisplayName, sourceRecipeUrl} = source
    const image = hostedLargeUrl.slice(0, (hostedLargeUrl.length - 5))
    return(
      <div>
        <RaisedButton style={style.button} label="Back to Recipes" onClick={this.props.backToRecipes}/>
        <div style={style.fullRecipe}>
          <img src={image} alt={name} />
          <p>{id}</p>
          <p>{name}</p>
          <p>{course}</p>
          <p>{cuisine}</p>
          <p>{numberOfServings}</p>
          <p>{totalTime}</p>
          <p>{sourceDisplayName}</p>
          <p>{sourceRecipeUrl}</p>
          <ul>{ingredientLines.map( (ingr, index) => <li key={index}>{ingr}</li> )}</ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    backToRecipes: backToRecipes
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(FullRecipe)
