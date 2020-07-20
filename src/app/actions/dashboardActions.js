import { getData } from "../dataAbstraction/dashboard";
import {GET_DASHBOARD_DATA} from "./types";
import {addNotification} from "./notification";

const getDashboardData = () => async (dispatch) => {
    try {
        const data = await getData();
        addNotification({
            title: "DASHBOARD LOAD DATA",
            type: "success",
            message : "Dashboard data loaded successfully!"
        });

        dispatch({
            type: GET_DASHBOARD_DATA,
            payload: data,
        });
    } catch (err) {
        addNotification({
            title: "DASHBOARD LOAD DATA",
            type: "danger",
            message : "Unable to load dashboard data"
        });
    }
}

export default {
    getDashboardData
}