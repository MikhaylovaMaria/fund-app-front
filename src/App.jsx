import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const isLogged = useSelector(getIsLoggedIn());

    const elements = useRoutes(routes(isLogged));
    return (
        <div>
            {isLogged && <NavBar />}
            {elements}
            <ToastContainer />
        </div>
    );
}

export default App;
