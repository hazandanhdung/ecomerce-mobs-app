import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { composeWithDevTools } from "redux-devtools-extension"
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
  whiteList: ["user"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  let persistor = persistStore(store, null, () => {
    store.getState();
    // }).purge();
  });
  return { store, persistor };
};
