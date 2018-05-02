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

class IngredientsList extends React.Component {
  state = {
    open: false,
    cuisine: null,
    course: null,
    allergies: [],
    diets: []
  }

  componentDidMount() {
    this.props.fetchIngredients(this.props.userId)
  }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.userId !== this.props.userId ? true : false
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //   this.props.fetchIngredients(nextProps.userId)
  // }

  handleSearch = () => {
    this.props.searchRecipesInitial(this.props.selectedIngredients, this.state.cuisine, this.state.course, this.state.allergies, this.state.diets)
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

  handleAllergyChange = (e, index, allergies) => {
    this.setState({allergies});
  }

  handleDietChange = (e, index, diets) => {
    this.setState({diets});
  }

  allergiesSelectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.props.allergies.find(a => a.id === values[0].id).name;
      default:
        return `${values.length} selected`;
    }
  }

  dietsSelectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.props.diets.find(d => d.id === values[0].id).name;
      default:
        return `${values.length} selected`;
    }
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

  // Filter
  renderPopover = () => {
    const { cuisines, courses, allergies, diets } = this.props
    const cuisinesSelection = cuisines.map( cuisine =>
      <MenuItem
        value={cuisine}
        primaryText={cuisine}
      />
    )
    const coursesSelection = courses.map( course =>
      <MenuItem
        value={course}
        primaryText={course}
      />
    )
    const allergiesSelection = allergies.map( allergy =>
      <MenuItem
        key={allergy.id}
        insetChildren={true}
        checked={this.state.allergies.indexOf(allergy) > -1}
        value={allergy}
        primaryText={allergy.name}
      />
    )
    const dietsSelection = diets.map( diet =>
      <MenuItem
        key={diet.id}
        insetChildren={true}
        checked={this.state.diets.indexOf(diet) > -1}
        value={diet}
        primaryText={diet.name}
      />
    )
    return (
      <Popover
        className="Ingredients-sidebar-filter"
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'center'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          {/* cuisines */}
          <SelectField
            value={this.state.cuisine}
            onChange={this.handleCuisineChange}
            floatingLabelText="Cuisine"
            floatingLabelFixed={true}
            inputStyle={{paddingLeft: '5px'}}
            className="Ingredients-sidebar-filter-select"
          >
            <MenuItem value={null} primaryText="-" />
            {cuisinesSelection}
          </SelectField>
          <br />
          {/* courses */}
          <SelectField
            value={this.state.course}
            onChange={this.handleCourseChange}
            floatingLabelText="Course"
            floatingLabelFixed={true}
            inputStyle={{paddingLeft: '5px'}}
            className="Ingredients-sidebar-filter-select"
          >
            <MenuItem value={null} primaryText="-" />
            {coursesSelection}
          </SelectField>
          <br />
          {/* allergies */}
          <SelectField
            value={this.state.allergies}
            onChange={this.handleAllergyChange}
            selectionRenderer={this.allergiesSelectionRenderer}
            multiple={true}
            floatingLabelText="Allergies"
            floatingLabelFixed={true}
            inputStyle={{paddingleft: '5px'}}
            className="Ingredients-sidebar-filter-select"
          >
            {allergiesSelection}
          </SelectField>
          <br />
          {/* diets */}
          <SelectField
            value={this.state.diets}
            onChange={this.handleDietChange}
            selectionRenderer={this.dietsSelectionRenderer}
            multiple={true}
            floatingLabelText="Diets"
            floatingLabelFixed={true}
            inputStyle={{paddingleft: '5px'}}
            className="Ingredients-sidebar-filter-select"
          >
            {dietsSelection}
          </SelectField>
          <br />
        </Menu>
      </Popover>
    )
  }

  render() {
    const mappedIngredients = this.props.ingredients.map( ingr => <Ingredient key={ingr.id} ingredient={ingr} checked={ingr.selected ? true : false} handleCheck={this.handleCheck}/> )

    const dateToday = new Date().toDateString().slice(4)
    return (
      <div className="Ingredients-list">
        <Paper className="Ingredients-list-header">
          <h5 style={{margin: "0"}}>Todays Date: {dateToday}</h5>
          <h2 className="Ingredients-list-header-title">My Fridge</h2>
          <RaisedButton
            className="Ingredients-sidebar-search-button"
            label="Search Recipes"
            onClick={this.handleSearch}/>
          <br/>
          <FlatButton
            className="Ingredients-search-filter"
            label="Filters"
            onClick={this.showPopover}
            disableTouchRipple={true}
            labelStyle={{fontSize:"12px", padding: "0px"}}
          ></FlatButton>
          <br/>
          {this.renderPopover()}
          <FlatButton
            label="Clear Ingredient Selection"
            labelStyle={{paddingTop: "0px"}}
            onClick={this.props.clearSelection}
            disableTouchRipple={true}
          />
        </Paper>

        <Paper
          className="Ingredients-list-container"
        >
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
    allergies: state.filters.allergies,
    diets: state.filters.diets
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
