import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const userCrudReducers =  crudReducers(pageConstants.pages.user)
export default function(state = initialState, action){
    switch(action.type){
        default:
            return userCrudReducers(state,action)
    }
}