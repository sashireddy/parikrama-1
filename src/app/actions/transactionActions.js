import { GET_TRANSACTIONS, TRANSACTION_LOADING, TRANSACTION_LOAD_ERROR } from './types';
import {getTransactionsData} from "../dataAbstraction/transactions";

const transactionLoading = () => {
    return {
        type: TRANSACTION_LOADING
    }
}

const getTransactions = params =>  async (dispatch) => {
    dispatch(transactionLoading());
    try {
        const transactions = await getTransactionsData(params);
        dispatch({
            type: GET_TRANSACTIONS,
            payload: transactions
        });
    } catch(err){
        dispatch({
            type: TRANSACTION_LOAD_ERROR,
            payload: {}
        });
    }
}

export default {
    getTransactions
}