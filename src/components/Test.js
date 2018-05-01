import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const allergies = [
  {id: 393, name: "Gluten-Free"},
  {id: 394, name: "Peanut-Free"},
  {id: 398, name: "Seafood-Free"},
  {id: 399, name: "Sesame-Free"},
  {id: 400, name: "Soy-Free"},
  {id: 396, name: "Dairy-Free"},
  {id: 397, name: "Egg-Free"},
  {id: 401, name: "Sulfite-Free"},
  {id: 395, name: "Tree Nut-Free"},
  {id: 392, name: "Wheat-Free"}
];

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
export default class Test extends Component {
  state = {
    allergies: [],
  };

  handleAllergyChange = (e, index, allergies) => {
    this.setState({allergies});
  }

  allergiesSelectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return allergies.find(a => a.id === values[0].id).name
      default:
        return `${values.length} selected`;
    }
  }

  render() {
    const allergiesSelection = allergies.map( allergy =>
      <MenuItem
        key={allergy.id}
        insetChildren={true}
        checked={this.state.allergies.indexOf(allergy) > -1}
        value={allergy}
        primaryText={allergy.name}
      />
    )
    return (
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
    );
  }
}
