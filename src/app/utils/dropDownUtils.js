const ValToDropDownEntry = (entry) => {
    return {
        value:entry,
        label:entry
    }
}
const arrToDropDownArr = (arr) => {
    return arr.map(ValToDropDownEntry)
}

const getDropdownItem = (label, value) => {
    return {
        label,
        value
    }
}
const getSelectedItem = (arr, value) => {
    return arr.find(item => item.value === value);
}

const dropDownResponseFromMap = map => {
    let resp = []
    Object.keys(map).forEach(key => {
        resp.push(getDropdownItem(map[key].name,key))
    })
    return resp
}

export {ValToDropDownEntry,arrToDropDownArr, getDropdownItem, getSelectedItem,dropDownResponseFromMap}