import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getIsLoggedIn, loadUserData } from "../store/user";
import { loadAccountsList } from "../store/bankAccount";
import { loadCategoriesList } from "../store/categories";
import { loadOperationsList } from "../store/operation";

const AppContent = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(getIsLoggedIn());
    useEffect(() => {
        if (isLogged) {
            dispatch(loadUserData());
            dispatch(loadAccountsList());
            dispatch(loadCategoriesList());
            dispatch(loadOperationsList());
        }
    }, [isLogged]);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AppContent;
