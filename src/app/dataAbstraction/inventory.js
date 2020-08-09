import config from "../constants/config";
import axios from 'axios';
import {handleResponse} from './util'
// import {getProduct,getUnit,getCategory, getBranch} from '../utils/dataUtils'
import {getUnit,getCategory,getProduct,getBranch,getThreshold} from '../utils/dataUtils'
import {arrayToCsvContent,download} from '../utils/csvUtils'
import {genericFilter,validateCurrentPage} from './util'
import dateFormat from "dateformat";
// import { updateCategoryData } from "./category";
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
                // const [response,err]= handleResponse(await axios.get(pageConfig.PENDING_TRANSACTIONS+'R1vTnxSLWByLa7NocDDX'))
                const [response,err]= handleResponse(await axios.get(pageConfig.PENDING_TRANSACTIONS+params.branch))
                pendingTransactions = response.data.pendingRequests
                if(err){return reject(err)}
            }
            resolve(pendingTransactions)
        }catch(err){
            reject(err)
        }
    })
}
export const rejectRequest = async params => {
    try {
        const [,err]=handleResponse(await axios.post(pageConfig.REJECT_REQUEST,params));
        console.log(err)
        // if(err) throw new Error(err)
        pendingTransactions = pendingTransactions.filter(entry => entry.id !== params.pendingRequestsId)
        return pendingTransactions
    }catch(err){
        throw new Error(err)
    }
}
export const respondToTransferRequest = async params => {
    try{
        const list = []
        Object.keys(params.quantityMap).forEach(entry => {
            list.push({
                operationalQuantity : params.quantityMap[entry],
                product: params.product,
                productName: params.productName,
                pendingRequestsId : params.id,
                fromBranch: entry,
                fromBranchName : getBranch(entry).name,
                toBranch: params.toBranch,
                note : params.note,
                toBranchName: params.toBranchName,
                user: params.user
            });
        })
        await Promise.all(list.map(async params=>{
            return axios.post(pageConfig.TRANSFER_REQUEST,params)
        }))
        let sum =0
        Object.keys(params.quantityMap).forEach(entry => {
            const quantity = parseInt(params.quantityMap[entry])
            sum +=quantity
            updateQuantity(quantity,entry,params.product,"sub")
        })
        updateQuantity(sum,params.toBranch,params.product,"add")
        pendingTransactions = pendingTransactions.filter(entry => entry.id !== params.id)
        return pendingTransactions
    }catch (err) {
        throw new Error(err)
    }
}

