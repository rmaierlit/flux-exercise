import React, { Component } from 'react'
import box_data from '../util/box.js'

const FluxViewport = window.FluxViewport

class View extends Component{
    componentDidMount = (prevProps) => {
        const viewport = new FluxViewport(this.view)
        viewport.setupDefaultLighting()
        viewport.setClearColor(0xffffff)

        viewport.setGeometryEntity(box_data)
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
