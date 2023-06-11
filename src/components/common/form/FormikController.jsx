import React from "react";
import Input from "./Input";
import Select from "./Select";
import RadioButtons from "./Radio";
import Textarea from "./TextAria";
import PropTypes from "prop-types";

const FormikController = (props) => {
    const { control, ...rest } = props;
    switch (control) {
        case "input":
            return <Input {...rest} />;
        case "textArea":
            return <Textarea {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "radio":
            return <RadioButtons {...rest} />;
        default:
            return null;
    }
};

FormikController.propTypes = {
    control: PropTypes.string
};

export default FormikController;
