import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createСategory } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import { IconsName } from "../../utils/iconsName";
import PropTypes from "prop-types";

const CategoryFormAdd = ({ setActive }) => {
    const dispatch = useDispatch();

    const icons = IconsName;

    const options = [
        { _id: "operation", value: "операций" },
        { _id: "account", value: "счетов" },
        { _id: "other", value: "общая" }
    ];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
        article: Yup.string().required("Поле обязательно к заполнению")
    });

    const initialValues = {
        name: "",
        article: "",
        type: "user",
        icon: "null"
    };

    const onSubmit = (values) => {
        dispatch(createСategory(values));
        setActive(false);
    };
    return (
        <div className="row m-3">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <h2>Новая категория</h2>
                        <FormikController
                            control="radio"
                            label="Иконка"
                            name="icon"
                            options={icons}
                        />
                        <FormikController
                            control="input"
                            label="Название категории"
                            name="name"
                        />

                        <FormikController
                            control="radio"
                            label="Использовать для"
                            name="article"
                            options={options}
                        />

                        <div className="row">
                            <button
                                className="col-sm btn text-white m-2"
                                type="submit"
                                style={{ background: "#4ab563" }}
                            >
                                Создать
                            </button>

                            <button
                                className="col-sm btn text-dark m-2"
                                style={{ background: "#ced4da" }}
                                type="button"
                                onClick={() => setActive(false)}
                            >
                                Закрыть
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

CategoryFormAdd.propTypes = {
    setActive: PropTypes.func
};

export default CategoryFormAdd;
