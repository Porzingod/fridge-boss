import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addIngredient } from '../actions/ingredients'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

class IngredientsForm extends React.Component {
  state = {
    name: "",
    expiration_date: new Date()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  handleExpirationDate = (e, time) => {
    this.setState({ expiration_date: time }, () => console.log(this.state.expiration_date.toDateString().slice(4)))
  }

  handleSubmit = e => {
    e.preventDefault()
    let {expiration_date} = this.state
    if (typeof expiration_date !== "string") {
      this.setState({
        expiration_date: expiration_date.toDateString().slice(4)
      }, () => {
        this.props.addIngredient(this.state)
        this.setState({
          name: "",
          expiration_date: new Date()
        })
      })
    }
  }

  render() {
    const {name, expiration_date} = this.state
    return (
      <div>
        <TextField onChange={this.handleChange} hintText="Ingredient" name="name" value={name}/>
        <br/>
        <DatePicker onChange={this.handleExpirationDate} hintText="Expiration Date" name="expiration_date" value={expiration_date} mode="landscape"/>
        <br/>
        <RaisedButton onClick={this.handleSubmit} label="Add Ingredient"></RaisedButton>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addIngredient: addIngredient
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(IngredientsForm)
