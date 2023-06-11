import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import PropTypes from "prop-types";

const Select = (props) => {
    const { label, name, options, ...rest } = props;
    return (
        <div>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Field
                as="select"
                className="form-control"
                id={name}
                name={name}
                {...rest}
            >
                {options &&
                    options.map((o) => {
                        return (
                            <option key={o._id} value={o._id}>
                                {o.name}
                            </option>
                        );
                    })}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default Select;