export const createTransaction = ({type,...otherParams}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = pageConfig[type]
            let queryParams = {};
            const queryList = [];
            if(type === "RAISE_REQUEST"){
                //raise request from branch to head office
                otherParams.rowsArr.forEach(row => {
                    queryList.push({
                        "toBranch": otherParams.fromBranch,//always headoffice
                        "fromBranch": otherParams.toBranch,
                    	"toBranchName": otherParams.fromBranchName,
	                    "fromBranchName": otherParams.toBranchName,
                        "productName":row.productName,
                        "product": row.product,
                        "operationalQuantity": parseInt(row.operationalQuantity),
                        "note": otherParams.note    
                    })
                })
                queryParams = {
                    "toBranch": otherParams.fromBranch,//always headoffice
                    "fromBranch": otherParams.toBranch,
                	"toBranchName": otherParams.fromBranchName,
	                "fromBranchName": otherParams.toBranchName,
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
                    "productName":otherParams.productName,
                    "product": otherParams.product,
                    "operationalQuantity": parseInt(otherParams.operationalQuantity),
                    "note": otherParams.note
                }
            }else if(type === "ADJUSTMENT"){

                queryParams = {
                    "branch": otherParams.fromBranch,
                    "productName":otherParams.rowsArr[0].productName,
                    "product": otherParams.rowsArr[0].product,
                    "operationalQuantity": parseInt(otherParams.rowsArr[0].operationalQuantity),
                    "note": otherParams.note
                }

            }else if(type === "ADD_PRODUCT"){
                otherParams.rowsArr.forEach(row => {
                    queryList.push({
                        "toBranch": otherParams.fromBranch,//always headoffice
                        "fromBranch": otherParams.toBranch,
                    	"toBranchName": otherParams.fromBranchName,
	                    "fromBranchName": otherParams.toBranchName,
                        "productName":row.productName,
                        "product": row.product,
                        "operationalQuantity": parseInt(row.operationalQuantity),
                        "note": otherParams.note    
                    })
                })
            }else {
                // add locally or disburse locally or adjustment
                queryParams = {
                    "branch": otherParams.fromBranch,
                    "productName":otherParams.productName,
                    "product": otherParams.product,
                    "operationalQuantity": parseInt(otherParams.operationalQuantity),
                    "note": otherParams.note
                }
            }
            let resp
            try{
                if(type === "ADD_PRODUCT" || type === "RAISE_REQUEST"){
                    resp = await Promise.all(queryList.map(row => {
                        return axios.post(url,row)
                    }));
                }else{
                    resp = await axios.post(url,queryParams)
                }
            }catch (err){
                return reject(err);
            }
            // const [resp,err]= handleResponse()
            // if(err){ return reject(err)}
            if(pageConfig.CACHING){
                if(type==="ISSUE_PRODUCT"){
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"sub")
                }else if(type === "ADD_PRODUCT"){
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"add")
                }else if ( type === "TransferOperation") {
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.toBranch,otherParams.product,"add")
                    updateQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product,"sub")
                }else if (type === "RAISE_REQUEST"){
                    pendingTransactions.push(makePendingTransaction(otherParams,resp))
                }else if( type === "ADJUSTMENT") {
                    adjustQuantity(parseInt(otherParams.operationalQuantity),otherParams.fromBranch,otherParams.product)
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
    if(!(summaryCache[product]&& summaryCache[product][branch])){
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
const adjustQuantity = (quantity,branch,product) => {
    if(!(summaryCache[product]&& summaryCache[product][branch])){
        makeEntry(product,branch)
    }
    cache[branch].map(entry => {
        if(product === entry.product){
            entry.availableQuantity = quantity
        }
        return entry
    })
    summaryCache[product][branch].availableQuantity = quantity
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

const makePendingTransaction = (params,resp) => {
    return {
        "fromBranch": params.fromBranch,
        "fromBranchName":params.fromBranchName,
        "product": params.product,
        "productName": params.productName,
        "operationalQuantity": params.operationalQuantity,
        "note" : params.note,
        "id": resp.data.pendingRequestsId
    }
}
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
    return new Promise(async (resolve, reject) => {
        if(cache === null){
            // Logic can be applied to generate URL using params
            const url = `${config.API.BASE_URL}${pageConfig.GET_ALL_INVENTORY}`;
            // console.log("API calling...", url);
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

const getAllBranchRecords = () => {
    const records = []
    const productKeys = Object.keys(summaryCache)
        productKeys.forEach(key => {
            let entry =  {}
            entry.product = key
            entry.quantityBranch=[]
            Object.keys(summaryCache[key]).forEach(branch => {
                let branchEntry = {}
                branchEntry.name  = getBranch(branch).name;
                branchEntry.id  = branch;
                branchEntry.quantity = summaryCache[key][branch]
                entry.quantityBranch.push(branchEntry)
            })
            records.push(entry)
    })
    return records;
}

const getCurrentStateData = params => {
    // Need to implement search and sort functionality here
    // After search total records may vary, reset pagination to 1st page.
    // let records = filterData(params);
    let records = []
    if(params.branch === "ALL_BRANCHES"){
        // const productKeys = Object.keys(summaryCache)
        // productKeys.forEach(key => {
        //     let entry =  {}
        //     entry.product = key
        //     entry.quantityBranch=[]
        //     Object.keys(summaryCache[key]).forEach(branch => {
        //         let branchEntry = {}
        //         branchEntry.name  = getBranch(branch).name;
        //         branchEntry.id  = branch;
        //         branchEntry.quantity = summaryCache[key][branch]
        //         entry.quantityBranch.push(branchEntry)
        //     })
        //     records.push(entry)
        // })
        records =  getAllBranchRecords()
    }else{
        records = cache[params.branch] || cache[0]    
    }
    
    records.map(entry => {
        const product = getProduct(entry.product);
        entry.productName = product.name;
        entry.categoryName = getCategory(product.category).name;
        entry.unitName = getUnit(product.unit).name;
        entry.id = entry.product;
        return entry
    });
    records = genericFilter(params,records)
    let currentPage = validateCurrentPage(params, records);
    output.totalRecords = records.length;
    const offset = (currentPage - 1) * params.pageLimit;
    output.data = records.slice(offset, offset + params.pageLimit);
    output.search = params.search;
    output.sort = params.sort;
    output.currentPage = currentPage;
    output.summaryCache = summaryCache
}

export const generateCsv = (params) => {
    let branchName = getBranch(params.branch).name
    branchName = getBranch(params.branch).name
    if(params.branch === "ALL_BRANCHES"){
        branchName = "ALL_BRANCHES"
    }
    const headerArr = ['Product','Category','Branch','Threshold','Available Quantity','Unit']
    let arr = cache[params.branch] || []
    if(params.branch  === "ALL_BRANCHES"){
        arr = getAllBranchRecords()
    }
    const outArr = []
    outArr.push(headerArr)
    if(branchName === "ALL_BRANCHES"){
        arr.forEach(row=> {
            row.quantityBranch.forEach(rowBranch =>  {
                const tempRow = []
                const product = getProduct(row.product);
                tempRow.push(product.name)
                tempRow.push(getCategory(product.category).name)
                tempRow.push(rowBranch.name)
                tempRow.push(rowBranch.quantity.threshold)
                tempRow.push(rowBranch.quantity.availableQuantity)
                tempRow.push(getUnit(product.unit).name)
                outArr.push(tempRow)
            })
            
        })
    }else{
        arr.forEach(row=> {
        const tempRow = []
        tempRow.push(row.productName)
        tempRow.push(row.categoryName)
        tempRow.push(branchName)
        tempRow.push(row.threshold)
        tempRow.push(row.availableQuantity)
        tempRow.push(row.unitName)
        outArr.push(tempRow)
        })
    }

    download(arrayToCsvContent(outArr),`AvailableQuantity_${branchName}_${dateFormat(new Date(), "yyyy-mm-dd")}.csv`,)
}