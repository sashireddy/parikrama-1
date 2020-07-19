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
import unitsReducer from './unitsReducer';
import transactionReducer from './transactionReducer';
import dashboardReducer from './dashboardReducer';
import auditReducer from './auditReducer';

export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer,
    BRANCHES: branchesReducer,
    INVENTORY : inventoryReducer,
    AUTH : authReducer,
    ROLE: roleReducer,
    PERMISSION: permissionReducer,
    PRODUCTS : productsReducer,
    THRESHOLD : thresholdReducer,
    UNITS : unitsReducer,
    TRANSACTION: transactionReducer,
    DASHBOARD: dashboardReducer,
    AUDIT: auditReducer
});