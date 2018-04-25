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
        <div className="App" style={{maxWidth: windowWidth, maxHeight: windowHeight, paddingLeft: 20, paddingRight: 20}}>
          {/* <header className="App-header">

          </header> */}
          <div style={{float: "left", width: 260}}>
            <IngredientsForm />
            <IngredientsList />
          </div>
          <div>
            <RecipesList />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
