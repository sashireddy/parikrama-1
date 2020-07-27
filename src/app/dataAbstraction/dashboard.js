import axios from 'axios';
import config from "../constants/config";

const apiConfig = config.API.DASHBOARD;

let cachedData = null;

export const getData = () => {
    return new Promise(async (resolve, reject) => {
        let res;
        if(cachedData === null){
            try {
                // Logic can be applied to generate URL using params
                const url = `${apiConfig.GET_DASHBOARD_DATA}`;
                res = await axios.get(url);
                let data = res.data;
                let dashboardData;
                if(data.branch){ // Branch User
                    dashboardData = {
                        [data.branch]: {
                            productsBelowThreshold: data.productsBelowThreshold,
                            recentActivity: data.recentActivity,
                            pendingRequests: data.pendingRequests
                        }
                    }
                } else {
                    dashboardData = data;
                }
                if(apiConfig.CACHING){
                    cachedData = dashboardData;
                }
                resolve(dashboardData);
            } catch(error){
                reject(error);
            }
        }
    });
}