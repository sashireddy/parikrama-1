import { addData,deleteData,getData,updateData,createTransaction } from '../dataAbstraction/inventory'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
    const updateExternalRequest = dispatch => {}
    const updateMyRequest = () => {}
    const raiseRequest = () => {}
    const createInventoryTransaction = params => async dispatch => {
      const resp = await createTransaction(params)
      dispatch({
        type: "GET_INVENTORY",
        payload: resp,
      });
    }
  return {
    //other actions apart from the crud operations go here 
    getData : defaultSkeletonActions.getData,
    updateExternalRequest,
    updateMyRequest,
    raiseRequest,
    createInventoryTransaction
  }

})()
export default actions