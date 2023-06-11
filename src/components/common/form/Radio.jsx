import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import PropTypes from "prop-types";

const RadioButtons = (props) => {
    const { label, name, options, ...rest } = props;
    return (
        <div>
            <label className="form-label m-2">{label}</label>
            <Field name={name} className="form-control">
                {(formik) => {
                    const { field } = formik;
                    return options.map((o) => {
                        return (
                            <div className="m-2 d-inline-block" key={o._id}>
                                <input
                                    type="radio"
                                    id={o._id}
                                    {...field}
                                    {...rest}
                                    value={o._id}
                                    checked={field.value === o._id}
                                />
                                <label className="form-label" htmlFor={o._id}>
                                    {o.value}
                                </label>
                            </div>
                        );
                    });
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

RadioButtons.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default RadioButtons;
