import { GET_TRANSACTIONS, TRANSACTION_LOADING } from '../actions/types';

let initialState = {
    data: [],
    startDate: null,
    endDate: null,
    email: "",
    branch: "",
    loading: false,
    nextPageToken: null,
    prevPageToken: null
};

export default function(state = initialState, action){
    switch(action.type){
        case TRANSACTION_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_TRANSACTIONS:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default:
            return state;
    }
}