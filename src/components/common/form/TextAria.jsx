import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import PropTypes from "prop-types";

const Textarea = (props) => {
    const { label, name, ...rest } = props;
    return (
        <div>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field
                className="form-control"
                as="textarea"
                id={name}
                name={name}
                {...rest}
            />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

Textarea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string
};
export default Textarea;
