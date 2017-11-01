import React, { Component } from 'react'

import Button from "material-ui/FlatButton"

class Login extends Component {

    render() {
        if (this.props.isLoggedIn === null){
            //null means that login status is not known yet
            return (
                <Button style={{visibility: 'hidden'}} label="Log Out"/>
            )
        }
        else if (this.props.isLoggedIn){
            return (
                <Button label="Log Out" onClick={this.props.logOut}/>
            )
        } else {
            return (
                <Button label="Log In" onClick={this.props.loginRedirect}/>
            )
        }
    }
}

export default Login
