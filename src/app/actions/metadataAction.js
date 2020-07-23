import { getData } from "../dataAbstraction/metadata";
import branchActions from "./branchActions";
import roleActions from "./roleActions";
import operationActions from "./operationsActions";
import unitActions from "./units";
import categoryActions from "./categoryActions";
import productActions from "./productActions";
import {addNotification} from "./notification";

const getAllMetadata = () => async (dispatch) => {
    try {
        await getData();
        dispatch(branchActions.getAllBranches());
        dispatch(roleActions.getAllRoles());
        dispatch(unitActions.initialData());
        dispatch(categoryActions.getAllCategories());
        dispatch(productActions.getAllProducts());
        dispatch(operationActions.getAllOperations());

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