import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import Login from './Login.js'
import View from './View.js'
import ProjectSelector from './ProjectSelector'

import helpers from '../util/helpers.js'

const redirectToFluxLogin = helpers.redirectToFluxLogin.bind(helpers)

injectTapEventPlugin()

class App extends Component {
  state = {
      isLoggedIn: null,
      user: null,
      options: [],
  }

  componentDidMount = () => {
    let self = this
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
      .then(function() { return helpers.isLoggedIn() })
      .then(function(isLoggedIn) {
        self.setState({isLoggedIn})
        if (isLoggedIn) {
          self.fetchProjects()
        }
      })
  }

  getUser = () => {
    if (!this.state.user) {
      let user = helpers.getUser()
      this.setState({user})
      return user
    }
    return this.state.user
  }

  getProjects = () => {
    return this.getUser().listProjects()
  }

  fetchProjects = () => {
    let self = this;
    // get the user's projects from flux (returns a promise)
    this.getProjects()
      .then(function(data) {
        let projects = data.entities
        // for each project, create an option for the select box with
        // the project.id as the value and the project.name as the label
        let options = projects.map(function(project) {
          return { value:project.id, text:project.name }
        })
        self.setState({options})
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
              children={[
                (<ProjectSelector options={this.state.options} key={0} />),
                (<Login
                  isLoggedIn={this.state.isLoggedIn}
                  loginRedirect={redirectToFluxLogin}
                  logOut={this.logOut}
                  key={1}
                />),
              ]}
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
