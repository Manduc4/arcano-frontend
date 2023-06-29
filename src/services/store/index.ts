import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  Auth: auth,
});

const persistConfig = {
  key: "ROOT",
  storage: storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

const persistor = persistStore(store);

const { dispatch } = store;

type AppDispatch = typeof store.dispatch;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, dispatch, useDispatch, persistor, useSelector };
