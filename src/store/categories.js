import { createAction, createSlice } from "@reduxjs/toolkit";
import CategoriesService from "../services/categories.service";
import { loadOperationsList } from "./operation";
import { loadAccountsList } from "./bankAccount";

const CategoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoriesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        categoriesCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        categoriesRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (a) => a._id !== action.payload
            );
        },
        categoriesUpdateSuccess: (state, action) => {
            const accountIndex = state.entities.findIndex(
                (a) => a._id === action.payload._id
            );
            state.entities[accountIndex] = action.payload;
        }
    }
});

const { reducer: categoriesReduser, actions } = CategoriesSlice;

const {
    categoriesFiled,
    categoriesRequested,
    categoriesReceved,
    categoriesCreated,
    categoriesRemoved,
    categoriesUpdateSuccess
} = actions;

export const loadCategoriesList = () => async (dispatch) => {
    dispatch(categoriesRequested());
    try {
        const { content } = await CategoriesService.getCategories();
        dispatch(categoriesReceved(content));
    } catch (error) {
        dispatch(categoriesFiled(error.message));
    }
};

const createCategoryRequested = createAction(
    "categories/createCategoryRequested"
);
const removeCategoryRequested = createAction(
    "categories/removeCategoryRequested"
);
const updateCategoryRequested = createAction(
    "categories/updateCategoryRequested"
);
const categoriesUpdateFaild = createAction("categories/categoryUpdateFaild");

export const createСategory = (payload) => async (dispatch) => {
    dispatch(createCategoryRequested());
    try {
        const { content } = await CategoriesService.create(payload);
        dispatch(categoriesCreated(content));
    } catch (error) {
        dispatch(categoriesFiled(error.message));
    }
};

export const removeCategory = (id) => async (dispatch) => {
    dispatch(removeCategoryRequested());
    try {
        const { content } = await CategoriesService.removeCategories(id);
        if (!content) {
            dispatch(categoriesRemoved(id));
            dispatch(loadOperationsList());
            dispatch(loadAccountsList());
        }
    } catch (error) {
        dispatch(categoriesFiled(error.message));
    }
};

export const updateCategory = (payload) => async (dispatch) => {
    dispatch(updateCategoryRequested());
    try {
        const { content } = await CategoriesService.updateCategories(payload);
        dispatch(categoriesUpdateSuccess(content));
    } catch (error) {
        dispatch(categoriesUpdateFaild(error.message));
    }
};

export const getCategoriesOperation = () => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.filter((c) => c.article !== "account");
    }
};

export const getCategoriesAccount = () => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.filter(
            (c) => c.article !== "operation"
        );
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getLoadingStatusCategory = () => (state) =>
    state.categories.isLoading;
export const getCategorError = () => (state) => state.categories.error;

export default categoriesReduser;
