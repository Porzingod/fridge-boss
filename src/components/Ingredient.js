import React from 'react'

import '../styles/Sidebar.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userId } from '../constants'

import { deleteIngredient, selectIngredient, deselectIngredient } from '../actions/ingredients_actions'

import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/content/remove.js'

const style = {
  label: {
    textAlign: 'left'
  },
  icon: {
    marginTop: 6,
    marginRight: 20
  }
}

class Ingredient extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.ingredient !== nextProps.ingredient ? true : false
  }

  expiringSoon = () => {
    let propExpiry = new Date(this.props.ingredient.expiration_date)
    var today = new Date();
    var soon = new Date();
    soon.setDate(today.getDate() + 5);
    let expiringSoon = propExpiry < soon
    return expiringSoon
  }

  handleCheck = (e) => {
    const {id} = this.props.ingredient
    const {selectIngredient, deselectIngredient} = this.props
    e.target.checked ? selectIngredient(id) : deselectIngredient(id)
  }

  handleDelete = () => {
    this.props.deleteIngredient(this.props.ingredient.id, userId)
  }

  render() {
    const {id, name, expiration_date} = this.props.ingredient
    const {checked} = this.props
    return (
      <div>
        <Checkbox
          className="Ingredients-list-item"
          defaultChecked={checked}
          labelStyle={style.label}
          iconStyle={style.icon}
          key={id}
          data-id={id}
          value={name}
          label={(
            <label>
              <span className="Ingredient-list-item-label">{name}</span>
              <br/>
              {this.expiringSoon() ?
                <span className="Ingredient-list-item-secondary-label-red">Best By: {expiration_date}</span>
              : <span className="Ingredient-list-item-secondary-label">Best By: {expiration_date}</span>
              }
            </label>
          )}
          onCheck={this.handleCheck}
        />
        <IconButton className="Ingredient-list-item-remove-button" onClick={this.handleDelete}>
          <ContentRemove/>
        </IconButton>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//   }
// }

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteIngredient: deleteIngredient,
    selectIngredient: selectIngredient,
    deselectIngredient: deselectIngredient,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Ingredient)
