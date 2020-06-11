// import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const InventoryCrudReducers =  crudReducers(pageConstants.pages.branches)
const initialState = {
    data : [],
    allRecords : ['Kormangala','Belanduru','Kharkhana'],
}
export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        default:
            return InventoryCrudReducers(state,action)
    }
}