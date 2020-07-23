import { addData,deleteData,getData,updateData,createTransaction,getPendingTransactions,generateCsv,respondToTransferRequest,rejectRequest } from '../dataAbstraction/inventory'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'
import {GET_PENDING_TRANSACTIONS} from './types'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
    const acceptOrRejectExtRequest = params => async dispatch => {
      // dispatch(defaultSkeletonActions.setLoading())
      try{
        const resp = await respondToTransferRequest(params)
        dispatch({
        type: GET_PENDING_TRANSACTIONS,
        payload : resp
        })
      }catch (err) {

      }
    }
    const createInventoryTransaction = params => async dispatch => {
      const resp = await createTransaction(params)
      dispatch({
        type: "GET_INVENTORY",
        payload: resp,
      });
    }
    const loadPendingTransactions = params => async dispatch => {
      try{
        const resp = await getPendingTransactions(params)
        dispatch({
          type: GET_PENDING_TRANSACTIONS,
          payload : resp
        })
      }catch(err){

      }
    }
    const rejectInventoryRequest = params => async dispatch => {
      try{
        const resp = await rejectRequest(params)
        dispatch({
          type: GET_PENDING_TRANSACTIONS,
          payload : resp
        })
      }catch(err){

      }
    }
    const downloadCSV = params => async () => {
      generateCsv(params)
    }
  return {
    //other actions apart from the crud operations go here 
    getData : defaultSkeletonActions.getData,
    loadPendingTransactions,
    acceptOrRejectExtRequest,
    createInventoryTransaction,
    rejectInventoryRequest,
    downloadCSV
  }

})()
export default actions