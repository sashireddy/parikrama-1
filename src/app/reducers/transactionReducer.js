import { GET_TRANSACTIONS, TRANSACTION_LOADING } from '../actions/types';

let initialState = {
    data: [],
    startDate: null,
    endDate: null,
    email: "",
    branch: "MxoS2K8t8jT7MATniD4x",
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case TRANSACTION_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_TRANSACTIONS:
            let data = action.payload.data;
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default:
            return state;
    }
}