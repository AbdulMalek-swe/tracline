import {   configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import addUserSlice  from "../features/addUser/addUserSlice";
import addImageSlice from "../features/addImage/addImageSlice";

const rootReducer = combineReducers({
  User: addUserSlice,
  Image: addImageSlice,
});

//configure store
const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export default store; 