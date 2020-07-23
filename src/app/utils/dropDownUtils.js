import store from "../store"

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
        if(map[key].hasOwnProperty("isActive")) {
            map[key].isActive && resp.push(getDropdownItem(map[key].name,key));
        } else {
            resp.push(getDropdownItem(map[key].name,key));
        }
    })
    return resp
}
const getHeadOfficeDropDown = () => {
    let resp = []
    const state = store.getState()
    Object.keys(state['BRANCHES'].allRecords).forEach(key => {
        state['BRANCHES'].allRecords[key].isHeadOffice && state['BRANCHES'].allRecords[key].isActive && resp.push(getDropdownItem(state['BRANCHES'].allRecords[key].name,key));
    })
    return resp
}

export {ValToDropDownEntry,arrToDropDownArr, getDropdownItem, getSelectedItem,dropDownResponseFromMap,getHeadOfficeDropDown}