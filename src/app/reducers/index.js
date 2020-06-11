import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import branchesReducer from './branchesReducer'
import inventoryReducer from './inventoryReducer'
import authReducer from './authReducer'
export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer,
    BRANCHES: branchesReducer,
    INVENTORY : inventoryReducer,
    AUTH : authReducer
});