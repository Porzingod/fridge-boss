import React from 'react'
import '../App.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/user_actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
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

  render() {
    return (
      <div className="user-container">
        <div className="user-login-row-1"></div>

        <div className="user-login-row-2">
          <div className="user-column-1"></div>
          <div className="user-column-2">
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
          </div>
          <div className="user-column-3"></div>
        </div>

        <div className="user-login-row-3"></div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login: login,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
