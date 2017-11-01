import React, { Component } from 'react'
import { SelectField, MenuItem } from 'material-ui'

class ProjectSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: -1
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        let items = this.props.options.map((option) => {
            return (
                <MenuItem
                    value={option.value}
                    primaryText={option.text}
                    key={option.value}
                />
            )
        })

        items.unshift(
            <MenuItem
                value={-1}
                primaryText={'Select a Project'}
                key={-1}
            />
        )

        return (
            <SelectField
                value={this.state.value}
                onChange={this.handleChange}
            >
                {items}
            </SelectField>
        )
    }
}

export default ProjectSelector
