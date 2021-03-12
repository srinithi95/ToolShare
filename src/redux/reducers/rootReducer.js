import { combineReducers } from 'redux';
import shareYourStoryReducer from './shareYourStoryReducer';
import userReducer from './userReducer';
import shareYourToolReducer from './shareYourToolReducer';

export default combineReducers({
    shareYourStoryReducer,
    userReducer,
    shareYourToolReducer
});