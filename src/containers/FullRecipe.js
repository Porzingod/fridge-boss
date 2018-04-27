import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { backToRecipes, addFavorite, removeFavorite } from '../actions/recipes_actions'

import placeholder from '../images/placeholder_meal.png'

import RaisedButton from 'material-ui/RaisedButton'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

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
  },
  favoriteIcon: {
    width: 60,
    height: 60
  },
  favorite: {
    width: 120,
    height: 120,
    padding: 30,
  }
}

class FullRecipe extends React.Component {

  handleFavorite = () => {
    const {favorites, recipes, recipe, userId} = this.props
    let foundRecipe = recipes.find( rec => rec.id === recipe.id )
    favorites.map( rec => rec.id).includes(recipe.id) ? this.props.removeFavorite(foundRecipe, userId) : this.props.addFavorite(foundRecipe, userId)
  }

  render() {
    const {attributes, images, source, id, ingredientLines, name, numberOfServings, totalTime} = this.props.recipe
    const {course, cuisine} = attributes
    const {hostedLargeUrl} = images[0]
    const {sourceDisplayName, sourceRecipeUrl} = source
    const image = hostedLargeUrl ? hostedLargeUrl.slice(0, (hostedLargeUrl.length - 5)) : placeholder
    const favoriteIcon = this.props.favorites.map( recipe => {return {recipeId: recipe.recipeId, id: recipe.id} } ).find( recipe => recipe.recipeId === id || recipe.id === id ) ? <Favorite color="red"/> : <FavoriteBorder />
    return(
      <div>
        <RaisedButton style={style.button} label="Back to Recipes" onClick={this.props.backToRecipes}/>
        <div style={style.fullRecipe}>
          <img src={image} alt={name} />
          <p>
            {name}
          </p>
          <RaisedButton label="Favorite" labelPosition="before" icon={favoriteIcon} style={{margin: 12}} onClick={this.handleFavorite}/>
          <p>{course}</p>
          <p>{cuisine}</p>
          <p>Servings: {numberOfServings}</p>
          <p>Cook Time: {totalTime}</p>
          {/* this is where the recipe is sourced from  */}
          {/* <p>{sourceDisplayName}</p> */}
          <a>{sourceRecipeUrl}</a>
          <p>Ingredients: </p>
          <ul>{ingredientLines.map( (ingr, index) => <li key={index}>{ingr}</li> )}</ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    recipes: state.recipes.recipes,
    favorites: state.recipes.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    backToRecipes: backToRecipes,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FullRecipe)
