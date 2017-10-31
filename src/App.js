import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Login from './Login.js'

import helpers from './helpers.js'

injectTapEventPlugin()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
    }
  }

  componentWillMount = () => {
    var self = this
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
      .then(function() { return helpers.isLoggedIn() })
      .then(function(isLoggedIn) {
        if(isLoggedIn) {
          self.setState({isLoggedIn: true})
        }
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" style={{display: 'flex', justifycontent:'center'}}>
          <Login 
            isLoggedIn={this.state.isLoggedIn}
            redirect={helpers.redirectToFluxLogin.bind(helpers)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
