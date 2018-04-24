import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients } from '../actions/ingredients'

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import Checkbox from 'material-ui/Checkbox';

const style = {
  maxHeight: 550,
  width: "20%",
  float: 'left',
  overflowY: 'auto',
};

class IngredientsList extends React.Component {
  state = {
    selectedIngredients: []
  }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedIngredients !== nextState.selectedIngredients ? false : true
  }

  handleCheck = e => {
    let selectedIngredients = this.state.selectedIngredients
    if (selectedIngredients.map(x => x.id).includes(e.target.dataset.id)) {
      let index = selectedIngredients.findIndex(x => x.id === e.target.dataset.id)
      let updatedSelections = [...selectedIngredients.slice(0, index), ...selectedIngredients.slice(index + 1)]
      this.setState({ selectedIngredients: updatedSelections}, () => console.log(this.state))
    }
    else {
      this.setState({ selectedIngredients:
        [...selectedIngredients, {id: e.target.dataset.id, name: e.target.value}]
      }, () => console.log(this.state))
    }
  }

  render() {
    const {ingredients} = this.props
    const sortedIngredients = ingredients.sort((x, y) => {
      let xDate = x.expiration_date
      let yDate = y.expiration_date
      if (xDate === yDate) {
        return 0
      }
      else {
        return xDate < yDate ? -1 : 1
      }
    })
    const mappedIngredients = sortedIngredients.map( (ingr, index) => <div><Checkbox key={ingr.id} data-id={ingr.id} value={ingr.name} label={ingr.name} onCheck={this.handleCheck}/>Expires: {ingr.expiration_date}</div> )

    return (
      <div>
        <Paper style={style}>
          {mappedIngredients}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchIngredients: fetchIngredients
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList)
