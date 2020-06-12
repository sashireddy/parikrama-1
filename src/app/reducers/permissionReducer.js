import {GET_ALL_PERMISSIONS} from "../actions/types";

const initialState = {
    allPermissions: []
}

export default function(state = initialState, action){
    switch (action.type){
        case GET_ALL_PERMISSIONS:
            console.log("Payload", action.payload);
            return {
                ...state,
                "allPermissions": action.payload
            }
        default:
            return state
    }
}