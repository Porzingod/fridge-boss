import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes, fetchFavorites, searchRecipes, decreasePage, increasePage } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'

import {GridList} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton'

const gridHeight = window.innerHeight - 82

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "auto",
    maxWidth: "85%",
    height: gridHeight,
    maxHeight: 850,
    overflowY: 'auto',
  },
  button: {
    marginBottom: 10
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
    const {criteria, selectedIngredients, page} = this.props
    const {searchRecipes, fetchRecipes} = this.props
    debugger
    this.props.decreasePage()
    criteria ? searchRecipes(selectedIngredients, page) : fetchRecipes(page)
  }

  increasePage = () => {
    const {criteria, selectedIngredients, page} = this.props
    const {searchRecipes, fetchRecipes} = this.props
    debugger
    this.props.increasePage()
    criteria ? searchRecipes(selectedIngredients, page) : fetchRecipes(page)
  }

  render() {
    const {recipes, fetched, page} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    const grid = (
      <div>
        {page > 0 ? <RaisedButton style={style.button} label="Previous Recipes" onClick={this.decreasePage}/> : null}
        <RaisedButton style={style.button} label="More Recipes" onClick={this.increasePage}/>
        <div style={style.root}>
          <GridList style={style.gridList} cols="4" >
            {mappedRecipes}
          </GridList>
        </div>
      </div>
    )
    return(
      <div>
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
    selectedIngredients: state.ingredients.selectedIngredients,
    fetchedFavorites: state.recipes.fetchedFavorites
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
