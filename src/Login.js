import React, { Component } from 'react';
import Button from "material-ui/RaisedButton"

class Login extends Component {

    render() {
        if (!this.props.isLoggedIn){
            return (
                <Button onClick={this.props.redirect}>Log In</Button>
            )
        } else {
            return null;
        }
    }
}

export default Login
