import React from 'react'
import '../styles/User.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { login, rememberUser } from '../actions/user_actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  componentDidMount() {
    localStorage.user ? this.props.rememberUser(userId) : null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.login(this.state)
    this.setState({
      username: "",
      password: ""
    })
  }

  handleDemo = (e) => {
    this.props.login({
      username: "jason",
      password: "jason"
    })
  }

  render() {
    return (
      <div className="user-container">
        <div className="user-login-row-1"></div>

        <div className="user-login-row-2">
          <div className="user-login-column-1"></div>
          <div className="user-login-column-2">
            <TextField
              hintText="Username"
              floatingLabelText="Username"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              value={this.state.password}
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <br />
            <RaisedButton
              label="Login"
              onClick={this.handleSubmit}
            />
            <br />
            <RaisedButton
              label="Try Demo"
              onClick={this.handleDemo}
            />
          </div>
          <div className="user-login-column-3"></div>
        </div>

        <div className="user-login-row-3"></div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login: login,
    rememberUser: rememberUser,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
