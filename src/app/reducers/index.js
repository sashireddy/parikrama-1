import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import branchesReducer from './branchesReducer';
import inventoryReducer from './inventoryReducer';
import authReducer from './authReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import productsReducer from './productReducer';
import thresholdReducer from './thresholdReducer';

export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer,
    BRANCHES: branchesReducer,
    INVENTORY : inventoryReducer,
    AUTH : authReducer,
    ROLE: roleReducer,
    PERMISSION: permissionReducer,
    PRODUCTS : productsReducer,
    THRESHOLD : thresholdReducer
});