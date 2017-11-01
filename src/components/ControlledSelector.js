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
                value={0}
                primaryText={this.props.default}
                key={0}
            />
        )
        if (this.props.visible) {
            return (
                <SelectField
                    value={this.props.value}
                    onChange={this.props.handleChange}
                >
                    {items}
                </SelectField>
            )
        } else {
            return null;
        }
    }
}

export default ControlledSelector
