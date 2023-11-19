import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./GlobalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonServerApi } from "Services/JsonServerApi";

export const store = configureStore({
  reducer :{
    global : globalReducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(jsonServerApi.middleware),
});

setupListeners(store.dispatch)















