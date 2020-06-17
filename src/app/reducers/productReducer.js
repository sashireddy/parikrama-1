import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const ProductCrudReducers =  crudReducers(pageConstants.pages.product)

export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        default:
            return ProductCrudReducers(state,action)
    }
}