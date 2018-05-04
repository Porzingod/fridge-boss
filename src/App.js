import React, { Component } from 'react'
import './App.css'
import './styles/User.css'
import './styles/Recipes.css'
import './styles/Sidebar.css'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navbar from './components/Navbar'
import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'
import RecipesList from './containers/RecipesList'
import FullRecipe from './containers/FullRecipe'
import Favorites from './containers/Favorites'
import Login from './components/Login'
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

  renderLoginRegister = () => {
    return (
      <div className="user-container">
        {this.props.userView === "register" ? <Register /> : <Login />}
      </div>
    )
  }

  renderApp = () => {
    const { view, recipe } = this.props
    return (
      <div className="App app-container">
        <div className="Ingredients-container">
          <IngredientsForm />
          <IngredientsList />
        </div>
        <div className="Recipes-container">
          {view === "favorites" ? <Favorites /> : recipe ? <FullRecipe recipe={recipe}/> : <RecipesList/>}
        </div>
      </div>
    )
  }

  render() {
    const { loggedIn } = this.props
    return (
      <MuiThemeProvider>
        <div className="main-container-column">
          <Navbar />
          {loggedIn ? this.renderApp() : this.renderLoginRegister()}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    view: state.recipes.view,
    recipe: state.recipes.recipe,
    userView: state.user.view,
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps)(App)
