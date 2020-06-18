import { getData, updateData, addData, deleteData } from '../dataAbstraction/user';
import skeletonActions from './crudActions';
import pageConstants from '../constants/pages';

const actions = (()=>{
    const defaultSkeletonActions = skeletonActions(
        pageConstants.pages.user,
        getData,
        updateData,
        addData,
        deleteData
    );

    return {
        ...defaultSkeletonActions
    }
})()
export default actions