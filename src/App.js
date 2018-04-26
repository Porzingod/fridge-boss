import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'
import RecipesList from './containers/RecipesList'
import FullRecipe from './containers/FullRecipe'

const YUMMLY_ATTRIBUTION = "Recipe search powered by <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a>"

class App extends Component {
  render() {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    return (
      <MuiThemeProvider>
        <div className="App" style={{maxWidth: windowWidth, maxHeight: windowHeight, paddingLeft: 20, paddingRight: 20}}>
          {/* <header className="App-header">

          </header> */}
          <div style={{float: "left", width: 260}}>
            <IngredientsForm />
            <IngredientsList />
          </div>
          <div>
            {this.props.recipe ? <FullRecipe recipe={this.props.recipe}/> : <RecipesList />}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipes.recipe
  }
}

export default connect(mapStateToProps)(App);
