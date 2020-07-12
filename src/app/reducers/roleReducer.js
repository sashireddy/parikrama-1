import {initialState as stateTemplate} from "./crudReducers"
import crudReducers from "./crudReducers"
import pageConstants from "../constants/pages"

import { GET_ALL_ROLES } from "../actions/types";

let initialState = {...stateTemplate}
initialState["allRecords"] = [];

const reducerFunc = crudReducers(pageConstants.pages.role);

export default function(state = initialState, action) {
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_ALL_ROLES: {
            return {
                ...state,
                initialLoad : true,
                "allRecords": action.payload
            }
        }
        default:
            return reducerFunc(state, action);
    }
}