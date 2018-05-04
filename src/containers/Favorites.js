import React from 'react'

import '../styles/Recipes.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { fetchRecipes, fetchFavorites } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'

import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const style = {
  prevButtonIcon: {
    width: 60,
    height: 60,
  },
  prevButton: {
    width: 120,
    height: 120,
  },
  nextButtonIcon: {
    width: 60,
    height: 60,
  },
  nextButton: {
    width: 120,
    height: 120,
  }
};

class Favorites extends React.Component{
  componentDidMount() {
    !this.props.recipes.length ? this.props.fetchRecipes(this.props.page) : null
    !this.props.fetchedFavorites ? typeof userId === "number" ? this.props.fetchFavorites(userId) : this.props.fetchFavorites(this.props.user_id) : null
  }

  render() {
    const { favorites } = this.props
    const mappedFavorites = favorites.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    return(
      <div className="Recipes-container">
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <IconButton
            className="Recipes-buttons-container-row-2"
            style={style.prevButton}
            iconStyle={style.prevButtonIcon}
            onClick={this.decreasePage}
            disabled={true}
          >
            <HardwareKeyboardArrowLeft/>
          </IconButton>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>

        <div className="Recipes-list">
          <GridList style={style.gridList} cols={4} >
            <Subheader>Favorites</Subheader>
            {mappedFavorites}
          </GridList>
        </div>
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <IconButton
            className="Recipes-buttons-container-row-2"
            style={style.nextButton}
            iconStyle={style.nextButtonIcon}
            onClick={this.increasePage}
            disabled={true}
          >
            <HardwareKeyboardArrowRight/>
          </IconButton>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.recipes.favorites,
    fetchedFavorites: state.recipes.fetchedFavorites,
    recipes: state.recipes.recipes,
    page: state.recipes.page,
    user_id: state.user.user_id
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipes: fetchRecipes,
    fetchFavorites: fetchFavorites,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
