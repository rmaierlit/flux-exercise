import React, { Component } from 'react'

import Button from "material-ui/FlatButton"

class Login extends Component {

    render() {
        if (this.props.isLoggedIn === null){
            //null means that login status is not known yet
            return null
        }
        else if (this.props.isLoggedIn){
            return (
                <div>
                    <Button label="Log Out" onClick={this.props.logOut}/>
                </div>
            )
        } else {
            return (
                <Button label="Log In" onClick={this.props.loginRedirect}/>
            )
        }
    }
}

export default Login
