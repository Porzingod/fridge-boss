import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { deleteIngredient } from '../actions/ingredients'

import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/content/remove.js'
import Divider from 'material-ui/Divider';

const style = {
  root: {
    float: "left",
    width: "81%"
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

  handleCheck = (e) => {
    const {id, name} = this.props
    this.props.handleCheck(id, name)
  }

  handleDelete = (e) => {
    this.props.deleteIngredient(this.props.id)
  }

  render() {
    const {id, name, expiration_date, checked} = this.props
    return (
      <div style={{paddingBottom: 70}}>
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
                <span style={{fontSize: 12, opacity: 0.8, color: "red"}}>Expires: {expiration_date}</span>
              : <span style={{fontSize: 12, opacity: 0.8}}>Expires: {expiration_date}</span>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteIngredient: deleteIngredient
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Ingredient)
