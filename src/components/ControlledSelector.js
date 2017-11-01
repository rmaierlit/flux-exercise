import React, { Component } from 'react'
import { SelectField, MenuItem } from 'material-ui'

class ControlledSelector extends Component {
    render() {
        let items = this.props.options.map((option) => {
            let itemData = this.props.convert(option)
            return (
                <MenuItem
                    value={itemData.value}
                    primaryText={itemData.text}
                    key={itemData.value}
                />
            )
        })

        items.unshift(
            <MenuItem
                value={-1}
                primaryText={this.props.default}
                key={-1}
            />
        )

        return (
            <SelectField
                style={{visibility: this.props.visible? 'visible' : 'hidden' }}
                value={this.props.value}
                onChange={this.props.handleChange}
            >
                {items}
            </SelectField>
        )
    }
}

export default ControlledSelector
