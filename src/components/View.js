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
            this.renderViewport()
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

    renderViewport() {
        let viewport = this.getViewport()
        if (!this.props.data){
            viewport.setGeometryEntity(null)
        } else if (true || FluxViewport.isKnownGeom(this.props.data.value)) {
            //add it to the viewport
            viewport.setGeometryJson( JSON.stringify(this.props.data.value) )
        } else (
            console.error('Data does not represent a known geometric object')
        )
    }

    render() {
        return (
            <div 
                ref={(view) => {this.view = view}}
                style={{
                    height: "100%",
                    visibility: this.props.isLoggedIn? "visible" : "visible",
                }}
            >
            </div>
        )
    }
}

export default View
