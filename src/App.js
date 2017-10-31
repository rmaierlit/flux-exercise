import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import helpers from "./helpers.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  componentWillMount() {
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
      .then(function() { return helpers.isLoggedIn() })
      .then(function(isLoggedIn) {
        if(isLoggedIn) {
          this.setState({isLoggedIn: true})
          alert("You're logged in!")
        }
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" style={{display: 'flex', justifycontent:'center'}}>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
