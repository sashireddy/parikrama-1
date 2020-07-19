import {addNotification} from "./notification";
import { GET_AUDITS, AUDIT_LOADING } from './types';
import {getAuditsData} from "../dataAbstraction/audits";

const transactionLoading = () => {
    return {
        type: AUDIT_LOADING
    }
}

const notifyStatus = (res, title) => {
    if(res.flashMessage){
      addNotification({
        title: title,
        type: res.flashMessage.type,
        message : res.flashMessage.message
      });
    }
}

const getAudits = params =>  async (dispatch) => {
    dispatch(transactionLoading());
    try {
        const audits = await getAuditsData(params);
        notifyStatus(audits, "LOAD AUDITS");
        dispatch({
            type: GET_AUDITS,
            payload: audits
        });
    } catch(err){
        notifyStatus({
            title: "LOAD AUDITS",
            type: "danger",
            message : "Unable to load data, Some thing went wrong!"
        });
    }
}

export default {
    getAudits
}