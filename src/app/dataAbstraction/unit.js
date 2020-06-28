import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage, create_UUID, filterData} from "./util";

const apiConfig = config.API.UNITS;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = null;

// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
const apiResponse = {
    pageLimit: apiConfig.PAGE_LIMIT,
    totalRecords: 1,
    currentPage: 1,
    data: null,
    search: {},
    sort: {}
};

// Function to load all the data as part for the initial load
export const loadInitialData = () => {
    return new Promise(async (resolve, reject) => {
        const url = `${config.API.BASE_URL}${apiConfig.GET_ALL_UNITS}`;
        const res = await axios.get(url);
        if(apiConfig.CACHING){
            cachedData = res.data.units;
        }
        resolve(res.data.units);
    });
}


export const getPageData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${config.API.BASE_URL}${apiConfig.GET_ALL_UNITS}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.units;
                }
            } catch(err){
                reject(err);
            }
        }
        if(apiConfig.CACHING){
            getCurrentStateData(params);
        } else {
            // Need to resolve all params using the API respose e.g
            // categories.totalRecords = res.totalRecords;
            // categories.data = res.data;
            // categories.search = res.search;
            // categories.currentPage = res.currentPage;
        }
        resolve(apiResponse);
    });
}


// Add Unit implementaion
export const addUnitData = data => {
    return new Promise(async (resolve, reject) => {
        if(apiConfig.CACHING){
            data.id = create_UUID();
            cachedData = [
                ...cachedData,
                data.unit
            ];
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            try {
                const url = `${config.API.BASE_URL}${apiConfig.GET_ALL_UNITS}`;
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Role Added Successfully!"
                };
                const params = {
                    currentPage: apiResponse.currentPage,
                    pageLimit: apiResponse.pageLimit,
                    search: apiResponse.search,
                    sort: apiResponse.sort
                }
                 resolve(getPageData(params))
            } catch(err) {
                reject(err);
            }
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data insertion");
        }
    });
}


const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    console.log(params)
    console.log(cachedData)
    let records = filterData(params,cachedData);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}
