import React from "react";
import "./modalZ.css";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? "modalZ active" : "modalZ"}
            onClick={() => setActive(false)}
        >
            <div
                className={
                    active ? "modalZ__content active" : "modalZ__content"
                }
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func
};

export default Modal;
