import React, { Component } from 'react'
import box_data from '../util/box.js'

const FluxViewport = window.FluxViewport

function houseMapper(entity){
    //if(!entity.geometryParameters.geometry)
    return entity.geometryParameters.geometry
}

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
        } else if (FluxViewport.isKnownGeom(this.props.data.value)) {
            //add it to the viewport
            viewport.setGeometryEntity(this.props.data.value)
        } else if ( FluxViewport.isKnownGeom(houseMapper(this.props.data.value[0])) ) {
            //if it's a house, map out the usuable geometry data and add all parts to the viewport
            viewport.setGeometryEntity(this.props.data.value.map(houseMapper))
        } else (
            console.error('Data does not represent a known geometric object')
        )
    }

    render() {
        return (
            <div 
                ref={(view) => {this.view = view}}
                style={{
                    position: "absolute",
                    top: 0, bottom: 0, left: 0, right: 0,
                    visibility: this.props.isLoggedIn? "visible" : "hidden",
                }}
            >
            </div>
        )
    }
}

export default View
