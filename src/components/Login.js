import React from 'react'
import '../App.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../actions/user_actions'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  window: {
    width: "100%",
    height: "100%",
  },
  paper: {
    width: "50%",
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

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
      <div className="login-container">
        <div className="login-row-1"></div>

        <div className="login-row-2">
          <div className="login-column-1"></div>
          <div className="login-column-2">
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
          <div className="login-column-3"></div>
        </div>

        <div className="login-row-3"></div>
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
