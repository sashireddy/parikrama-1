import config from "../constants/config";
import axios from 'axios';

const categoryConf = config.API.CATEGORY;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = null;

// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
const categories = {
    pageLimit: categoryConf.PAGE_LIMIT,
    totalRecords: 1,
    currentPage: 1,
    data: null,
    search: "",
    sort: {}
};

// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getCategoriesData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = `${config.API.BASE_URL}${categoryConf.GET_CTEGORIES}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(categoryConf.CACHING){
                    cachedData = res.data;
                }
            } catch(err){
                reject(err);
            }
        }
        if(categoryConf.CACHING){
            getCurrentStateData(params);
        } else {
            // Need to resolve all params using the API respose e.g
            // categories.totalRecords = res.totalRecords;
            // categories.data = res.data;
            // categories.search = res.search;
            // categories.currentPage = res.currentPage;
        }
        resolve(categories);
    });
}

// Add category implementaion
export const addCategoryData = data => {
    return new Promise(async (resolve, reject) => {
        if(categoryConf.CACHING){
            data._id = create_UUID();
            cachedData = [
                ...cachedData,
                data
            ];
            const params = {
                currentPage: categories.currentPage,
                pageLimit: categories.pageLimit,
                search: categories.search,
                sort: categories.sort
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
        if(categoryConf.CACHING){
            cachedData = cachedData.map(item => {
                if(item._id === data._id) {
                    return {
                        ...item,
                        ...data
                    }
                }
                return item;
            });
            const params = {
                currentPage: categories.currentPage,
                pageLimit: categories.pageLimit,
                search: categories.search,
                sort: categories.sort
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
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data updates");
        }
    });
}


// Delete category implementation
export const deleteCategoryData = data => {
    return new Promise(async (resolve, reject) => {
        if(categoryConf.CACHING){
            cachedData = cachedData.filter(item => {
                if(item._id === data._id) {
                    return false;
                }
                return true;
            });
            const params = {
                currentPage: categories.currentPage,
                pageLimit: categories.pageLimit,
                search: categories.search,
                sort: categories.sort
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
        } else {
            // Needs to handle API or DB data updates.
            console.log("Need to implement API based data deletion");
        }
    });
}


const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    let records = filterData(params);
    let currentPage = validateCurrentPage(params, records);
    categories.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    categories.data = records.slice(offset, offset + params.pageLimit);
    categories.search = params.search;
    categories.sort = params.sort;
    categories.currentPage = currentPage;
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
    let searchText = params.search.name && params.search.name.toLowerCase();
    if(searchText) {
        return cachedData.filter(item => item.name.toLowerCase().includes(searchText));
    }
    return cachedData;
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

console.log(create_UUID());