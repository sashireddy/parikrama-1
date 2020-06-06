import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const categoryCrudReducers =  crudReducers(pageConstants.pages.category)
export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        default:
            return categoryCrudReducers(state,action)
    }
}