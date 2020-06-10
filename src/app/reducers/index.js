import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';

export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer,
    ROLE: roleReducer,
    PERMISSION: permissionReducer
});