import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

import { GET_ALL_BRANCHES } from '../actions/types';


const BranchCrudReducers =  crudReducers(pageConstants.pages.branches)
const initialState1 = {
    allRecords : [],
    ...initialState
}
export default function(state = initialState1, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_ALL_BRANCHES: {
            return {
                ...state,
                'allRecords': action.payload
            }
        }
        default:
            return BranchCrudReducers(state,action)
    }
}