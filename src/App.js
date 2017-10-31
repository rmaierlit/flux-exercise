import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Button from "material-ui/FlatButton"

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App" style={{display: 'flex', justifycontent:'center'}}>
          <Button>Click Me!</Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
