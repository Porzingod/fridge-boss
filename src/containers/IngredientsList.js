import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients } from '../actions/ingredients'

import Ingredient from '../components/Ingredient'

import Paper from 'material-ui/Paper';

const style = {
  paper: {
    maxHeight: 700,
    minWidth: 250,
    maxWidth: "15%",
    float: 'left',
    overflowY: 'auto',
  }
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
      this.setState({ selectedIngredients: updatedSelections})
    }
    else {
      this.setState({ selectedIngredients:
        [...selectedIngredients, {id: e.target.dataset.id, name: e.target.value}]
      })
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
    const mappedIngredients = sortedIngredients.map( (ingr, index) =>
      <Ingredient id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} />
    )

    return (
      <div>
        <Paper style={style.paper}>
          <h2>Ingredients: </h2>
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
