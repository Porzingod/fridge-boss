import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes, fetchFavorites } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'

import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const windowHeight = window.innerHeight
const gridHeight = windowHeight - 100

const style = {
  gridList: {
    width: "auto",
    height: gridHeight,
    overflowY: 'auto',
    marginRight: 10
  },
  prevButtonIcon: {
    width: 60,
    height: 60,
  },
  prevButton: {
    width: 120,
    height: 120,
    float: 'left',
    marginTop: windowHeight/2 - 120,
    marginLeft: 20,
  },
  nextButtonIcon: {
    width: 60,
    height: 60,
  },
  nextButton: {
    width: 120,
    height: 120,
    float: 'right',
    marginTop: windowHeight/2 - 120,
    marginRight: 20,
  }
};

class Favorites extends React.Component{
  componentDidMount() {
    !this.props.recipes.length ? this.props.fetchRecipes(this.props.page) : null
    !this.props.fetchedFavorites ? this.props.fetchFavorites(this.props.userId) : null
  }

  render() {
    const { favorites } = this.props
    const mappedFavorites = favorites.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    return(
      <div style={{display: 'flex'}}>
        <IconButton
          style={style.prevButton}
          iconStyle={style.prevButtonIcon}
          onClick={this.decreasePage}
          disabled={true}
        >
          <HardwareKeyboardArrowLeft/>
        </IconButton>
        <div className="Recipes-list-root">
          <GridList style={style.gridList} cols={4} >
            <Subheader>Favorites</Subheader>
            {mappedFavorites}
          </GridList>
        </div>
        <IconButton
          style={style.nextButton}
          iconStyle={style.nextButtonIcon}
          onClick={this.increasePage}
          disabled={true}
        >
          <HardwareKeyboardArrowRight/>
        </IconButton>
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
    userId: state.user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipes: fetchRecipes,
    fetchFavorites: fetchFavorites,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
