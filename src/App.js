import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'
import RecipesList from './containers/RecipesList'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {/* <header className="App-header">

          </header> */}
          <div style={{float: "left", paddingLeft: 20, width: 260}}>
            <IngredientsForm />
            <IngredientsList />
          </div>
          <div style={{paddingRight: 20, paddingTop: 15}}>
            <RecipesList />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
