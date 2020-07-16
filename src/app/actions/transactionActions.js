import {addNotification} from "./notification";
import { GET_TRANSACTIONS, TRANSACTION_LOADING } from './types';
import {getTransactionsData} from "../dataAbstraction/transactions";

const transactionLoading = () => {
    return {
        type: TRANSACTION_LOADING
    }
}

const notifyStatus = (res, title) => {
    if(res.flashMessage){
      addNotification({
        title: title,
        type: res.flashMessage.type,
        message : res.flashMessage.message
      });
    }
}

const getTransactions = params =>  async (dispatch) => {
    dispatch(transactionLoading());
    try {
        const transactions = await getTransactionsData(params);
        notifyStatus(transactions, "LOAD TRANSACTIONS");
        dispatch({
            type: GET_TRANSACTIONS,
            payload: transactions
        });
    } catch(err){
        notifyStatus({
            title: "LOAD TRANSACTIONS",
            type: "danger",
            message : "Unable to load data, Some thing went wrong"
        });
    }
}

export default {
    getTransactions
}