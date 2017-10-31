import React, { Component } from 'react'

const FluxViewport = window.FluxViewport

class View extends Component{
    componentDidMount = (prevProps) => {
        const viewport = new FluxViewport(this.view)
        viewport.setupDefaultLighting()
    }

    render() {
        return (
            <div 
                ref={(view) => {this.view = view}}
                style={{
                    height: "100%",
                    visibility: this.props.isLoggedIn? "visible" : "hidden",
                }}
            >
            </div>
        )
    }
}

export default View
