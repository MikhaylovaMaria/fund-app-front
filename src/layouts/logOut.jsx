import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, logOut } from "../store/user";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    const isLogged = useSelector(getIsLoggedIn());

    if (isLogged) {
        return <Navigate to="/auth" />;
    }
    return <Loader />;
};

export default LogOut;
