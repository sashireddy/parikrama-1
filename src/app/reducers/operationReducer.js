import {GET_ALL_OPERATIONS} from "../actions/types";

const initialState = {
    allRecords: []
}

export default function(state = initialState, action){
    switch (action.type){
        case GET_ALL_OPERATIONS:
            return {
                ...state,
                initialLoad : true,
                allRecords: action.payload
            }
        default:
            return state
    }
}