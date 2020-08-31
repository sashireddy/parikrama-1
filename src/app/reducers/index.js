import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import branchesReducer from './branchesReducer';
import inventoryReducer from './inventoryReducer';
import authReducer from './authReducer';
import roleReducer from './roleReducer';
import operationReducer from './operationReducer';
import productsReducer from './productReducer';
import thresholdReducer from './thresholdReducer';
import unitsReducer from './unitsReducer';
import transactionReducer from './transactionReducer';
import dashboardReducer from './dashboardReducer';
import auditReducer from './auditReducer';
import InventorySummary from './InventorySummary';
import inventoryHistory from './inventoryHistoryReducer';

export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer,
    BRANCHES: branchesReducer,
    INVENTORY : inventoryReducer,
    AUTH : authReducer,
    ROLE: roleReducer,
    OPERATION: operationReducer,
    PRODUCTS : productsReducer,
    THRESHOLD : thresholdReducer,
    UNITS : unitsReducer,
    TRANSACTION: transactionReducer,
    DASHBOARD: dashboardReducer,
    AUDIT: auditReducer,
    INVENTORYSUMMARY: InventorySummary,
    INVENTORYHISTORY: inventoryHistory
});