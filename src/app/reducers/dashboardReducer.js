import {GET_DASHBOARD_DATA, DASHBOARD_LOADING} from "../actions/types";

const initialState = {
    loading: false,
    dashboardData: {}
}

export default function(state = initialState, action){
    switch (action.type){
        case DASHBOARD_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_DASHBOARD_DATA:
            return {
                ...state,
                loading: false,
                "dashboardData": action.payload
            }
        default:
            return state
    }
}