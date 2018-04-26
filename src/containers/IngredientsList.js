import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients, clearSelection } from '../actions/ingredients_actions'
import { searchRecipesInitial } from '../actions/recipes_actions'

import Ingredient from '../components/Ingredient'

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'

const windowHeight = window.innerHeight
const paperHeight = windowHeight - 360

const style = {
  div: {
    paddingTop: 10,
  },
  paper: {
    height: paperHeight,
    minWidth: 260,
    maxWidth: "15%",
    overflowY: 'auto'
  },
  paperHeader: {
    height: 150,
    minWidth: 250,
    maxWdith: "15%",
    paddingTop: 10,
  },
  searchButton: {
    marginBottom: 20
  },
  clearButton: {
    marginTop: 5
  }
};

class IngredientsList extends React.Component {

  componentDidMount() {
    this.props.fetchIngredients()
  }

  handleSearch = () => {
    this.props.searchRecipesInitial(this.props.selectedIngredients)
  }

  render() {
    const mappedIngredients = this.props.ingredients.map( ingr => <Ingredient key={ingr.id} ingredient={ingr} checked={ingr.selected ? true : false} handleCheck={this.handleCheck}/> )

    const dateToday = new Date().toDateString().slice(4)
    return (
      <div>
        <Paper style={style.paperHeader}>
          <h5 style={{margin: "0"}}>Todays Date: {dateToday}</h5>
          <h2>My Fridge</h2>
          <RaisedButton style={style.searchButton} label="Search Recipes" onClick={this.handleSearch}/>
        </Paper>
        <Paper style={style.paper}>
          <FlatButton style={style.clearButton} label="Clear Selection" onClick={this.props.clearSelection}/>
          <div style={style.div}>
            {mappedIngredients}
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients,
    selectedIngredients: state.ingredients.selectedIngredients,
    page: state.recipes.page
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchIngredients: fetchIngredients,
    searchRecipesInitial: searchRecipesInitial,
    clearSelection: clearSelection
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList)
