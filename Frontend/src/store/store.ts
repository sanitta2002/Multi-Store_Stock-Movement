import { combineReducers } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import authReducer from "./slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
// Custom storage to bypass redux-persist/lib/storage Vite import issues
const storage = {
  getItem(key: string) {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "token"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  token: tokenReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;