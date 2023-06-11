import React from "react";
import PropTypes from "prop-types";

const DrownButton = ({
    isOpen,
    setOpen,
    defaultValue,
    options,
    setCurrentValue,
    currentValue,
    setDef1,
    setDef2
}) => {
    const toggleMenu = () => {
        setDef1(false);
        setDef2(false);
        setOpen((prev) => !prev);
    };

    const click = (o) => {
        setCurrentValue(o);
    };
    return (
        <div className="dropdown col-sm" onClick={toggleMenu}>
            <div className="btn btn-light dropdown-toggle d-flex align-items-center ">
                {
                    <span className="mn-2 text-center">
                        {currentValue?.name || defaultValue}
                    </span>
                }
            </div>
            <div
                className={
                    "dropdown-menu scroll-menu" + (isOpen ? " show" : "")
                }
                style={{ maxHeight: "10rem", overflowX: "hidden" }}
            >
                <div
                    className="dropdown-item"
                    role="button"
                    onClick={() => click(defaultValue)}
                >
                    {defaultValue}
                </div>
                {options.map((o) => {
                    return (
                        <div
                            key={o._id}
                            className="dropdown-item"
                            role="button"
                            onClick={() => click(o)}
                        >
                            {o.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

DrownButton.propTypes = {
    isOpen: PropTypes.bool,
    setOpen: PropTypes.func,
    defaultValue: PropTypes.string,
    options: PropTypes.array,
    setCurrentValue: PropTypes.func,
    currentValue: PropTypes.object,
    setDef1: PropTypes.func,
    setDef2: PropTypes.func
};

export default DrownButton;
