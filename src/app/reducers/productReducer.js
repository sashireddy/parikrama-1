import {initialState} from './crudReducers'
import {GET_ALL_PRODUCTS} from '../actions/types'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const ProductCrudReducers =  crudReducers(pageConstants.pages.product)

export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                loading: false,
                allRecords : action.payload
            }
        default:
            return ProductCrudReducers(state,action)
    }
}