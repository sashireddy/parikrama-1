import axios from 'axios';
import config from "../constants/config";
import {validateCurrentPage,genericFilter} from "./util";
import Firebase from "../Firebase";
import {getBranch,getCategory,getUnit,getProduct } from '../utils/dataUtils'
import {arrayToCsvContent,download} from '../utils/csvUtils'
import dateformat from 'dateformat'
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
            cachedParams =params
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
    if(params1 && params2 && params1.startDate ===params2.startDate && params1.endDate === params2.endDate && params1.branch === params2.branch ){
        return true;
    }
    return false;
}
const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    let records = cachedData
    records.map(entry => {
        const product = getProduct(entry.product)
        entry.productName = product.name
        entry.categoryName = getCategory(product.category).name
        entry.unitName = getUnit(product.unit).name
        return entry
    })
    records = genericFilter(params, records);
    let currentPage = validateCurrentPage(params, records);
    apiResponse.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    apiResponse.data = records.slice(offset, offset + params.pageLimit);
    apiResponse.search = params.search;
    apiResponse.sort = params.sort;
    apiResponse.currentPage = currentPage;
}
export const downloadReport = async params => {
    const branchName = getBranch(params.branch).name    
    const headerArr = ['Category','Branch','Threshold','Product','Initial Quantity','Consumed Quantity','Transfered Quantity','Added Quantity','Closing Quantity',]
    const arr = cachedData || []
    const outArr = []
    outArr.push(headerArr)
    arr.forEach(row=> {
        const tempRow = []
        tempRow.push(row.categoryName)
        tempRow.push(branchName)
        tempRow.push(row.threshold)
        tempRow.push(row.productName)
        tempRow.push(`${row.initialQuantity} `+row.unitName)
        tempRow.push(`${row.consumedQuantity} `+row.unitName)
        tempRow.push(`${row.transferredQuantity} `+row.unitName)
        tempRow.push(`${row.addedQuantity} `+row.unitName)
        tempRow.push(`${row.closingQuantity} `+row.unitName) 
        outArr.push(tempRow)
    })
    download(arrayToCsvContent(outArr),`${branchName}_${dateformat(params.startDate,'yyyy-mm-dd')}_${dateformat(params.endDate,'yyyy-mm-dd')}.csv`,)
}