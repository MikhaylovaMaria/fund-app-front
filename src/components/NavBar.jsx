import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/user";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLogged = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar mb-3" style={{ background: "#e6e6fa" }}>
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">
                            <h5>Главная</h5>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/history">
                            <h5> История</h5>
                        </NavLink>
                    </li>
                </ul>
                <div className="d-flex">{isLogged && <NavProfile />}</div>
            </div>
        </nav>
    );
};

export default NavBar;
