import React, { Component } from 'react';
import './App.css';
import './styles/Sidebar.css'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar'
import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'
import RecipesList from './containers/RecipesList'
import FullRecipe from './containers/FullRecipe'
import Favorites from './containers/Favorites'

import Test from './components/Test'

const YUMMLY_ATTRIBUTION = "Recipe search powered by <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a>"

class App extends Component {
  renderView = () => {
    const { view, recipe } = this.props
    if (view === "recipes") {
      recipe ? <FullRecipe recipe={recipe}/> : <RecipesList />
    } else {
      <Favorites />
    }
  }

  render() {
    const { view, recipe } = this.props
    return (
      <MuiThemeProvider>
        <Navbar />
        <div className="App">
          <div className="Ingredients-sidebar">
            <IngredientsForm />
            <IngredientsList />
          </div>
          <div className="Recipes-list">
            {view === "favorites" ? <Favorites /> : recipe ? <FullRecipe recipe={recipe}/> : <RecipesList/>}
            {/* {this.props.recipe ? <FullRecipe recipe={this.props.recipe}/> : <RecipesList />} */}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.recipes.view,
    recipe: state.recipes.recipe
  }
}

export default connect(mapStateToProps)(App);
