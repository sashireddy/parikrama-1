import store from '../store'

export const validateIntialLoad = state =>{
    return state.initialLoad
}
export const getCategory = categoryId => {
    return store.getState()["CATEGORY"].allCategories[categoryId]
}
export const getUnit = unitId => {
    return store.getState()["UNITS"].allRecords[unitId] 
}

export const getProduct = productId => {
    return store.getState()["PRODUCTS"].allRecords[productId]
}

export const getLoggedInUserInfo = () => {
    return store.getState()['USER'].loggedInUser;
}
