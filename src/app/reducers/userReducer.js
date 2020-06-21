import {initialState as stateTemplate} from "./crudReducers"
import crudReducers from "./crudReducers"
import pageConstants from "../constants/pages"

let initialState = {...stateTemplate}

const reducerFunc = crudReducers(pageConstants.pages.user);

export default function(state = initialState, action) {
    switch(action.type){
        default:
            return reducerFunc(state, action);
    }
}