import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes, fetchFavorites } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'

import { GridList } from 'material-ui/GridList';

const gridHeight = window.innerHeight - 82

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "85%",
    minHeight: "auto",
    maxHeight: 850,
    overflowY: 'auto',
  },
  button: {
    marginBottom: 10
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
      <div>
        <div style={style.root}>
          <GridList style={style.gridList} cols={4} >
            {mappedFavorites}
          </GridList>
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
