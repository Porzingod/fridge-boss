import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {/* <header className="App-header">

          </header> */}
          <IngredientsForm />
          <hr></hr>
          <IngredientsList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
