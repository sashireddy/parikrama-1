import { getData } from "../dataAbstraction/metadata";
import branchActions from "./branchActions";
import roleActions from "./roleActions";
import operationActions from "./operationsActions";
import unitActions from "./unitActions";
import categoryActions from "./categoryActions";
import productActions from "./productActions";
import userActions from "./userActions";
import {addNotification} from "./notification";

const getAllMetadata = () => async (dispatch) => {
    try {
        await getData();
        dispatch(branchActions.getAllBranches());
        dispatch(roleActions.getAllRoles());
        dispatch(unitActions.getAllUnits());
        dispatch(categoryActions.getAllCategories());
        dispatch(productActions.getAllProducts());
        dispatch(operationActions.getAllOperations());
        dispatch(userActions.getAllUsers());

        addNotification({
            title: "APPLICATION BOOT",
            type: "success",
            message : "Successfully loaded system data"
        });
    } catch (err) {
        console.log("Applicatio boot error : ", err);
        addNotification({
            title: "APPLICATION BOOT",
            type: "danger",
            message : "Unable to load the initial data"
        });
    }
}

export default {
    getAllMetadata
}