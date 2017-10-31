import React, { Component } from 'react';
import Button from "material-ui/RaisedButton"

class Login extends Component {

    render() {
        if (this.props.isLoggedIn === null){
            //null means that login status is not known yet
            return null;
        }
        else if (this.props.isLoggedIn){
            return (
                <Button onClick={this.props.logOut}>Log Out</Button>
            );
        } else {
            return (
                <Button onClick={this.props.loginRedirect}>Log In</Button>
            )
        }
    }
}

export default Login
