import {getData,downloadReport} from "../dataAbstraction/inventorySummary";
import {GET_INVENTORY_VIEW_SUMMARY,INVENTORY_VIEW_LOADING_ERROR,INVENTORY_VIEW_LOADING} from './types'

const inventoryLoading = () => {
    return {
        type: INVENTORY_VIEW_LOADING,
    }
}

const getInventory = params => async dispatch => {
    dispatch(inventoryLoading());
    try{
        const payload = await getData(params)
        dispatch({
            type: GET_INVENTORY_VIEW_SUMMARY,
            payload
        })
    }catch(err){
        dispatch({
            type:INVENTORY_VIEW_LOADING_ERROR,
            payload : {}
        })
    }
}

const generateCSV = params => async dispatch => {
    try{
        await downloadReport(params)
    }catch(err){
        console.log(err)
    }
}

export default {
    getInventory,
    generateCSV
}