
// Used locally for demonstration
export const create_UUID = () => {
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
export const getSortFunction = sort => {
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

// Validate current page, Might change due to delete, search operation
// This is only required for the cached data
export const validateCurrentPage = (params, records) => {
    const offset = (params.currentPage - 1) * params.pageLimit;
    if(offset >= records.length && params.currentPage > 1){
        // Set to last page.
        return Math.ceil(records.length / params.pageLimit);
    }
    return params.currentPage;
}

// Need to filter and sort the data
export const filterData = (params, records) => {
    // More complex search need to handle as needed
    let result = records;
    let searchText = params.search.name && params.search.name.toLowerCase();
    if(searchText) {
        result = records.filter(item => item.name.toLowerCase().includes(searchText));
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result;
}
export const genericFilter = (params, records) => {
    let result = records;
    let searchKeys = Object.keys(params.search).filter(field => field.trim());
    if(searchKeys.length){
        result = records.filter(item => {
            let isMatch = true;
            for(let i=0; i<searchKeys.length; i++){
                let field = searchKeys[i];
                if(item[field] !== undefined && item[field] !== null){
                    isMatch = item[field].toString().toLowerCase().includes(params.search[field].toLowerCase());
                }
                if(!isMatch){
                    break;
                }
            }
            return isMatch
        });
    }
    if(params.sort.key) {
        return result.sort(getSortFunction(params.sort));
    }
    return result ? result : [];
}

export const handleResponse = res => {
    if(!res) return [null,new Error("Response is empty")]
    if(res.status >= 400 && res.status < 500) {
        //need to refresh the page or redirect to login page
        //optional for now
        // window.location.reload()
        return [null,{
            err : res.data,
            status : res.status
        }]
    }else if(res.status >= 500){
        //retry or put error card
        return [null,{
            err : res.data,
            status : res.status
        }]
    }else if(res.status >=200 && res.status <300) {
        return [res,null]
    }
}

export const arrayToMapWithId = array => {
    let result = {}
    array.forEach(item => {
        result[item.id] = item
    })
    return result;
}