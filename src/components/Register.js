import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { register } from '../actions/user_actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.register(this.state)
    this.setState({
      username: "",
      password: "",
      password_confirmation: "",
    })
  }

  render() {
    return (
      <div className="user-container">
        <div className="user-register-row-1"></div>
        <div className="user-register-row-2">
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
            <TextField
              hintText="Password Confirmation"
              floatingLabelText="Password Confirmation"
              value={this.state.password_confirmation}
              name="password_confirmation"
              type="password"
              onChange={this.handleChange}
            />
            <br />
            <RaisedButton
              label="Register"
              onClick={this.handleSubmit}
            />
          </div>
          <div className="user-column-3"></div>
        </div>
        <div className="user-register-row-3"></div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    register: register,
  }, dispatch)
}

export default connect(mapDispatchToProps)(Register)
