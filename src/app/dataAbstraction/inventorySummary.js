import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage, getSortFunction} from "./util";
import Firebase from "../Firebase";

console.log('Firebase =>', typeof(Firebase));

const apiConfig = config.API.INVENTORY_SUMMARY;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = null;
let cachedParams  = null;
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

// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getData = params => {
    return new Promise(async (resolve, reject) => {
        if(!validateParams(cachedParams,params) || cachedData === null){
            // Logic can be applied to generate URL using params
            // http://localhost:5001/local-parikrama/us-central1/api/api/reports/nmnpHFEB45FtMLQzqEBj?fromDate=2020-05-05&toDate=2020-07-15
            let url = `${apiConfig.GET_REPORT_SUMMARY}${params.branch}?fromDate=${params.startDate}&toDate=${params.endDate}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url,);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.report;
                }
            } catch(err){
                reject(err);
            }
        }
        getCurrentStateData(params);
        resolve(apiResponse);
    });
}

const validateParams = (params1,params2) => {
    if(!params1 && !params2 && params1.startDate ===params2.startDate && params1.endDate === params2.endDate && params1.branch === params2.branch ){
        return false;
    }
    return true;
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
    let searchText = params.search.name && params.search.name.toLowerCase();
    if(searchText) {
        result = records.filter(item => item.name.toLowerCase().includes(searchText) || item.name.toLowerCase().includes(searchText));
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result;
}