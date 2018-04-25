import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IngredientsForm from './containers/IngredientsForm'
import IngredientsList from './containers/IngredientsList'
import RecipesList from './containers/RecipesList'

class App extends Component {
  render() {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    return (
      <MuiThemeProvider>
        <div className="App" style={{maxWidth: windowWidth, maxHeight: windowHeight}}>
          {/* <header className="App-header">

          </header> */}
          <div style={{float: "left", paddingLeft: 20, width: 260}}>
            <IngredientsForm />
            <IngredientsList />
          </div>
          <div style={{paddingRight: 20}}>
            <RecipesList />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
