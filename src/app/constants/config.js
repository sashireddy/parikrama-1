export default {
    "PAGINATION": {
        "PAGE_LIMIT": 10
    },
    "API" : {
        "BASE_URL": "",
        "CATEGORY": {
            "GET_CTEGORIES": "/data/categories.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "INVENTORY": {
            "GET_BRANCH_INVENTORY": "/data/inventory.json",  
            "GET_ALL_INVENTORY":"/data/allInventory.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
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
            "GET_USER" : '/data/userData.json',
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
            "GET_PRODUCTS": "/data/products.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "THRESHOLD" : {
            "GET_THRESHOLD": "/data/threshold.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "UNITS" : {
            "GET_ALL_UNITS" : "/data/units.json",
            "ADD_UNIT": "/data/units.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        },
        "TRANSACTIONS" : {
            "GET_TRANSACTIONS": "/data/transactions.json",
            "CACHING": true,
            "PAGE_LIMIT": 10
        }
    }
};