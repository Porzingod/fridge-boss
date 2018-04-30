import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loginLogout } from '../actions/user_actions.js'
import { toggleFavorites, toggleBrowse } from '../actions/recipes_actions.js'

import logo from '../images/logo.svg'

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import SvgIcon from 'material-ui/SvgIcon'

class Navbar extends React.Component{
  render() {
    const rightButtons = (
      <div>
        <FlatButton label="Browse Recipes" labelStyle={{color: "white"}} style={{marginTop: "5px"}} disableTouchRipple={true} onClick={this.props.toggleBrowse}></FlatButton>
        <FlatButton label="Favorites" labelStyle={{color: "white"}} style={{marginTop: "5px"}} disableTouchRipple={true} onClick={this.props.toggleFavorites}></FlatButton>
        <FlatButton label={this.props.userId > 0 ? "Logout" : "Login"} labelStyle={{color: "white"}} style={{marginTop: "5px"}} disableTouchRipple={true} onClick={this.props.loginLogout}></FlatButton>
      </div>
    )
    return(
      <AppBar
        title="Fridge Boss"
        iconElementLeft={<img src={logo}/>}
        iconElementRight={rightButtons}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    view: state.recipes.view,
    userId: state.user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleBrowse: toggleBrowse,
    toggleFavorites: toggleFavorites,
    loginLogout: loginLogout
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
