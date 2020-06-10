import {initialState as stateTemplate} from "./crudReducers"
import crudReducers from "./crudReducers"
import pageConstants from "../constants/pages"

import { GET_ALL_ROLES } from "../actions/types";

let initialState = {...stateTemplate}
initialState["allRoles"] = [];

const reducerFunc = crudReducers(pageConstants.pages.role);

export default function(state = initialState, action) {
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_ALL_ROLES: {
            return {
                ...state,
                "allRoles": action.payload
            }
        }
        default:
            return reducerFunc(state, action);
    }
}