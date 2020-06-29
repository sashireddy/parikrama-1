import {initialState as stateTemplate} from './crudReducers';
import { GET_TRANSACTIONS, TRANSACTION_LOADING } from '../actions/types';

let initialState = {...stateTemplate}

export default function(state = initialState, action){
    switch(action.type){
        case TRANSACTION_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_TRANSACTIONS:
            let data = state.data.concat(action.payload.data);
            return {
                ...state,
                ...action.payload,
                data,
                loading: false
            }
        default:
            return state;
    }
}