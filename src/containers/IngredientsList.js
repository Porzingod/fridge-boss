import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients } from '../actions/ingredients_actions'
import { searchRecipes } from '../actions/recipes_actions'

import Ingredient from '../components/Ingredient'

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  paper: {
    maxHeight: 700,
    minWidth: 250,
    maxWidth: "15%",
    overflowY: 'auto',
  },
  button: {
    marginBottom: 10
  }
};

class IngredientsList extends React.Component {
  // state = {
  //   selectedIngredients: []
  // }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // return this.state.selectedIngredients !== nextState.selectedIngredients ? false : true
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.ingredients.length === 0) {
  //     let firstThree = this.props.ingredients.slice(0, 3).map(ingr => {return {id: ingr.id, name: ingr.name}})
  //     // let firstThree = this.props.ingredients.slice(0, 3).map(ingr => ({...{}, id: ingr.id, name: ingr.name}))
  //     this.setState({ selectedIngredients: firstThree }, () => console.log(this.state.selectedIngredients))
  //   }
  // }

  // handleCheck = (id, name) => {
  //   let selectedIngredients = this.state.selectedIngredients
  //   if ( selectedIngredients.map(ingr => ingr.id).find(ingr => ingr === id) ) {
  //     let index = selectedIngredients.findIndex(ingr => ingr.id === id)
  //     let updatedSelections = [...selectedIngredients.slice(0, index), ...selectedIngredients.slice(index + 1)]
  //     this.setState({ selectedIngredients: updatedSelections}, () => console.log(this.state))
  //   }
  //   else {
  //     this.setState({ selectedIngredients:
  //       [...selectedIngredients, {id: id, name: name}]
  //     }, () => console.log(this.state))
  //   }
  // }

  handleSearch = () => {
    const selectedIngredients = this.props.selectedIngredients.map(ingr => ingr.name)
    this.props.searchRecipes(selectedIngredients)
  }

  render() {
    const {ingredients} = this.props
    const firstThreeIngredients = ingredients.slice(0, 3).map ((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={true} handleCheck={this.handleCheck}/>)
    const followingIngredients = ingredients.slice(3).map((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={false} handleCheck={this.handleCheck}/>)

    return (
      <div>
        <Paper style={style.paper}>
          <h2>My Fridge: </h2>
          <RaisedButton style={style.button} label="Search Recipes" onClick={this.handleSearch}/>
          {firstThreeIngredients}
          {followingIngredients}
        </Paper>
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
    fetchIngredients: fetchIngredients,
    searchRecipes: searchRecipes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList)
