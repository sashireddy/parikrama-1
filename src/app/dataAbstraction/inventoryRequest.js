import config from "../constants/config";
import axios from 'axios';
import dateFormat from "dateformat";

let apiConfig = config.API.INVENTORY;

apiConfig.CACHING = false;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time

let cachedData = null;

const apiResponse = {
    allRecords: null,
    pageLimit: apiConfig.PAGE_LIMIT,
    totalRecords: 1,
    currentPage: 1,
    data: null,
    search: {},
    sort: {}
};

export const getInventoryHistoryRecords = params => {
    return new Promise(async (resolve, reject) => {
        if(cachedData === null){
            // Logic can be applied to generate URL using params
            const url = formInventoryHistoryUrl(params);
            console.log("Inventory History API calling...", url);
            try {
                const res = await axios.get(url);
                apiResponse.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(apiConfig.CACHING){
                    cachedData = res.data.transferRequests;
                } else {
                    apiResponse.data = res.data.transferRequests;
                    apiResponse.startDate = params.startDate;
                    apiResponse.endDate = params.endDate;
                    apiResponse.state = params.state;
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
        resolve(apiResponse);
    });
}

const formInventoryHistoryUrl = params => {
    let url = `${apiConfig.INVENTORY_HISTORY}/${params.branch}`;
    let urlParams = {};
    console.log(params);

    if(params.dir){
        params.dir === 'next'
            ? urlParams.nextPageToken = params.nextPageToken
            : urlParams.prevPageToken = params.prevPageToken
    }

    if(params.state){
        urlParams.state = params.state;
    }

    if(params.startDate && params.endDate){
        urlParams.fromDate = dateFormat(params.startDate, "yyyy-mm-dd");
        urlParams.toDate = dateFormat(params.endDate, "yyyy-mm-dd");
    }

    let queryParams = "?";
    for(let [key, value] of Object.entries(urlParams)){
        queryParams += `${key}=${value}&`;
    }
    return `${url}${queryParams.slice(0, -1)}`;
}

const getCurrentStateData = (params, cachedData) => {
    let records = cachedData;
    let currentPage = params.currentPage;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}
