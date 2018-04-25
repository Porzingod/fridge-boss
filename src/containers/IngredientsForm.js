import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addIngredient } from '../actions/ingredients_actions'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  div: {
    width: 260,
    marginBottom: 10
  },
  datePicker: {
    maxWidth: 250,
    textAlign: 'center'
  },
  textInputField: {
    textAlign: 'center'
  },
  textHintField: {
    textAlign: "center",
    width: "100%"
  }
}

class IngredientsForm extends React.Component {
  state = {
    name: "",
    expiration_date: new Date()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleExpirationDate = (e, time) => {
    this.setState({ expiration_date: time })
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
      <div style={style.div}>
        <TextField inputStyle={style.textInputField} hintStyle={style.textHintField} onChange={this.handleChange} hintText="Ingredient" name="name" value={name}/>
        <br/>
        <DatePicker inputStyle={style.datePicker} onChange={this.handleExpirationDate} hintText="Expiration Date" name="expiration_date" value={expiration_date} mode="landscape"/>
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
