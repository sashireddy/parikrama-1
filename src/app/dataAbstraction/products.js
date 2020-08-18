import axios from 'axios';
import config from "../constants/config";
import {genericFilter, validateCurrentPage, handleResponse,arrayToMapWithId} from "./util";
import {getCategory,getUnit} from '../utils/dataUtils'

const apiConfig = config.API.PRODUCTS;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = null;

// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
const apiResponse = { // pMapping => Parameter Mapping
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
            try{
                const url = `${apiConfig.GET_PRODUCTS}`;
                const res = await axios.get(url);
                if(apiConfig.CACHING){
                    cachedData = res.data.products;
                }
                resolve(arrayToMapWithId(res.data.products));
            }catch(err){
                reject(err);
            }
        }
    });
}

export const refreshStateData = () => {
    return new Promise((resolve, reject) => {
        if(cachedData)
            resolve(arrayToMapWithId(cachedData))
        else
            reject(new Error("CacheData not present"))
    })
}


// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${apiConfig.GET_PRODUCTS}`;
            // console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.products;
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

const getParams = (params) =>{
    return {
        category: params.category,
        id : params.id,
        isActive : params.isActive,
        name : params.name,
        thresholds: params.thresholds,
        unit : params.unit
    }
}

// Add category implementaion
export const addData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try{
            response= await axios.post(apiConfig.GET_PRODUCTS,getParams(data))
        } catch(err){

        }
        if(apiConfig.CACHING){
            cachedData = [
                ...cachedData,
                response.data
            ];
        }
            const params = {
                currentPage: apiResponse.currentPage,
                pageLimit: apiResponse.pageLimit,
                search: apiResponse.search,
                sort: apiResponse.sort
            }
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Product Added Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
    });
}

// Update category implementation
export const updateData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try{
            response = await axios.put(apiConfig.GET_PRODUCTS,getParams(data))
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
                    "message": "Product Updated Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
    });
}


// Delete category implementation
export const deleteData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try{
            response = await axios.put(apiConfig.GET_PRODUCTS)
        }catch(err) {
            reject(err);
        }const [,err] = handleResponse(response);
        if(apiConfig.CACHING && !err){
            cachedData = cachedData.filter(item => {
                if(item._id === data._id) {
                    return false;
                }
                return true;
            });
        }
            const params = {
                currentPage: apiResponse.currentPage,
                pageLimit: apiResponse.pageLimit,
                search: apiResponse.search,
                sort: apiResponse.sort
            }
            // Need to delete the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Product Deleted Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
        // } else {
        //     // Needs to handle API or DB data updates.
        //     console.log("Need to implement API based data deletion");
        // }
    });
}


const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    cachedData.map(entry => {
        entry.categoryName = getCategory(entry.category).name
        entry.unitName = getUnit(entry.unit).name
        return entry
    })
    let records = genericFilter(params, cachedData);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}