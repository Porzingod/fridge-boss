import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'
import NoResults from '../components/NoResults'
import Loading from '../components/Loading'

import {GridList} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton'

const windowHeight = window.innerHeight
const gridHeight = windowHeight - 82

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "auto",
    maxWidth: "70%",
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
    this.props.fetchRecipes()
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

  render() {
    const {recipes, fetched} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    const grid = (
      <div>
        <RaisedButton style={style.button} label="More Recipes"/>
        <div style={style.root}>
          <GridList style={style.gridList} cols="2" >
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
    recipes: state.recipes.recipes,
    fetched: state.recipes.fetched
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipes: fetchRecipes,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList)
