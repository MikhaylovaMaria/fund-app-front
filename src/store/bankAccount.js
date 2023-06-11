import { createAction, createSlice } from "@reduxjs/toolkit";
import BankAccountService from "../services/bankAccount.service";
import { loadOperationsList } from "./operation";

const bankAccountSlice = createSlice({
    name: "bankAccount",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        bankAccountRequested: (state) => {
            state.isLoading = true;
        },
        bankAccountReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        bankAccountCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        bankAccountFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        bankAccountRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (a) => a._id !== action.payload
            );
        },
        bankAccountUpdateSuccess: (state, action) => {
            const accountIndex = state.entities.findIndex(
                (a) => a._id === action.payload._id
            );
            state.entities[accountIndex] = action.payload;
        }
    }
});
const { reducer: bankAccountReduser, actions } = bankAccountSlice;
const {
    bankAccountCreated,
    bankAccountFiled,
    bankAccountRequested,
    bankAccountReceved,
    bankAccountRemoved,
    bankAccountUpdateSuccess
} = actions;

const createBankAccountRequested = createAction(
    "bankAccount/createBankAccountRequested"
);
const removeBankAccountRequested = createAction(
    "bankAccount/removeBankAccountRequested"
);
const accountUpdateRequested = createAction(
    "bankAccount/accountUpdateRequested"
);
const accountUpdateFaild = createAction("bankAccount/accountUpdateFaild");

export const createBankAccount = (payload) => async (dispatch) => {
    dispatch(createBankAccountRequested());
    try {
        const { content } = await BankAccountService.create(payload);
        dispatch(bankAccountCreated(content));
    } catch (error) {
        dispatch(bankAccountFiled(error.message));
    }
};

export const loadAccountsList = () => async (dispatch) => {
    dispatch(bankAccountRequested());
    try {
        const { content } = await BankAccountService.getAccounts();
        dispatch(bankAccountReceved(content));
    } catch (error) {
        console.log(error);
        dispatch(bankAccountFiled(error.message));
    }
};

export const removeAccount = (id) => async (dispatch) => {
    dispatch(removeBankAccountRequested());
    try {
        const { content } = await BankAccountService.removeAccount(id);
        if (!content) {
            dispatch(bankAccountRemoved(id));
            dispatch(loadOperationsList());
        }
    } catch (error) {
        dispatch(bankAccountFiled(error.message));
    }
};

export const updateAccount = (payload) => async (dispatch) => {
    dispatch(accountUpdateRequested());
    try {
        const { content } = await BankAccountService.updateAccount(payload);
        dispatch(bankAccountUpdateSuccess(content));
    } catch (error) {
        dispatch(accountUpdateFaild(error.message));
    }
};

export const getBankAccounts = () => (state) => state.bankAccount.entities;
export const getLoadingStatusAccount = () => (state) =>
    state.bankAccount.isLoading;
export const getAccountError = () => (state) => state.bankAccount.error;

export default bankAccountReduser;
