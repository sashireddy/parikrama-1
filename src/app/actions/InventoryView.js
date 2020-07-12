import {getTransactionsData} from "../dataAbstraction/";
import {GET_INVENTORY_VIEW_SUMMARY,INVENTORY_VIEW_LOADING_ERROR} from './types'

const inventoryLoading = () => {
    return {
        type: GET_INVENTORY_VIEW_SUMMARY,
    }
}

const getInventory = params => async dispatch => {
    dispatch(inventoryLoading());
    try{

    }catch(err){
        dispatch({
            type:INVENTORY_VIEW_LOADING_ERROR,
            payload : {}
        })
    }
}


export default {
    getInventory
}