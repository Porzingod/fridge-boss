import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import '../App.css'

import { addFavorite, removeFavorite } from '../actions/recipes_actions'

import placeholder from '../images/placeholder_meal.png'

import {GridList} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const windowHeight = window.innerHeight
const gridHeight = windowHeight - 100

const style = {
  gridList: {
    width: "auto",
    height: gridHeight,
    overflowY: 'auto',
    paddingLeft: 100,
    paddingRight: 100,
  },
  card: {
    overflowY: 'auto',
    border: 'none',
  },
  button: {
    marginBottom: 20
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
      <GridList style={style.gridList} cols={1}>
        <Card style={style.card}>
          <CardMedia overlay={<CardTitle title={name} />}>
            <img src={image} alt={name} />
          </CardMedia>
          <CardTitle title={`${course} ${cuisine ? `| ${cuisine}` : ""}`} style={{padding: "0px"}}/>
          <RaisedButton label="Favorite" labelPosition="before" icon={favoriteIcon} style={{margin: 12}} onClick={this.handleFavorite}/>
          <CardText>
            Servings: {numberOfServings}<br/>
            Cook Time: {totalTime}<br/><br/>
            <p>Ingredients: </p>
            <ul>{ingredientLines.map( (ingr, index) => <li key={index}>{ingr}</li> )}</ul>
            <RaisedButton href={sourceRecipeUrl} target="_blank" label="Click Here For Recipe Instructions"/>
          </CardText>
        </Card>
      </GridList>
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
