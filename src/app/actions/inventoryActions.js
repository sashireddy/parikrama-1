import { addData,deleteData,getData,updateData } from '../dataAbstraction/inventory'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.inventory,
    getData,updateData,addData,deleteData)
  return {
    ...defaultSkeletonActions,
    //other actions apart from the crud operations go here 
  }

})()
export default actions