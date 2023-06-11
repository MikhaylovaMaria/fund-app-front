import { Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import User from "./layouts/User";
import Login from "./layouts/logIn";
import LogOut from "./layouts/logOut";
import AppContent from "./layouts/AppContent";

const routes = (isLoggedIn) => [
    {
        path: "/",
        element: <AppContent />,
        children: [
            { index: true, element: <Navigate to="/auth/logIn" /> },
            {
                path: "home",
                element: isLoggedIn ? (
                    <MainPage />
                ) : (
                    <Navigate to="/auth/logIn" />
                )
            },

            {
                path: "history",
                element: isLoggedIn ? (
                    <HistoryPage />
                ) : (
                    <Navigate to="/auth/logIn" />
                )
            },
            {
                path: "/user/:userId?",
                element: isLoggedIn ? <User /> : <Navigate to="/auth/logIn" />
            }
        ]
    },
    {
        path: "logOut",
        element: <LogOut />
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            { path: "", element: <Navigate to="/auth/logIn" /> },
            { path: "signUp", element: <Login type="signUp" /> },
            { path: "logIn", element: <Login type="logIn" /> },
            { path: "*", element: <Navigate to="/auth/logIn" /> }
        ]
    },

    { path: "*", element: <Navigate to={isLoggedIn ? "/" : "/auth/logIn"} /> }
];

export default routes;
