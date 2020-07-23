// const apiConfig = config.API.PERMISSION;

// Null indicates we need to fetch the data from the source
// Incase of caching ON, need to fetch the data for first time
// Incase of Live interaction we'll never set cached data, forcing it to fetch all the time
let cachedData = [];

// Mimiking Starndard API response structure
// can be used to map from any API response to below object
// to avoid making changes in reducer structure
// For API page limit can be passed while making call
// const apiResponse = { // pMapping => Parameter Mapping
//     pageLimit: apiConfig.PAGE_LIMIT,
//     totalRecords: 1,
//     currentPage: 1,
//     data: null,
//     search: {},
//     sort: {}
// };

export const setCachedData = data => {
    cachedData = data;
}

// All the method will return promise, which will hold good for doing
// async operations, we don't have to make changes for the cached vs live data
// State params passed which will be used to pass to live api or
// for static data to get proper data as per the params
export const loadInitialData = () => {
    return new Promise(async (resolve, reject) => {
        let result = {}
        cachedData.forEach(item => {
            result[item.name.toUpperCase()] = item
        });
        resolve(result);
    });
}