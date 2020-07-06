import config from "../constants/config";
import axios from 'axios';
import {arrayToMapWithId} from './util'
const apiConfig = config.API.CATEGORY;

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
        let res;
        try{
            const url = `${config.API.BASE_URL}${apiConfig.GET_CTEGORIES}`;            
            console.log(url)
            res = await axios.get(url);
            console.log(res);
        }catch (err){
            reject()
        }
        if(apiConfig.CACHING){
            cachedData = res.data.categories;
        }
        resolve(arrayToMapWithId(res.data.categories));
    });
}
export const updateData = () => {
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
export const getCategoriesData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${config.API.BASE_URL}${apiConfig.GET_CTEGORIES}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data;
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

// Add category implementaion
export const addCategoryData = data => {
    return new Promise(async (resolve, reject) => {
        let res;
        try{
            res = await axios.post(config.API.CATEGORY.GET_CTEGORIES,data)
        } catch (err) {

        }
        if(apiConfig.CACHING){
            cachedData = [
                ...cachedData,
                res.data
            ];
            const params = {
                currentPage: apiResponse.currentPage,
                pageLimit: apiResponse.pageLimit,
                search: apiResponse.search,
                sort: apiResponse.sort
            }
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getCategoriesData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Category Added Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data insertion");
        }
    });
}

// Update category implementation
export const updateCategoryData = data => {
    return new Promise(async (resolve, reject) => {
        let response ;
        try{
            response = await axios.put(apiConfig.GET_CTEGORIES,data)
        } catch(err){
            // need to put an error message
        }
        if(apiConfig.CACHING && response.status === 204){
            cachedData = cachedData.map(item => {
                if(item.name === data.name) {
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
                const res = await getCategoriesData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Category Updated Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
    });
}


// Delete category implementation
export const deleteCategoryData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            response = await axios.delete(apiConfig.DELETE_CATEGORIES+data.id);
        }catch(err) {

        }
        if(apiConfig.CACHING && response.status === 200){
            cachedData = cachedData.filter(item => {
                if(item.name === data.name) {
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
                const res = await getCategoriesData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Category Deleted Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
    });
}


const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    let records = filterData(params);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}

// Validate current page, Might change due to delete, search operation
// This is only required for the cached data
const validateCurrentPage = (params, records) => {
    const offset = (params.currentPage - 1) * params.pageLimit;
    if(offset >= records.length && params.currentPage > 1){
        // Set to last page.
        return Math.ceil(records.length / params.pageLimit);
    }
    return params.currentPage;
}

// Need to filter and sort the data
const filterData = params => {
    // More complex search need to handle as needed
    let result = cachedData;
    let searchText = params.search.name && params.search.name.toLowerCase();
    if(searchText) {
        result = cachedData.filter(item => item.name.toLowerCase().includes(searchText));
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result;
}

// Used locally for demonstration
const create_UUID = () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxxxxxx4xxxyxxx".replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        // eslint-disable-next-line
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Function currying to return dynamic compare function
const getSortFunction = sort => {
    let sortOrder = sort.direction || "asc";
    if(sortOrder === "asc"){
        return (a, b) => {
            if(a[sort.key] > b[sort.key]){
                return 1;
            } else if(a[sort.key] < b[sort.key]) {
                return -1;
            }
            return 0;
        }
    } else {
        return (a, b) => {
            if(a[sort.key] > b[sort.key]){
                return -1;
            } else if(a[sort.key] < b[sort.key]) {
                return 1;
            }
            return 0;
        }
    }
}