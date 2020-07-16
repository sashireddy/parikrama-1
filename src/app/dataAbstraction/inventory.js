import config from "../constants/config";
import axios from 'axios';
import {handleResponse} from './util'
import {getProduct,getUnit,getCategory} from '../utils/dataUtils'
// import inventory from "../pages/inventory";
import {arrayToCsvContent,download} from '../utils/csvUtils'
const pageConfig = config.API.INVENTORY;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = null;

let cache = null
let summaryCache = null

let defaultConfig = {
    currentPage: 1,
    pageLimit: 10,
    search: {},
    sort: {},
}
let pendingTransactions = null;
// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
const output = {
    allRecords: null,
    pageLimit: pageConfig.PAGE_LIMIT,
    totalRecords: 1,
    currentPage: 1,
    data: null,
    search: {},
    sort: {}
};


export const getPendingTransactions = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!pendingTransactions){
                const [response,err]= handleResponse(await axios.get(pageConfig.PENDING_TRANSACTIONS+'R1vTnxSLWByLa7NocDDX'))
                // const [response,err]= handleResponse(await axios.get(pageConfig.PENDING_TRANSACTIONS+params.branch))
                pendingTransactions = response.data.pendingTransactions
                if(err){return reject(err)}
            }
            resolve(pendingTransactions)
        }catch(err){
            reject(err)
        }
    })
}

export const respondToTransferRequest = async params => {
    // const [, err ] = handleResponse(await axios.post(pageConfig.TRANSFER_REQUEST,params))
    // if(err){ throw new Error(err) }
    pendingTransactions = pendingTransactions.filter(entry => entry.id === params.id)
    return pendingTransactions
}

export const createTransaction = ({type,...otherParams}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = pageConfig[type]
            let queryParams = {}
            if(type === "RAISE_REQUEST"){
                //raise request from branch to head office
                queryParams = {
                    "fromBranch": otherParams.fromBranch,
	                "toBranch": otherParams.toBranch, //always headoffice
                	"fromBranchName": otherParams.fromBranchName,
	                "toBranchName": otherParams.toBranchName,
                    "productName":otherParams.productName,
                    "product": otherParams.product,
                    "operationalQuantity": parseInt(otherParams.operationalQuantity),
                    "note": otherParams.note
                }
            }else if(type === "TransferOperation"){
                // move product from one branch to other
                queryParams = {
                    "fromBranch": otherParams.fromBranch,
	                "toBranch": otherParams.toBranch, //always headoffice
                	"fromBranchName": otherParams.fromBranchName,
	                "toBranchName": otherParams.toBranchName,
                    "branch": otherParams.fromBranch,
                    "productName":otherParams.productName,
                    "productId": otherParams.product,
                    "operationalQuantity": parseInt(otherParams.operationalQuantity),
                    "note": otherParams.note
                }
            }else{
                // add locally or disburse locally
                queryParams = {
                    "branch": otherParams.fromBranch,
                    "productName":otherParams.productName,
                    "product": otherParams.product,
                    "operationalQuantity": parseInt(otherParams.operationalQuantity),
                    "note": otherParams.note
                }
            }
            const [,err]= handleResponse(await axios.post(url,queryParams))
            if(err){ return reject(err)}
            if(pageConfig.CACHING){
                if(type==="ISSUE_PRODUCT"){
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"sub")
                }else if(type === "ADD_PRODUCT"){
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"add")
                }else if ( type === "TransferOperation") {
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.toBranch,otherParams.product,"add")
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"sub")
                }
            }
            const resParams = {
                currentPage: defaultConfig.currentPage,
                pageLimit: defaultConfig.pageLimit,
                search: defaultConfig.search,
                sort: defaultConfig.sort,
                branch : otherParams.fromBranch
            }
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            const res = await getData(resParams);
            resolve(res)
        }catch(err){
            reject(err)
        }
    })
}

const changeValue = (type,quantity,change) => {
    if(type === "add"){
        return parseInt(quantity) + parseInt(change)
    }else {
        return parseInt(quantity) - parseInt(change)
    }
}

