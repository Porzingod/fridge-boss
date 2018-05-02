import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import '../styles/FullRecipe.css'

import { addFavorite, removeFavorite } from '../actions/recipes_actions'

import placeholder from '../images/placeholder_meal.png'

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const windowHeight = window.innerHeight
const gridHeight = windowHeight - 100

const style = {
  gridList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "auto",
    height: gridHeight,
    overflowY: 'auto',
  },
  cardTitle: {
    padding: 0,
    fontSize: 16,
  },
  button: {
    marginBottom: 20
  },
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
    const {sourceRecipeUrl} = source
    const image = hostedLargeUrl ? hostedLargeUrl.slice(0, (hostedLargeUrl.length - 5)) : placeholder
    const favoriteIcon = this.props.favorites.map( recipe => {return {recipeId: recipe.recipeId, id: recipe.id} } ).find( recipe => recipe.recipeId === id || recipe.id === id ) ? <Favorite color="red"/> : <FavoriteBorder />
    return(
      <div className="Full-recipe-container">
        <div className="Full-recipe-column-1"></div>
        <Card className="Full-recipe-column-2">
          <CardMedia
            className="Full-recipe-image"
            overlay={
              <CardTitle className="Full-recipe-image-title" title={name}/>
            }>
            <img src={image} alt={name}/>
          </CardMedia>
          <CardTitle
            style={style.cardTitle}
            title={`${course ? `${course}` : ""} ${cuisine ? `| ${cuisine}` : ""}`}
          />
          <RaisedButton
            className="Full-recipe-favorite-button"
            label="Favorite"
            labelPosition="before"
            icon={favoriteIcon}
            onClick={this.handleFavorite}/>
          <CardText>
            <strong>Servings:</strong> {numberOfServings}<br/>
            <strong>Cook Time:</strong> {totalTime}<br/><br/>
            <p><strong>Ingredients: </strong></p>
            <ul>{ingredientLines.map( (ingr, index) => <li key={index}>{ingr}</li> )}</ul>
            <RaisedButton
              href={sourceRecipeUrl}
              target="_blank"
              label="Click Here For Recipe Instructions"
            />
          </CardText>
        </Card>
        <div className="Full-recipe-column-3"></div>
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
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FullRecipe)
