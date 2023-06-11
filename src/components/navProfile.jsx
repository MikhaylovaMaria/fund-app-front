import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/user";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    if (!currentUser) return <Loader />;

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="m-2">
                    <h5>{currentUser.name}</h5>
                </div>
                <img
                    src={currentUser.image}
                    alt=""
                    height="35"
                    width="35"
                    className="img-responsive rounded-circle"
                    style={{ background: "white" }}
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/user/${currentUser._id}`} className="dropdown-item">
                    <h6>Профиль</h6>
                </Link>
                <Link to="/logout" className="dropdown-item">
                    <h6> Выход</h6>
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
