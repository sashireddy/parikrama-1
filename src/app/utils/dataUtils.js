import store from '../store'
import {addNotification} from '../actions/notification'

export const validateIntialLoad = state =>{
    return state.initialLoad
}

export const validateLogginUserLoad  = state => {
    return state.loggedInUserLoad
}

export const getCategory = categoryId => {
    return store.getState()["CATEGORY"].allCategories[categoryId];
}

export const getCategoryCount = () => {
    let allCategories = store.getState()["CATEGORY"].allCategories;
    return Object.keys(allCategories).filter(rec => allCategories[rec].isActive).length;
}

export const getUserCount = () => {
    let allUsers = store.getState()["USER"].allRecords;
    return Object.keys(allUsers).filter(rec => allUsers[rec].isActive).length;
}

export const getUnit = unitId => {
    return store.getState()["UNITS"].allRecords[unitId];
}

export const getProduct = productId => {
    return store.getState()["PRODUCTS"].allRecords[productId];
}

export const getProductCount = () => {
    let allProducts = store.getState()["PRODUCTS"].allRecords;
    return Object.keys(allProducts).filter(rec => allProducts[rec].isActive).length;
}

export const getBranchCount = () => {
    let allBranches = store.getState()["BRANCHES"].allRecords;
    return Object.keys(allBranches).filter(rec => allBranches[rec].isActive).length;
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
    const branch = store.getState()['BRANCHES'].allRecords[branchId];
    return branch ? branch : {};
}

export const getRole = roleId => {
    return store.getState()['ROLE'].allRecords[roleId];
}

export const getOperation = operationId => {
    return store.getState()['OPERATION'].allRecords[operationId.toUpperCase()];
}

export const isAdmin = () => {
    return true
}
export const getThreshold = (productId,branchId) => {
    try{
        return store.getState()['PRODUCTS'].allRecords[productId][branchId] || 0;
    }catch(err) {
        return undefined
    }
}
export const transformInventoryRow = data => {
    const product = getProduct(data.product)
    data.productName = product.name
    data.categoryName = getCategory(product.category).name
    data.unitName = getUnit(product.unit).name
    return data
}

export const getName = (module, id) => {
    switch(module) {
        case "THRESHOLDS":
        case "BRANCH" :
            return getBranch(id).name;
        case "CATEGORY" :
            return getCategory(id).name;
        default:
            return id;
    }
}

export const validateName = (module, name) => {
    let resp = true
    let records;
    switch (module) {
        case "BRANCH" :
            records = store.getState()["BRANCHES"].allRecords
            break;
        case "CATEGORY" :
            records =store.getState()["CATEGORY"].allRecords
            break;
        case "PRODUCT":
            records = store.getState()["PRODUCTS"].allRecords
            break;
        case "UNIT":
            records = store.getState()["UNITS"].allRecords
            break;
        default:
            break;
    }
    if(records){
        const keys = Object.keys(records)
        keys.forEach(entry => {
            if(records[entry].name.toUpperCase().trim() === name.toUpperCase().trim()){
                addNotification({
                    title : "Please Check the Parameters",
                    message: `${module} with name ${name} already exists`,
                    type : "warning"
    
                })
                resp = false
            }
        })
    }
    return resp;
}
