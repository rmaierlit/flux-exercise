import React, { Component } from 'react'

import Button from "material-ui/FlatButton"

const loginStyle = {marginLeft: "auto"}

class Login extends Component {

    render() {
        if (this.props.isLoggedIn === null){
            //null means that login status is not known yet
            return null;
        }
        else if (this.props.isLoggedIn){
            return (
                <Button style={loginStyle} label="Log Out" onClick={this.props.logOut}/>
            )
        } else {
            return (
                <Button style={loginStyle} label="Log In" onClick={this.props.loginRedirect}/>
            )
        }
    }
}

export default Login
