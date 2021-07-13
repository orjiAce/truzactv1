//here this reducer is the base object that represent all of the state of our application
//combines all of our states together
//use 'combineReducer' to combine all the reducers together

import {combineReducers} from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import userReducer from './userReducer';
import dataReducer from './dataReducer'
//the configuration object that we want redux persist to use

const persistConfig = {
    //the key means at what point in our reduce object do we wanna start soring everything
    key: 'truzactMember',
    storage,
    //whitelist is an object that contains any of the reducer name we wanna store or persist
    whitelist: ['user', 'data']
};

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
});
export default persistReducer(persistConfig, rootReducer)
