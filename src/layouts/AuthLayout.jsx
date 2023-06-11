import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { getIsLoggedIn } from "../store/user";

const AuthLayout = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
