import {combineReducers} from 'redux';
import {userReducer} from './userReducer';

//  combining reducers into one main reducer
export const rootReducer = combineReducers({
    user:userReducer
});