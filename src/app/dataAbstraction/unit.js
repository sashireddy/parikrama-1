import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage, arrayToMapWithId,handleResponse, genericFilter} from "./util";

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

export const setCachedData = data => {
    cachedData = data;
}

// Function to load all the data as part for the initial load
export const loadInitialData = () => {
    return new Promise(async (resolve, reject) => {
        if(cachedData !== null){
            resolve(arrayToMapWithId(cachedData));
        } else {
            const url = `${apiConfig.GET_ALL_UNITS}`;
            const res = await axios.get(url);
            if(apiConfig.CACHING){
                cachedData = res.data.units;
            }
            resolve(arrayToMapWithId(res.data.units));
        }
    });
}

export const refreshStateData = () => {
    return new Promise((resolve, reject) => {
        if(cachedData)
            resolve((cachedData))
        else
            reject(new Error("CacheData not present"))
    })
}

export const getData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${apiConfig.GET_ALL_UNITS}`;
            // console.log("API calling...", url);
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
export const addData = data => {
    return new Promise(async (resolve, reject) => {
        if(apiConfig.CACHING){
            let response;
            try {
                const url = `${apiConfig.ADD_UNIT}`;
                response = await axios.post(url, data);
            } catch(err) {
                let response = {
                    "flashMessage": {
                        "type": "danger",
                        "message": "Unable to save the data!"
                    }
                };
                resolve(response);
                return;
            }
            cachedData = [
                ...cachedData,
                response.data
            ];
            const params = {
                currentPage: apiResponse.currentPage,
                pageLimit: apiResponse.pageLimit,
                search: apiResponse.search,
                sort: apiResponse.sort
            }
            try {
                const res = await getData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Unit Added Successfully!"
                };
                resolve(res);
            } catch(err) {
                let response = {
                    "flashMessage": {
                        "type": "danger",
                        "message": "Unable to load the data!"
                    }
                };
                resolve(response);
            }
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data insertion");
        }
    });
}


// Update category implementation
export const updateData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try{
            response = await axios.put(apiConfig.ADD_UNIT,data)
        }catch(err) {
            reject(err);
        }const [,err] = handleResponse(response);
        if(apiConfig.CACHING && !err) {
            cachedData = cachedData.map(item => {
                if(item.id === data.id) {
                    return {
                        ...item,
                        ...data
                    }
                }
                return item;
            });
        }
            const params = {
                currentPage: apiResponse.currentPage,
                pageLimit: apiResponse.pageLimit,
                search: apiResponse.search,
                sort: apiResponse.sort
            }
            // Need to Update the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Branch Updated Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
    });
}


export const deleteData = data => {}

const getCurrentStateData = params => {
    let records = genericFilter(params,cachedData);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}
