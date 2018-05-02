import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes, fetchFavorites, searchRecipes, decreasePage, increasePage } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'

import {GridList} from 'material-ui/GridList';
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

class RecipesList extends React.Component {
  componentDidMount() {
    !this.props.recipes.length ? this.props.fetchRecipes(this.props.page) : null
    !this.props.fetchedFavorites ? this.props.fetchFavorites(this.props.userId) : null
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
    const {recipes, fetched, page} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    const grid = (
      <div style={{display: 'flex',}}>
        <IconButton
          iconStyle={style.prevButtonIcon}
          style={style.prevButton}
          onClick={this.decreasePage}
          disabled={page > 0 ? false : true}
        >
          <HardwareKeyboardArrowLeft/>
        </IconButton>
        <div >
          <GridList style={style.gridList} cols={4} >
            <Subheader>Browse</Subheader>
            {mappedRecipes}
          </GridList>
        </div>
        <IconButton
          iconStyle={style.nextButtonIcon}
          style={style.nextButton}
          onClick={this.increasePage}
        >
          <HardwareKeyboardArrowRight/>
        </IconButton>
      </div>
    )
    return(
      <div className="main-container">
        {this.renderFetch(recipes, fetched, grid)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    recipes: state.recipes.recipes,
    criteria: state.recipes.criteria,
    fetched: state.recipes.fetched,
    page: state.recipes.page,
    searchedIngredients: state.recipes.searchedIngredients,
    searchedAllergies: state.recipes.searchedAllergies,
    searchedDiets: state.recipes.searchedDiets,
    fetchedFavorites: state.recipes.fetchedFavorites,
    cuisine: state.recipes.cuisine,
    course: state.recipes.course
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
