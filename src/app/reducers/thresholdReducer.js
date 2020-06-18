import { GET_ALL_THRESHOLD } from '../actions/types'
import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const ProductCrudReducers =  crudReducers(pageConstants.pages.product)

export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here

        case GET_ALL_THRESHOLD: {
            return {
                ...state,
                'allCategories': action.payload
            }
        }


        default:
            return ProductCrudReducers(state,action)
    }
}