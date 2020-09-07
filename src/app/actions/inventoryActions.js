import { addData,deleteData,getData,updateData,createTransaction,getPendingTransactions,generateCsv,respondToTransferRequest,rejectRequest } from '../dataAbstraction/inventory'
import { getInventoryHistoryRecords } from '../dataAbstraction/inventoryRequest'
import { getLoggedInUserInfo } from '../utils/dataUtils'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'
import {GET_PENDING_TRANSACTIONS, GET_INVENTORY_HISTORY} from './types'
import {addNotification} from "./notification";

const sendNotification = (params,error) => {
  let notificationArr = []
  let message = ""
  let tittle = ""
  let type = error ? "danger" : "success"
  switch(params.type){
    case "RAISE_REQUEST":
      let str = ""
      params.rowsArr.forEach( row => {
        str = str + row.productName
      })
      tittle = "Request Raised"
      message = `Inventory request Raised successfully ${str}`
      break
    case "TransferOperation":
      tittle = "Inventory Transfered"
      message = `${params.operationalQuantity}  ${params.productName} transfered from ${params.fromBranchName} to ${params.toBranchName}`
      break
    case "ISSUE_PRODUCT":
      tittle = "Issue Product"
      message = `${params.operationalQuantity}  ${params.productName} issued sucessfully`
      break
    case "ADD_PRODUCT":
      params.rowsArr.forEach(row => {
        notificationArr.push({
          tittle : "Add Product",
          message : `${row.operationalQuantity} ${row.productName} added sucessfully `
        })
      })
      
      break
    case "ACCEPTED_REJECTED_TRANSACTIONS":
      tittle = "LOAD TRANSACTIONS";
      message = "Transaction loaded sucessfully.";
      break;
    default :
  }
  message = error ? "We encountered an error while processing your request" : message
  if(message.length !== 0){
    addNotification({
      title: tittle,
      type: type,
      message,
    })
  }
  if(notificationArr.length > 0 && !error)  {
    notificationArr.forEach(msg =>  {
      addNotification({
        title: msg.tittle,
        type: type,
        message : msg.message,
      })
    })
  }

}

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
    const acceptOrRejectExtRequest = params => async dispatch => {
      // dispatch(defaultSkeletonActions.setLoading())
      try{
        dispatch(defaultSkeletonActions.setLoading())
        const resp = await respondToTransferRequest(params)
        dispatch({
        type: GET_PENDING_TRANSACTIONS,
        payload : resp
        })
        sendNotification(params)
      }catch (err) {
        dispatch(defaultSkeletonActions.removeLoadingIcon())
        sendNotification(params,true)

      }
    }
    const createInventoryTransaction = params => async dispatch => {
      try{
        dispatch(defaultSkeletonActions.setLoading())
        const resp = await createTransaction(params)
        if(params.type=== "RAISE_REQUEST" ){
          loadPendingTransactions({
            branch:getLoggedInUserInfo().branch
          })(dispatch)
        } 
        dispatch({
          type: "GET_INVENTORY",
          payload: resp,
        });
        sendNotification(params)
      }catch(err){
        dispatch(defaultSkeletonActions.removeLoadingIcon())
        sendNotification(params,true)
      }

    }
    const loadPendingTransactions = params => async dispatch => {
      try{
        dispatch(defaultSkeletonActions.setLoading())
        const resp = await getPendingTransactions(params)
        dispatch({
          type: GET_PENDING_TRANSACTIONS,
          payload : resp
        })
        sendNotification(params)
      }catch(err){
        dispatch(defaultSkeletonActions.removeLoadingIcon())
        sendNotification(params,true)
      }
    }
    const rejectInventoryRequest = params => async dispatch => {
      try{
        dispatch(defaultSkeletonActions.setLoading())
        const resp = await rejectRequest(params)
        dispatch({
          type: GET_PENDING_TRANSACTIONS,
          payload : resp
        })
        sendNotification(params)
      }catch(err){
        dispatch(defaultSkeletonActions.removeLoadingIcon())
        sendNotification(params,true)
      }

    }
    const downloadCSV = params => async () => {
      generateCsv(params)
    }

    const getInventoryHistory = params => async dispatch => {
      try{
        dispatch(defaultSkeletonActions.setLoading())
        const resp = await getInventoryHistoryRecords(params);
        dispatch({
          type: GET_INVENTORY_HISTORY,
          payload : resp
        });
        sendNotification({type: "ACCEPTED_REJECTED_TRANSACTIONS"})
      } catch(err) {
        dispatch(defaultSkeletonActions.removeLoadingIcon())
        sendNotification({type: "ACCEPTED_REJECTED_TRANSACTIONS"}, true)
      }
    }

  return {
    //other actions apart from the crud operations go here
    getData : defaultSkeletonActions.getData,
    loadPendingTransactions,
    acceptOrRejectExtRequest,
    createInventoryTransaction,
    rejectInventoryRequest,
    downloadCSV,
    getInventoryHistory
  }

})()
export default actions