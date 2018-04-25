import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../actions/recipes_actions'

import Recipe from '../components/Recipe'

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

  render() {
    const {recipes} = this.props
    const mappedRecipes = recipes.map( recipe => <Recipe key={recipe.id} recipe={recipe} /> )
    return(
      <div>
        <RaisedButton style={style.button} label="More Recipes"/>
        <div style={style.root}>
          <GridList style={style.gridList} cols="2" >
            {mappedRecipes}
          </GridList>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchRecipes: fetchRecipes,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList)
