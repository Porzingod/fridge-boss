import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients } from '../actions/ingredients_actions'
import { searchRecipes } from '../actions/recipes_actions'

import Ingredient from '../components/Ingredient'

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'

const windowHeight = window.innerHeight
const paperHeight = windowHeight - 200

const style = {
  paper: {
    height: paperHeight,
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

  componentDidMount() {
    this.props.fetchIngredients()
  }

  handleSearch = () => {
    const selectedIngredients = this.props.selectedIngredients.map(ingr => ingr.name)
    this.props.searchRecipes(selectedIngredients)
  }

  render() {
    const {ingredients} = this.props
    const firstThreeIngredients = ingredients.slice(0, 3).map ((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={true} handleCheck={this.handleCheck}/>)
    const followingIngredients = ingredients.slice(3).map((ingr, index) => <Ingredient key={ingr.id} id={ingr.id} name={ingr.name} expiration_date={ingr.expiration_date} checked={false} handleCheck={this.handleCheck}/>)

    const dateToday = new Date().toDateString().slice(4)
    return (
      <div>
        <Paper style={style.paper}>
          <h5>Todays Date: {dateToday}</h5>
          <h2>My Fridge</h2>
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
