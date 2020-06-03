import {combineReducers} from 'redux';
import reducer from './categoryReducer';
import userReducer from './userReducer';

const categoryReducer = reducer('CATEGORY')
export default combineReducers({
    category: categoryReducer,
    user: userReducer
});