const updateQuantity = (quantity,branch,product,type) => {
    if(!summaryCache[product][branch]){
        makeEntry(product,branch)
    }
    cache[branch].map(entry => {
        if(product === entry.product){
            entry.availableQuantity = changeValue(type,entry.availableQuantity,quantity )
        }
        return entry
    })
    summaryCache[product][branch].availableQuantity = changeValue(type,summaryCache[product][branch].availableQuantity,quantity )
}

const parseInventoryResp = (inventory) => {
    cache = {}
    summaryCache = {}
    inventory.inventories[0].forEach(branchInventory => {
        cache[branchInventory.branch] = branchInventory.inventory
        branchInventory.inventory.forEach(product => {
            let newProductInfo = summaryCache[product.product] || {}
            newProductInfo[branchInventory.branch] = {
                threshold : product.threshold,
                availableQuantity : product.availableQuantity
            }
            summaryCache[product.product] = newProductInfo
        })
    })
}

const getThreshold = (productId,branchId) => 10

const makeEntry = (productId,branchId) => {
    summaryCache[productId] = summaryCache[productId] || {}
    cache[branchId] = cache[branchId] || []
    cache[branchId].push({
        threshold : getThreshold(productId,branchId),
        availableQuantity : 0,
        product: productId
    })
    summaryCache[productId][branchId] = {
        threshold : getThreshold(productId,branchId),
        availableQuantity : 0
    }
}


// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const getData = params => {
    console.log(params);
    return new Promise(async (resolve, reject) => {
        if(cache === null){
            // Logic can be applied to generate URL using params
            const url = `${config.API.BASE_URL}${pageConfig.GET_ALL_INVENTORY}`;
            console.log("API calling...", url);
            try {
                const res = await axios.get(url);
                res.flashMessage = {
                    "type": "success",
                    "message": "Data Loaded Successfully!"
                };
                if(pageConfig.CACHING){
                    parseInventoryResp(res.data)
                }
            } catch(err){
                reject(err);
            }
        }
        if(pageConfig.CACHING){
            getCurrentStateData(params);
        } else {
            // Need to resolve all params using the API respose e.g
            // categories.totalRecords = res.totalRecords;
            // categories.data = res.data;
            // categories.search = res.search;
            // categories.currentPage = res.currentPage;
        }
        resolve(output);
    });
}

// Add category implementaion
export const addData = data => {
    return new Promise(async (resolve, reject) => {
        if(pageConfig.CACHING){
            data._id = create_UUID();
            cachedData = [
                ...cachedData,
                data
            ];
            const params = {
                currentPage: output.currentPage,
                pageLimit: output.pageLimit,
                search: output.search,
                sort: output.sort
            }
            // Need to Add the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
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
export const updateData = data => {
    return new Promise(async (resolve, reject) => {
        if(pageConfig.CACHING){
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
                currentPage: output.currentPage,
                pageLimit: output.pageLimit,
                search: output.search,
                sort: output.sort
            }
            // Need to Update the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
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
export const deleteData = data => {
    return new Promise(async (resolve, reject) => {
        if(pageConfig.CACHING){
            cachedData = cachedData.filter(item => {
                if(item.id === data.id) {
                    return false;
                }
                return true;
            });
            const params = {
                currentPage: output.currentPage,
                pageLimit: output.pageLimit,
                search: output.search,
                sort: output.sort
            }
            // Need to delete the actual data to the source
            // Get the data back from source for the above params
            try {
                const res = await getData(params);
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
    console.log(params);
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    // let records = filterData(params);
    let records = cache[params.branch] || cache[0]
    let currentPage = validateCurrentPage(params, records);
    output.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    output.data = records.slice(offset, offset + params.pageLimit);
    output.search = params.search;
    output.sort = params.sort;
    output.currentPage = currentPage;
    output.summaryCache = summaryCache
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

export const generateCsv = (params) => {
    const arr = cache[params.branch] || []
    const outArr = []
    arr.forEach(row=> {
        const tempRow = []
        const product = getProduct(row.product)
        tempRow.push(product.name)
        tempRow.push(getCategory(product.category).name)
        tempRow.push(`${row.availableQuantity} `+getUnit(product.unit).name)
        tempRow.push(row.threshold)
        outArr.push(tempRow)
    })
    download(arrayToCsvContent(outArr),"Inventory.csv",)
}