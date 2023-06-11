import React from "react";
import PropTypes from "prop-types";

const TextError = (props) => {
    return <div className="text-danger"> {props.children}</div>;
};

TextError.propTypes = {
    children: PropTypes.children
};

export default TextError;
