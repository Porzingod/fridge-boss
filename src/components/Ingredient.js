import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { deleteIngredient, selectIngredient, deselectIngredient } from '../actions/ingredients_actions'

import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/content/remove.js'

const style = {
  root: {
    float: "left",
    width: "81%",
    paddingBottom: 20
  },
  label: {
    textAlign: 'left'
  },
  icon: {
    marginTop: 6,
    marginRight: 20
  },
  input: {

  }
}

class Ingredient extends React.Component {

  expiringSoon = () => {
    let propExpiry = new Date(this.props.expiration_date)
    var today = new Date();
    var soon = new Date();
    soon.setDate(today.getDate() + 5);
    let expiringSoon = propExpiry < soon
    return expiringSoon
  }

  handleCheck = e => {
    const {selectedIngredients, id} = this.props
    const {selectIngredient, deselectIngredient} = this.props
    selectedIngredients.map(ingr => ingr.id).find(ingr => ingr === id) ? deselectIngredient(id) : selectIngredient(id)
  }

  handleDelete = (e) => {
    this.props.deleteIngredient(this.props.id)
  }

  render() {
    const {id, name, expiration_date, checked} = this.props
    return (
      <div>
        <Checkbox
          defaultChecked={checked}
          style={style.root}
          labelStyle={style.label}
          iconStyle={style.icon}
          key={id}
          data-id={id}
          value={name}
          label={(
            <label>
              <span style={{fontWeight: 'bold'}}>{name}</span>
              <br/>
              {this.expiringSoon() ?
                <span style={{fontSize: 12, opacity: 0.8, color: "red"}}>Best Before: {expiration_date}</span>
              : <span style={{fontSize: 12, opacity: 0.8}}>Best Before: {expiration_date}</span>
              }
            </label>
          )}
          onCheck={this.handleCheck}
        />
        <IconButton style={{float: 'right'}} onClick={this.handleDelete}>
          <ContentRemove/>
        </IconButton>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients,
    selectedIngredients: state.ingredients.selectedIngredients
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteIngredient: deleteIngredient,
    selectIngredient: selectIngredient,
    deselectIngredient: deselectIngredient,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)
