import axios from 'axios';
import config from "../constants/config";
import {setCachedData as loadBranches} from "./branches";
import {setCachedData as loadCategories} from "./category";
import {setCachedData as loadProducts} from "./products";
import {setCachedData as loadRoles} from "./role";
import {setCachedData as loadUnits} from "./unit";
import {setCachedData as loadOperations} from "./operations";
import {setCachedData as loadUsers} from "./user";

axios.defaults.headers.common['Authorization'] = "Bearer TOKEN";

const apiConfig = config.API.METADATA;

// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
// const apiResponse = { // pMapping => Parameter Mapping
//     pageLimit: apiConfig.PAGE_LIMIT,
//     totalRecords: 1,
//     currentPage: 1,
//     data: null,
//     search: {},
//     sort: {}
// };



// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getData = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const url = `${apiConfig.GET_METADATA}`;
            // console.log("GET ALL Metadata ", url);
            const res = await axios.get(url);
            loadBranches(res.data.branches);
            loadRoles(res.data.roles);
            loadUnits(res.data.units);
            loadCategories(res.data.categories);
            loadProducts(res.data.products);
            loadOperations(res.data.operations);
            loadUsers(res.data.users);
            resolve(res);
        } catch(err){
            reject(err);
        }
    });
}