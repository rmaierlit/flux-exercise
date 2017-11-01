import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import Login from './Login.js'
import View from './View.js'
import ControlledSelector from './ControlledSelector'

import helpers from '../util/helpers.js'
import optionConverters from '../util/optionConverters.js'

const redirectToFluxLogin = helpers.redirectToFluxLogin.bind(helpers)

injectTapEventPlugin()

class App extends Component {
  state = {
      isLoggedIn: null,
      user: null,
      projects: [],
      selectedProject: -1,
      projectCells: [],
      selectedOutputCell: -1,
      dataTables: {},
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

  getDataTable = (project) => {
    if ( !(project.id in this.state.dataTables) ) {
      let dt = this.getUser().getDataTable(project.id)
      let dataTables = {...this.state.dataTables}
      dataTables[project.id] = { table: dt, handlers: {}, websocketOpen: false }

      this.setState({dataTables})
      return dataTables[project.id]
    } else {
      return this.state.dataTables[project.id]
    }
  }

  getCells = (project) => {
    return this.getDataTable(project).table.listCells()
  }

  fetchProjects = () => {
    let self = this;
    // get the user's projects from flux (returns a promise)
    this.getProjects()
      .then(function(data) {
        let projects = data.entities
        self.setState({projects})
      })
  }

  fetchCells = (project) => {
    let self = this;
    // get the project's cells (keys) from flux (returns a promise)
    this.getCells(project)
      .then(function(data) {
        console.log('data: ', data.entities)
        let projectCells = data.entities
        self.setState({projectCells})
      })
  }

  handleProjectChange = (event, index, value) => {
    this.setState({selectedProject: value})

    if(value != -1) {
      let project = this.state.projects.filter( (p) => p.id === value )[0]
      this.fetchCells(project)
    }
  }

  handleCellChange = (event, index, value) => {
    this.setState({selectedOutputCell: value})
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
                (<ControlledSelector
                  default="Select a Project"
                  visible={this.state.isLoggedIn}
                  handleChange={this.handleProjectChange}
                  options={this.state.projects}
                  convert={optionConverters.projectToItem}
                  value={this.state.selectedProject}
                  key={0}
                />),
                (<Login
                  isLoggedIn={this.state.isLoggedIn}
                  loginRedirect={redirectToFluxLogin}
                  logOut={this.logOut}
                  key={1}
                />),
              ]}
            />
            <CardMedia
              style={{height: "60%", padding: "10px"}}
              mediaStyle={{height: "100%"}}
            >
              <View isLoggedIn={this.state.isLoggedIn}/>
            </CardMedia>
            <ControlledSelector
              default="Select a Cell"
              visible={this.state.isLoggedIn}
              handleChange={this.handleCellChange}
              options={this.state.projectCells}
              convert={optionConverters.cellToItem}
              value={this.state.selectedOutputCell}
            />
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
