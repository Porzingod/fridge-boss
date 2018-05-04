import React, { Component } from 'react'
import './App.css'
import './styles/User.css'
import './styles/Recipes.css'
import './styles/Sidebar.css'
import { connect } from 'react-redux'

import { Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

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

  componentDidMount() {
    const { loggedIn } = this.props
    loggedIn ? this.renderApp() : this.renderLoginRegister()
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname
      || this.props.view !== nextProps.view
      || this.props.userView !== nextProps.userView
      || this.props.recipe !== nextProps.recipe
      || this.props.loggedIn !== nextProps.loggedIn
    ) {
      debugger
      return true
    } else if (this.props.userView === nextProps.userView) {
      return false
    } else {
      return true
    }
  }

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.props
    loggedIn ? this.renderApp() : this.renderLoginRegister()
  }

  renderLoginRegister = () => {
    const { userView, history } = this.props
    userView === "register" ? history.replace("/register") : history.replace("/login")
  }

  // renderApp = () => {
  //   const { view, recipe } = this.props
  //   return (
  //     <div className="App app-container">
  //       <div className="Ingredients-container">
  //         <IngredientsForm />
  //         <IngredientsList />
  //       </div>
  //       <div className="Recipes-container">
  //         {view === "favorites" ? <Favorites /> : recipe ? <FullRecipe recipe={recipe}/> : <RecipesList/>}
  //       </div>
  //     </div>
  //   )
  // }

  renderApp = () => {
    const { view, recipe, history } = this.props
    view == "favorites" ? history.replace("/favorites") : recipe ? history.replace("/recipe") : history.replace("/browse")
  }

  // render() {
  //   const { loggedIn } = this.props
  //   return (
  //     <MuiThemeProvider>
  //       <div className="main-container-column">
  //         <Navbar />
  //         {loggedIn ? this.renderApp() : this.renderLoginRegister()}
  //       </div>
  //     </MuiThemeProvider>
  //   )
  // }

  render() {
    const { recipe } = this.props
    return (
      <MuiThemeProvider>
        <div className="main-container-column">
          <Navbar />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/browse" component={RecipesList}/>
          <Route path="/favorites" component={Favorites}/>
          <Route path="/recipe" component={() => <FullRecipe recipe={recipe}/>}/>
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

export default withRouter(connect(mapStateToProps)(App))
