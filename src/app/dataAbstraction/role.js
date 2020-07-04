import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage, getSortFunction} from "./util";

const apiConfig = config.API.ROLE;

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
        const url = `${apiConfig.GET_ROLES}`;
        try {
            const res = await axios.get(url);
            if(apiConfig.CACHING){
                cachedData = res.data.roles;
            }
            resolve(res.data.roles);
        } catch(err){
            console.log(err);
        }
    });
}


// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${apiConfig.GET_ROLES}`;
            console.log("Role API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.roles;
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
export const addData = data => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            response = await axios.post(apiConfig.GET_ROLES, data);
            console.log("Create Roles response: ", response);
        } catch(err) {
            response = {
                "flashMessage": {
                    "type": "danger",
                    "message": "Unable to save the data!"
                }
            };
            resolve(response);
            return;
        }
        console.log('Want to see who reaches here...');
        if(apiConfig.CACHING){
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
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
                res.flashMessage = {
                    "type": "success",
                    "message": "Role Added Successfully!"
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
export const updateData = data => {
    return new Promise(async (resolve, reject) => {
        let role;
        try{
            let response = await axios.put(apiConfig.GET_ROLES, data);
            role = JSON.parse(response.config.data);
            console.log("Updated Error", role);
        } catch(err) {
            console.log("Update Roles Error");
            let response = {
                "flashMessage": {
                    "type": "danger",
                    "message": "Unable to update the data!"
                }
            };
            resolve(response);
            return;
        }
        if(apiConfig.CACHING){
            cachedData = cachedData.map(item => {
                if(item.id === role.id) {
                    return {
                        ...item,
                        ...data
                    }
                }
                return item;
            });
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
                    "message": "Role Updated Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data updates");
        }
    });
}


// Delete category implementation
export const deleteData = data => {
    return new Promise(async (resolve, reject) => {
        try{
            await axios.delete(`${apiConfig.GET_ROLES}/${data.id}`, data);
        } catch(err) {
            let response = {
                "flashMessage": {
                    "type": "danger",
                    "message": "Unable to delete the user!"
                }
            };
            resolve(response);
            return;
        }
        if(apiConfig.CACHING){
            cachedData = cachedData.filter(item => {
                if(item.id === data.id) {
                    return false;
                }
                return true;
            });
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
                    "message": "Role Deleted Successfully!"
                };
                resolve(res);
            } catch(err) {
                reject(err);
            }
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data deletion");
        }
    });
}


const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    let records = filterData(params, cachedData);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}

// Need to filter and sort the data
const filterData = (params, records) => {
    // More complex search need to handle as needed
    let result = records;
    let searchText = params.search.label && params.search.label.toLowerCase();
    if(searchText) {
        result = records.filter(item => item.label.toLowerCase().includes(searchText));
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result;
}