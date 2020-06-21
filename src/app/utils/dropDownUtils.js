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
export {ValToDropDownEntry,arrToDropDownArr, getDropdownItem, getSelectedItem}