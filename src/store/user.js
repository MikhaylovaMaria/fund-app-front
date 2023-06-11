import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { generateAuthError } from "../utils/generateAuthError";
import userService from "../services/user.service";
import history from "../utils/history";
import photosService from "../services/photos.service";
const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true;
        },
        userReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        userRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestFaild: (state, action) => {
            state.error = action.payload;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            // state.entities = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdatedSuccess: (state, action) => {
            state.entities = action.payload;
        }
    }
});

const { reducer: userReduser, actions } = userSlice;
const {
    authRequestSuccess,
    authRequestFaild,
    userLoggedOut,
    userRequested,
    userReceved,
    userRequesFiled,
    userUpdatedSuccess
} = actions;

const authRequested = createAction("user/authRequested");
const userUpdateRequested = createAction("user/userUpdateRequested");
const userUpdateFaild = createAction("user/userUpdateFaild");
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getAuthErrors = () => (state) => state.user.error;

export const logIn = (payload) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFaild(errorMessage));
        } else {
            dispatch(authRequestFaild(error.message));
        }
    }
};
export const signUp = (payload) => async (dispatch) => {
    try {
        if (typeof payload.image === "object") {
            const formData = new FormData();
            formData.append("image", payload.image);
            const photo = await photosService.create(formData);
            payload = { ...payload, image: photo.content.url };
        }
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFaild(errorMessage));
        } else {
            dispatch(authRequestFaild(error.message));
        }
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};
export const loadUserData = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(userReceved(content));
    } catch (error) {
        dispatch(userRequesFiled(error.message));
    }
};

export const updateUser = (payload, setActive) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        if (typeof payload.image === "object") {
            const formData = new FormData();
            formData.append("image", payload.image);
            const photo = await photosService.create(formData);
            payload = { ...payload, image: photo.content.url };
        }
        const { content } = await userService.updateUser(payload);
        dispatch(userUpdatedSuccess(content));
        setActive(false);
    } catch (error) {
        dispatch(userUpdateFaild(error.message));
    }
};

export const getCurrentUserData = () => (state) => {
    return state.user.entities;
};
export const getErrorUser = () => (state) => {
    return state.user.error;
};

export default userReduser;
