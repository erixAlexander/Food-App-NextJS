import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import sidebarReducer from "../features/sidebarSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  sidebar: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
