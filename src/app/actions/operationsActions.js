import { loadInitialData } from "../dataAbstraction/operations";
import {GET_ALL_OPERATIONS} from "./types";

const getAllOperations = () => async (dispatch) => {
    const operations = await loadInitialData();
    dispatch({
        type: GET_ALL_OPERATIONS,
        payload: operations,
    });
}

export default {
    getAllOperations
}