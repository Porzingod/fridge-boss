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

import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'

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

  renderLogin = () => {
    return (
      <div className="login-container">
        <Login />
        {/* <Logout /> */}
        {/* <Register /> */}
      </div>
    )
  }

  renderApp = () => {
    const { view, recipe } = this.props
    return (
      <div className="App app-container">
        <div className="app-column-1">
          <IngredientsForm />
          <IngredientsList />
        </div>
        <div className="app-column-2">
          {view === "favorites" ? <Favorites /> : recipe ? <FullRecipe recipe={recipe}/> : <RecipesList/>}
        </div>
      </div>
    )
  }

  render() {
    const { userId } = this.props
    return (
      <MuiThemeProvider>
        <Navbar />
        {userId == 0 ? this.renderLogin() : this.renderApp()}
        {/* {this.renderApp()} */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.recipes.view,
    recipe: state.recipes.recipe,
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(App);
