import { addData,deleteData,getData,updateData } from '../dataAbstraction/inventory'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
    const updateExternalRequest = () => {}
    const updateMyRequest = () => {}
    const disburseLocally = () => {}
    const raiseRequest = () => {}
    const addDataLocally = () => {}
  return {
    //other actions apart from the crud operations go here 
    getData : defaultSkeletonActions.getData,
    updateExternalRequest,
    updateMyRequest,
    disburseLocally,
    raiseRequest,
    addData:addDataLocally
  }

})()
export default actions