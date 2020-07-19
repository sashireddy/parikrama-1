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
                if(apiConfig.CACHING){
                    cachedData = res.data;
                }
                resolve(res.data);
            } catch(error){
                reject(error);
            }
        }
    });
}