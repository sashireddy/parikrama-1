const ValToDropDownEntry = (entry) => {
    return {
        value:entry,
        label:entry
    }
}
const arrToDropDownArr = (arr) => {
    return arr.map(ValToDropDownEntry)
}
export {ValToDropDownEntry,arrToDropDownArr}