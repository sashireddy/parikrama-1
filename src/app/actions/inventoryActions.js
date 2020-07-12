import { addData,deleteData,getData,updateData,createTransaction,getPendingTransactions } from '../dataAbstraction/inventory'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'
import {GET_PENDING_TRANSACTIONS} from './types'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
    const acceptOrRejectExtRequest = params => async dispatch => {

    }
    const createInventoryTransaction = params => async dispatch => {
      const resp = await createTransaction(params)
      dispatch({
        type: "GET_INVENTORY",
        payload: resp,
      });
    }
    const loadPendingTransactions = params => async dispatch => {
      const resp = await getPendingTransactions(params)
      dispatch({
        type: GET_PENDING_TRANSACTIONS,
        payload : resp
      })
    }
  return {
    //other actions apart from the crud operations go here 
    getData : defaultSkeletonActions.getData,
    loadPendingTransactions,
    acceptOrRejectExtRequest,
    createInventoryTransaction
  }

})()
export default actions