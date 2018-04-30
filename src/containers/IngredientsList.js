import React from 'react'
import '../styles/Sidebar.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchIngredients, clearSelection } from '../actions/ingredients_actions'
import { searchRecipesInitial } from '../actions/recipes_actions'

import Ingredient from '../components/Ingredient'

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const windowHeight = window.innerHeight
const paperHeight = windowHeight - 424

const style = {
  paper: {
    height: paperHeight,
    minWidth: 260,
    maxWidth: "15%",
    overflowY: 'auto'
  },
  searchButton: {
    marginBottom: 20
  },
  clearButton: {
    marginTop: 5
  },
  menuWidth: {
    width: 200
  }
};

class IngredientsList extends React.Component {
  state = {
    open: false,
    cuisine: null,
    course: null
  }

  componentDidMount() {
    this.props.fetchIngredients(this.props.userId)
  }

  handleSearch = () => {
    this.props.searchRecipesInitial(this.props.selectedIngredients, this.state.cuisine, this.state.course)
  }

  handleCuisineChange = (e, index, value) => {
    this.setState({
      cuisine: value
    })
  }

  handleCourseChange = (e, index, value) => {
    this.setState({
      course: value
    })
  }

  showPopover = (e) => {
    // This prevents ghost click.
    e.preventDefault()
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  renderPopover = () => {
    const { cuisines, courses } = this.props
    const cuisinesSelection = cuisines.map( cuisine => <MenuItem value={cuisine} primaryText={cuisine}/>)
      const coursesSelection = courses.map( course => <MenuItem value={course} primaryText={course}/>)

    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'center'}}
        targetOrigin={{horizontal: 'left', vertical: 'center'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          <SelectField floatingLabelText="Cuisine" value={this.state.cuisine} onChange={this.handleCuisineChange} style={style.menuWidth} hintStyle={{textAlign: 'center'}} >
            <MenuItem value={null} primaryText="" />
            {cuisinesSelection}
          </SelectField>
          <br />
          <SelectField floatingLabelText="Course" value={this.state.course} onChange={this.handleCourseChange} style={style.menuWidth} hintStyle={{textAlign: 'center'}} >
            <MenuItem value={null} primaryText="" />
            {coursesSelection}
          </SelectField>
        </Menu>
      </Popover>
    )
  }

  render() {
    const mappedIngredients = this.props.ingredients.map( ingr => <Ingredient key={ingr.id} ingredient={ingr} checked={ingr.selected ? true : false} handleCheck={this.handleCheck}/> )

    const dateToday = new Date().toDateString().slice(4)
    return (
      <div>
        <Paper className="Ingredients-sidebar-list-header">
          <h5 style={{margin: "0"}}>Todays Date: {dateToday}</h5>
          <h2>My Fridge</h2>
          <RaisedButton style={style.searchButton} label="Search Recipes" onClick={this.handleSearch}/>
          <FlatButton label="Filters" onClick={this.showPopover} disableTouchRipple={true} labelStyle={{fontSize:"10px", padding: "0px"}}></FlatButton>
          {this.renderPopover()}
        </Paper>
        <Paper style={style.paper}>
          <FlatButton style={style.clearButton} label="Clear Selection" onClick={this.props.clearSelection} disableTouchRipple={true}/>
          <div style={{paddingTop: '10px'}}>
            {mappedIngredients}
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    ingredients: state.ingredients.ingredients,
    selectedIngredients: state.ingredients.selectedIngredients,
    page: state.recipes.page,
    cuisines: state.filters.cuisines,
    courses: state.filters.courses,

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
