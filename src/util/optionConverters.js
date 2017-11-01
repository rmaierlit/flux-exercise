import MenuItem from "material-ui/MenuItem"

let converters = {}

converters.projectToItem= function(project) {
    let item = {
        value: project.id,
        text: project.name,
    }

    return item
}

converters.cellToItem= function(cell) {
    let item = {
        value: cell.id,
        text: cell.label,
    }

    return item
}

export default converters