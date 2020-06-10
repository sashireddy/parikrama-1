import { getData } from "../dataAbstraction/permissions";
import {GET_ALL_PERMISSIONS, DATA_LOAD_ERROR} from "./types";

const getAllPermissions = () => async (dispatch) => {
    try {
        const permissions = await getData()
        console.log(dispatch, permissions);
        dispatch({
            type: GET_ALL_PERMISSIONS,
            payload: permissions,
        });
    } catch (err) {
        dispatch({
            type: DATA_LOAD_ERROR,
            payload: {
                msg: 'Unable to load permissions data',
            }
        });
    }
}

export default {
    getAllPermissions
}