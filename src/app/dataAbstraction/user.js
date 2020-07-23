import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage, getSortFunction} from "./util";
import Firebase from "../Firebase";

console.log('Firebase =>', typeof(Firebase));

const apiConfig = config.API.USER;

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

export const getUserData = params => {
    return new Promise(async (resolve, reject) => {
        const url = `${apiConfig.GET_USER+"/"+Firebase.auth.currentUser.uid}`;
        // const url = '/data/userData.json';
        console.log("API calling...", url);
        try {
            const res = await axios.get(url);
            res.flashMessage = {
                "type": "success",
                "message": "Data Loaded Successfully!"
            };
            resolve(res.data)
        } catch(err){
            reject(err);
        }
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
            const url = `${apiConfig.GET_USERS}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.users;
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
        if(apiConfig.CACHING){
            let response;
            try {
                await Firebase.doCreateUserWithEmailAndPassword(data.email, data.password);
                delete data.password;
                response = await axios.post(apiConfig.GET_USERS, data);
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
                let response = {
                    "flashMessage": {
                        "type": "danger",
                        "message": "Unable to save the data!"
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
        try{
            delete data.password;
            delete data.showPassword;
            await axios.put(apiConfig.GET_USERS, data);
        } catch(err) {
            let response = {
                "flashMessage": {
                    "type": "danger",
                    "message": "Unable to update the data!"
                }
            };
            console.log("Update User Error", err);
            resolve(response);
            return;
        }
        if(apiConfig.CACHING){
            console.log("Updating now");
            cachedData = cachedData.map(item => {
                if(item.id === data.id) {
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
                    "message": "User Updated Successfully!"
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
            await axios.delete(`${apiConfig.GET_USERS}/${data.id}`, data);
        } catch(err) {
            let response = {
                "flashMessage": {
                    "type": "error",
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
                    "message": "User Deleted Successfully!"
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
    let searchText = params.search.firstName && params.search.firstName.toLowerCase();
    if(searchText) {
        result = records.filter(item => item.firstName.toLowerCase().includes(searchText) || item.lastName.toLowerCase().includes(searchText));
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result;
}