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
      isLoggedIn: null,
    }
  }

  componentDidMount = () => {
    var self = this
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
      .then(function() { return helpers.isLoggedIn() })
      .then(function(isLoggedIn) {
        self.setState({isLoggedIn})
      })
  }

  logOut = () => {
    helpers.logout()
    this.setState({isLoggedIn: false})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App" style={{display: 'flex', justifycontent:'center'}}>
          <Login 
            isLoggedIn={this.state.isLoggedIn}
            loginRedirect={helpers.redirectToFluxLogin.bind(helpers)}
            logOut={this.logOut}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
