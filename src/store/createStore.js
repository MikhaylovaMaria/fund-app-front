import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReduser from "./user";
import bankAccountReduser from "./bankAccount";
import OperationReduser from "./operation";
import categoriesReduser from "./categories";

const rootReducer = combineReducers({
    user: userReduser,
    bankAccount: bankAccountReduser,
    operation: OperationReduser,
    categories: categoriesReduser
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
