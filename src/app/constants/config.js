let BASE_URL = "";
if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    BASE_URL = "https://local-parikrama.web.app";
}

export default {
    "PAGINATION": {
        "PAGE_LIMIT": 10
    },
    "API" : {
        "CATEGORY": {
            "GET_CTEGORIES": `${BASE_URL}/api/categories`,
            "UPDATE_CATEGORIES" : `${BASE_URL}/api/categories/desc`,
            "DELETE_CATEGORIES" : `${BASE_URL}/api/categories/`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "INVENTORY": {
            "ISSUE_PRODUCT":`${BASE_URL}/api/actions/issueproduct`,
            "ADJUSTMENT":`${BASE_URL}/api/actions/adjustment`,
            "ADD_PRODUCT":`${BASE_URL}/api/actions/addproduct`,
            "PENDING_TRANSACTIONS": `${BASE_URL}/api/pendingRequests/branches/`,
            "GET_BRANCH_INVENTORY": `${BASE_URL}/api/inventories/`,
            "RAISE_REQUEST" : `${BASE_URL}/api/actions/requestProduct`,
            "TRANSFER_REQUEST":`${BASE_URL}/api/actions/transferProduct`,
            "GET_ALL_INVENTORY": `${BASE_URL}/api/inventories/`,
            "REJECT_REQUEST" :   `${BASE_URL}/api/actions/rejectRequest`,
            "TransferOperation" : `${BASE_URL}/api/actions/moveProduct`,
            "INVENTORY_HISTORY": `${BASE_URL}/api/transferRequests/branches`,
            // "GET_ALL_INVENTORY":"/data/inventory.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "INVENTORY_SUMMARY":{
            "GET_REPORT_SUMMARY": `${BASE_URL}/api/reports/`,
            "GET_ALL_REPORT_SUMMARY": `${BASE_URL}/api/reports/all/branches/`,
            "PAGE_LIMIT": 10,
            "CACHING": true
        },
        "ROLE": {
            "GET_ROLES": `${BASE_URL}/api/roles`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "PERMISSION": {
            "GET_PERMISSIONS": `${BASE_URL}/api/permissions`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "USER": {
            "GET_USER" : `${BASE_URL}/api/users`,
            "GET_USERS": `${BASE_URL}/api/users`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "BRANCHES": {
            "GET_BRANCHES": `${BASE_URL}/api/branches`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "PRODUCTS": {
            "GET_PRODUCTS": `${BASE_URL}/api/products`,
            // "GET_PRODUCTS": "/data/products.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "THRESHOLD" : {
            "GET_THRESHOLD": "/data/threshold.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "UNITS" : {
            "GET_ALL_UNITS" : `${BASE_URL}/api/units`,
            "ADD_UNIT": `${BASE_URL}/api/units`,
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "TRANSACTIONS" : {
            "GET_TRANSACTIONS": `${BASE_URL}/api/transactions`,
            "CACHING": false,
            "PAGE_LIMIT": 10
        },
        "AUDITS" : {
            "GET_AUDITS": `${BASE_URL}/api/audits`,
            "CACHING": false,
            "PAGE_LIMIT": 10
        },
        "DASHBOARD" : {
            "GET_DASHBOARD_DATA": `${BASE_URL}/api/dashboard`,
            "CACHING": true
        },
        "METADATA" : {
            "GET_METADATA": `${BASE_URL}/api/metadata`,
            "CACHING": true
        }
    },
    "DATE_FORMAT" : "yyyy-mm-dd HH:MM:ss"
};