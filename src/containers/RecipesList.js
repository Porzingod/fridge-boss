import React from 'react'

import '../styles/Recipes.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { fetchRecipes, fetchFavorites, searchRecipes, decreasePage, increasePage } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'
import IngredientsForm from '../containers/IngredientsForm'
import IngredientsList from '../containers/IngredientsList'

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
    fill: "red",
  },
  prevButton: {
    width: 120,
    height: 120,
  },
  nextButtonIcon: {
    width: 60,
    height: 60,
    fill: "red",
  },
  nextButton: {
    width: 120,
    height: 120,
  }
};

class RecipesList extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.userId !== nextProps.userId){
  //     return true
  //   } else if(this.props.recipes !== nextProps.recipes){
  //     return true
  //   }
  // }
  //
  // componentDidUpdate() {
  //   !this.props.recipes.length ? this.props.fetchRecipes(this.props.page) : null
  //   !this.props.fetchedFavorites ? typeof userId === "number" ? this.props.fetchFavorites(userId) : this.props.fetchFavorites(this.props.user_id) : null
  // }
  componentDidMount() {
    const { fetchRecipes, fetchFavorites, recipes, page, fetchedFavorites, user_id} = this.props
    !recipes.length ? fetchRecipes(page) : null
    if (fetchedFavorites) {
      null
    } else if (isNaN(userId)) {
      fetchFavorites(user_id)
    } else {
      fetchFavorites(userId)
    }
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
    const { criteria, searchedIngredients, searchedAllergies, searchedDiets, page, cuisine, course } = this.props
    const { searchRecipes, fetchRecipes, decreasePage } = this.props
    decreasePage()
    !!criteria.allowedIngredient || !!criteria.allowedDiet || !!criteria.allowedAllergy || course || cuisine ? searchRecipes(searchedIngredients, page - 1, cuisine, course, searchedAllergies, searchedDiets) : fetchRecipes(page - 1)
  }

  increasePage = () => {
    const { criteria, searchedIngredients, searchedAllergies, searchedDiets, page, cuisine, course } = this.props
    const { searchRecipes, fetchRecipes, increasePage } = this.props
    increasePage()
    !!criteria.allowedIngredient || !!criteria.allowedDiet || !!criteria.allowedAllergy || course || cuisine ? searchRecipes(searchedIngredients, page + 1, cuisine, course, searchedAllergies, searchedDiets) : fetchRecipes(page + 1)
  }

  render() {
    const {recipes, fetched, page, searchedIngredients, searchedAllergies, searchedDiets, cuisine, course} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    const grid = (
      <div className="Recipes-container">
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <div className="Recipes-buttons-container-row-2">
            <IconButton
              iconStyle={style.prevButtonIcon}
              style={style.prevButton}
              onClick={this.decreasePage}
              disabled={page > 0 ? false : true}
            >
              <HardwareKeyboardArrowLeft/>
            </IconButton>
          </div>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>

        <div className="Recipes-list">
          <GridList cols={4} >
            <Subheader>{searchedIngredients.length || searchedAllergies.length || searchedDiets.length || cuisine || course ? "Search Results" : "Browse"}</Subheader>
            {mappedRecipes}
          </GridList>
        </div>
        <div className="Recipes-buttons-container">
          <div className="Recipes-buttons-container-row-1" ></div>
          <div className="Recipes-buttons-container-row-2">
            <IconButton
              iconStyle={style.nextButtonIcon}
              style={style.nextButton}
              onClick={this.increasePage}
            >
              <HardwareKeyboardArrowRight/>
            </IconButton>
          </div>
          <div className="Recipes-buttons-container-row-3" ></div>
        </div>
      </div>
    )
    return(
      <div className="App app-container">

        <div className="Ingredients-container">
          <IngredientsForm />
          <IngredientsList />
        </div>
        <div className="main-container-row">
          {this.renderFetch(recipes, fetched, grid)}
          {/* <Loading /> */}
        </div>
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
