import {initialState as stateTemplate} from './crudReducers';
import crudReducers from './crudReducers';
import pageConstants from '../constants/pages';

import { GET_ALL_CATEGORIES } from '../actions/types';

let initialState = {...stateTemplate}
initialState['allCategories'] = [];

const categoryCrudReducers =  crudReducers(pageConstants.pages.category)
export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_ALL_CATEGORIES: {
            return {
                ...state,
                'allCategories': action.payload
            }
        }
        default:
            return categoryCrudReducers(state,action)
    }
}