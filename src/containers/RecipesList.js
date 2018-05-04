import React from 'react'

import '../styles/Recipes.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { fetchRecipes, fetchFavorites, searchRecipes, decreasePage, increasePage } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'

import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const style = {
  button: {
    float: 'right',
    marginBottom: 10
  },
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

class RecipesList extends React.Component {
  componentDidMount() {
    !this.props.recipes.length ? this.props.fetchRecipes(this.props.page) : null
    !this.props.fetchedFavorites ? typeof userId === "number" ? this.props.fetchFavorites(userId) : this.props.fetchFavorites(this.props.user_id) : null
  }

  renderFetch = (recipes, fetched, element) => {
    if (recipes.length && fetched) {
      return element
    } else if (!recipes.length && fetched) {
      return <NoResults />
    } else {
      return <Loading />
    }
  }

  decreasePage = () => {
    const {criteria, searchedIngredients, searchedAllergies, searchedDiets, page, cuisine, course} = this.props
    const {searchRecipes, fetchRecipes} = this.props
    this.props.decreasePage()
    criteria || course || cuisine ? searchRecipes(searchedIngredients, page - 1, cuisine, course, searchedAllergies, searchedDiets) : fetchRecipes(page - 1)
  }

  increasePage = () => {
    const {criteria, searchedIngredients, searchedAllergies, searchedDiets, page, cuisine, course} = this.props
    const {searchRecipes, fetchRecipes} = this.props
    this.props.increasePage()
    criteria || course || cuisine ? searchRecipes(searchedIngredients, page + 1, cuisine, course, searchedAllergies, searchedDiets) : fetchRecipes(page + 1)
  }

  render() {
    const {recipes, fetched, page, searchedIngredients, searchedAllergies, searchedDiets, cuisine, course} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    const grid = (
      <div className="Recipes-container">
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <IconButton
            className="Recipes-buttons-container-row-2"
            iconStyle={style.prevButtonIcon}
            style={style.prevButton}
            onClick={this.decreasePage}
            disabled={page > 0 ? false : true}
          >
            <HardwareKeyboardArrowLeft/>
          </IconButton>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>

        <div className="Recipes-list">
          <GridList cols={4} >
            <Subheader>{searchedIngredients || searchedAllergies || searchedDiets || cuisine || course ? "Search Results" : "Browse"}</Subheader>
            {mappedRecipes}
          </GridList>
        </div>
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <IconButton
            className="Recipes-buttons-container-row-2"
            iconStyle={style.nextButtonIcon}
            style={style.nextButton}
            onClick={this.increasePage}
          >
            <HardwareKeyboardArrowRight/>
          </IconButton>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>
      </div>
    )
    return(
      <div className="main-container-row">
        {this.renderFetch(recipes, fetched, grid)}
        {/* <Loading /> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes,
    criteria: state.recipes.criteria,
    fetched: state.recipes.fetched,
    page: state.recipes.page,
    searchedIngredients: state.recipes.searchedIngredients,
    searchedAllergies: state.recipes.searchedAllergies,
    searchedDiets: state.recipes.searchedDiets,
    fetchedFavorites: state.recipes.fetchedFavorites,
    cuisine: state.recipes.cuisine,
    course: state.recipes.course,
    user_id: state.user.user_id
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipes: fetchRecipes,
    fetchFavorites: fetchFavorites,
    searchRecipes: searchRecipes,
    decreasePage: decreasePage,
    increasePage: increasePage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList)
