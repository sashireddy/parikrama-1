import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const BranchCrudReducers =  crudReducers(pageConstants.pages.branches)
const initialState1 = {
    allRecords : ['Kormangala','Belanduru','Kharkhana'],
    ...initialState
}
export default function(state = initialState1, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        default:
            return BranchCrudReducers(state,action)
    }
}