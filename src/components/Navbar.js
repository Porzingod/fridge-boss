import React from 'react'

import "../styles/Navbar.css"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout, renderRegisterForm, renderLoginForm } from '../actions/user_actions.js'
import { toggleFavorites, toggleBrowse } from '../actions/recipes_actions.js'

import logo from '../images/logo.svg'

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'

class Navbar extends React.Component{

  render() {
    const rightButtons = (
      <div>
        <FlatButton
          className="Navbar-button"
          label="Browse Recipes"
          labelStyle={{color: "white"}}
          disableTouchRipple={true}
          onClick={this.props.toggleBrowse}
        ></FlatButton>
        <FlatButton
          className="Navbar-button"
          label="Favorites"
          labelStyle={{color: "white"}}
          disableTouchRipple={true}
          onClick={this.props.toggleFavorites}
        ></FlatButton>
        <FlatButton
          className="Navbar-button"
          label={
            this.props.userId > 0 ? "Logout" :
            this.props.userView === "register" ? "Login" :
            "Register"
          }
          labelStyle={{color: "white"}}
          disableTouchRipple={true}
          onClick={
            this.props.userId > 0 ? this.props.logout :
            this.props.userView === "register" ? this.props.renderLoginForm :
            this.props.renderRegisterForm
          }
        ></FlatButton>
      </div>
    )
    return(
      <AppBar
        title="Fridge Boss"
        iconElementLeft={<img src={logo} alt="logo"/>}
        iconElementRight={rightButtons}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    view: state.recipes.view,
    userId: state.user.userId,
    userView: state.user.view,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleBrowse: toggleBrowse,
    toggleFavorites: toggleFavorites,
    logout: logout,
    renderRegisterForm: renderRegisterForm,
    renderLoginForm: renderLoginForm,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
