import React, { Component } from 'react'
import box_data from '../util/box.js'

const FluxViewport = window.FluxViewport

class View extends Component{
    constructor(props) {
        super(props)
        this.state = { viewport: null }
    }

    componentDidUpdate = () => {
        if (this.props.isLoggedIn) {
            this.getViewport()
        }
    }

    getViewport = () => {
        if (!this.state.viewport) {
            const viewport = new FluxViewport(this.view)
            viewport.setupDefaultLighting()
            viewport.setClearColor(0xffffff)
            viewport.setGeometryEntity(box_data)
            this.setState({viewport})

            return viewport
        } else {
            return this.state.viewport
        }
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
