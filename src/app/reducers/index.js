import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
export default combineReducers({
    CATEGORY: categoryReducer,
    USER: userReducer
});