export default {
    "PAGINATION": {
        "PAGE_LIMIT": 10
    },
    "API" : {
        "BASE_URL": "",
        "CATEGORYMOCK": {
            "GET_CTEGORIES": "/data/categories.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "CATEGORY": {
            "GET_CTEGORIES": "https://local-parikrama.web.app/api/categories",
            "UPDATE_CATEGORIES" : "https://local-parikrama.web.app/api/categories/desc",
            "DELETE_CATEGORIES" : "https://local-parikrama.web.app/api/categories/",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "INVENTORY": {
            "ISSUE_PRODUCT":"https://local-parikrama.web.app/api/actions/issueproduct",
            "ADJUSTMENT":"https://local-parikrama.web.app/api/actions/adjustment",
            "ADD_PRODUCT":"https://local-parikrama.web.app/api/actions/addproduct",
            "PENDING_TRANSACTIONS": "https://local-parikrama.web.app/api/pendingRequests/branches/",
            "GET_BRANCH_INVENTORY": "https://local-parikrama.web.app/api/inventories/",  
            "RAISE_REQUEST" : "https://local-parikrama.web.app/api/actions/requestProduct",
            "TRANSFER_REQUEST":"https://local-parikrama.web.app/api/actions/transferproduct",
            "GET_ALL_INVENTORY": "https://local-parikrama.web.app/api/inventories/",
            // "GET_ALL_INVENTORY":"/data/inventory.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "INVENTORY_SUMMARY":{
            "GET_REPORT_SUMMARY": "https://local-parikrama.web.app/api/reports/",
            "PAGE_LIMIT": 25,
            "CACHING": true
        },
        "ROLE": {
            "GET_ROLES": "https://local-parikrama.web.app/api/roles",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "PERMISSION": {
            "GET_PERMISSIONS": "https://local-parikrama.web.app/api/permissions",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "USER": {
            "GET_USER" : 'https://local-parikrama.web.app/api/users',
            "GET_USERS": "https://local-parikrama.web.app/api/users",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "BRANCHES": {
            "GET_BRANCHES": "https://local-parikrama.web.app/api/branches",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "PRODUCTS": {
            "GET_PRODUCTS": "https://local-parikrama.web.app/api/products",
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
            "GET_ALL_UNITS" : "https://local-parikrama.web.app/api/units",
            "ADD_UNIT": "https://local-parikrama.web.app/api/units",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "TRANSACTIONS" : {
            "GET_TRANSACTIONS": "https://local-parikrama.web.app/api/transactions",
            "CACHING": false,
            "PAGE_LIMIT": 10
        },
        "AUDITS" : {
            "GET_AUDITS": "https://local-parikrama.web.app/api/audits",
            "CACHING": false,
            "PAGE_LIMIT": 10
        },
        "DASHBOARD" : {
            "GET_DASHBOARD_DATA": "/data/dashboard.json",
            "CACHING": true
        }
    }
};