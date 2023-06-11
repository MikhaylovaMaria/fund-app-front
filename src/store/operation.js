import { createAction, createSlice } from "@reduxjs/toolkit";
import OperationService from "../services/operation.service";
import { loadAccountsList, updateAccount } from "./bankAccount";

const OperationSlice = createSlice({
    name: "operation",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        operationRequested: (state) => {
            state.isLoading = true;
        },
        operationReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        operationCreated: (state, action) => {
            state.entities.unshift(action.payload);
        },
        operationFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        operationRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (a) => a._id !== action.payload
            );
        },
        operationUpdateSuccess: (state, action) => {
            const accountIndex = state.entities.findIndex(
                (a) => a._id === action.payload._id
            );
            state.entities[accountIndex] = action.payload;
        }
    }
});
const { reducer: OperationReduser, actions } = OperationSlice;
const {
    operationCreated,
    operationFiled,
    operationRequested,
    operationReceved,
    operationRemoved,
    operationUpdateSuccess
} = actions;

const createOperationRequested = createAction(
    "operations/createOperationRequested"
);
const removeOperationRequested = createAction(
    "operations/removeOperationRequested"
);
const operationUpdateRequested = createAction(
    "operations/operationUpdateRequested"
);
const operationUpdateFaild = createAction("operations/operationUpdateFaild");

export const createOperation = (payload) => async (dispatch) => {
    dispatch(createOperationRequested());
    try {
        const { content } = await OperationService.create(payload);
        dispatch(operationCreated(content.newOperation));
        dispatch(updateAccount(content.updateBankAccount));
    } catch (error) {
        dispatch(operationFiled(error.message));
    }
};

export const loadOperationsList = () => async (dispatch) => {
    dispatch(operationRequested());
    try {
        const { content } = await OperationService.getOperations();
        dispatch(operationReceved(content));
    } catch (error) {
        console.log(error);
        dispatch(operationFiled(error.message));
    }
};

export const removeOperation = (id) => async (dispatch) => {
    dispatch(removeOperationRequested());
    try {
        const { content } = await OperationService.removeOperation(id);
        if (!content) {
            dispatch(operationRemoved(id));
            dispatch(loadAccountsList());
        }
    } catch (error) {
        dispatch(operationFiled(error.message));
    }
};

export const updateOperation = (payload) => async (dispatch) => {
    dispatch(operationUpdateRequested());
    try {
        const { content } = await OperationService.updateOperation(payload);
        dispatch(operationUpdateSuccess(content));
    } catch (error) {
        dispatch(operationUpdateFaild(error.message));
    }
};

export const getOperations = () => (state) => state.operation.entities;
export const getLoadingStatusOperations = () => (state) =>
    state.operation.isLoading;

export const getOperationError = () => (state) => state.operation.error;

export default OperationReduser;
