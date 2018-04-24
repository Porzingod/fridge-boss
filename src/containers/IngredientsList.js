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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ingredients.length === 0) {
      let firstThree = this.props.ingredients.slice(0, 3).map(x => Object.assign({}, {}, {id: x.id, name: x.name}))
      this.setState({ selectedIngredients: firstThree })
    }
  }

  handleCheck = (id, name) => {
    let selectedIngredients = this.state.selectedIngredients
    if ( selectedIngredients.map(x => x.id).find(x => x === id) ) {
      let index = selectedIngredients.findIndex(x => x.id === id)
      let updatedSelections = [...selectedIngredients.slice(0, index), ...selectedIngredients.slice(index + 1)]
      this.setState({ selectedIngredients: updatedSelections}, () => console.log(this.state))
    }
    else {
      this.setState({ selectedIngredients:
        [...selectedIngredients, {id: id, name: name}]
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
    const firstThreeIngredients = sortedIngredients.slice(0, 3).map ((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={true} handleCheck={this.handleCheck}/>)
    const followingIngredients = sortedIngredients.slice(3).map((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={false} handleCheck={this.handleCheck}/>)

    return (
      <div>
        <Paper style={style.paper}>
          <h2>Ingredients: </h2>
          {firstThreeIngredients}
          {followingIngredients}
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
