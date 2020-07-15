import store from '../store'

export const validateIntialLoad = state =>{
    return state.initialLoad
}
export const getCategory = categoryId => {
    return store.getState()["CATEGORY"].allCategories[categoryId];
}
export const getUnit = unitId => {
    return store.getState()["UNITS"].allRecords[unitId];
}

export const getProduct = productId => {
    return store.getState()["PRODUCTS"].allRecords[productId];
}

export const getLoggedInUserInfo = () => {
    return store.getState()['USER'].loggedInUser;
}
export const getBranchInfo = branchId => {
    return store.getState()['BRANCHES'].allRecords[branchId]
}

export const getDisabledPayload = (record) => {
    record.isActive = false
    return record
}
export const getActivePayload = (record) => {
    record.isActive = true
    return record
}

export const getBranch = branchId => {
    return store.getState()['BRANCHES'].allRecords[branchId];
}

export const getRole = roleId => {
    return store.getState()['ROLE'].allRecords[roleId];
}

export const isAdmin = () => {
    return true
}