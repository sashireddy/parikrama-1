import config from "../constants/config";
import axios from 'axios';

export const getCategoriesData = params => {
    return new Promise(async (resolve, reject) => {
        const url = `${config.API.BASE_URL}${config.API.GET_CTEGORIES}`;
        console.log("API calling...", url);
        try {
            const res = await axios.get(url);
            resolve(res.data);
        } catch(err){
            reject(err);
        }
    });

}