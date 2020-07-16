import config from "../constants/config";
import axios from 'axios';
import dateFormat from "dateformat";

const apiConfig = config.API.TRANSACTIONS;

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

// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getTransactionsData = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = formTransactionUrl(params);
            // console.log("Transaction API calling...", url);
            try {
                const res = await axios.get(url);
                apiResponse.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.transactions;
                } else {
                    apiResponse.data = res.data.transactions;
                    apiResponse.startDate = params.startDate;
                    apiResponse.endDate = params.endDate;
                    apiResponse.email = params.email;
                    apiResponse.branch = params.branch;
                    apiResponse.nextPageToken = res.data.nextPageToken;
                    apiResponse.prevPageToken = res.data.prevPageToken;
                }
            } catch(err){
                let response = {
                    "flashMessage": {
                        "type": "danger",
                        "message": "Unable to load the data at this moment!"
                    }
                };
                resolve(response);
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
        console.log(apiResponse);
        resolve(apiResponse);
    });
}

const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    let records = cachedData;
    let currentPage = params.currentPage;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}

const formTransactionUrl = params => {
    let url = `${apiConfig.GET_TRANSACTIONS}/${params.branch}`;
    let urlParams = {};
    if(params.dir){
        params.dir === 'next'
            ? urlParams.nextPageToken = params.nextPageToken
            : urlParams.prevPageToken = params.prevPageToken
    }
    if(params.startDate && params.endDate){
        urlParams.fromDate = dateFormat(params.startDate, "yyyy-mm-dd");
        urlParams.toDate = dateFormat(params.endDate, "yyyy-mm-dd");
    }

    if(params.email.trim()){
        urlParams.user = params.email.trim()
    }

    let queryParams = "?";
    for(let [key, value] of Object.entries(urlParams)){
        queryParams += `${key}=${value}&`;
    }
    return `${url}${queryParams.slice(0, -1)}`;
}