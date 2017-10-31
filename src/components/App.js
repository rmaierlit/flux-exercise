import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import Login from './Login.js'
import View from './View.js'

import helpers from '../util/helpers.js'

injectTapEventPlugin()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: null,
    }
  }

  componentDidMount = () => {
    let self = this
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
        <div 
          className="App" 
          style={{height: "100vh", display: "flex", justifyContent:"center", alignItems:"center"}}
        >
          <Card
            style={{width: "60%", height: "80%"}}
            containerStyle={{height: "100%"}}
          >
            <CardHeader
              title="FLUX"
              subtitle="SEED PROJECT"
              style={{display: "flex", justifyContent: "space-between"}}
              children={
                <Login
                  isLoggedIn={this.state.isLoggedIn}
                  loginRedirect={helpers.redirectToFluxLogin.bind(helpers)}
                  logOut={this.logOut}
                />
              }
            />
            <CardMedia
              style={{height: "70%", padding: "10px"}}
              mediaStyle={{height: "100%"}}
            >
              <View isLoggedIn={this.state.isLoggedIn}/>
            </CardMedia>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
