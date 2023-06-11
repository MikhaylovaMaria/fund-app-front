import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import PropTypes from "prop-types";

const Input = (props) => {
    const { name, label, ...rest } = props;
    return (
        <div>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field className="form-control" name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
};

export default Input;
