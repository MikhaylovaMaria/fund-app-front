import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { removeCategory, updateCategory } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import { IconsName } from "../../utils/iconsName";
import { getIcon } from "../../utils/getIcon";
import PropTypes from "prop-types";

const CategoriesFormInfo = ({ setActive, category }) => {
    const dispatch = useDispatch();

    const icons = IconsName;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
        article: Yup.string().required("Поле обязательно к заполнению")
    });

    const initialValues = {
        name: category.name,
        article: category.article,
        icon: category?.icon
    };

    const onSubmit = (values) => {
        if (!_.isEqual(values, initialValues)) {
            dispatch(updateCategory({ ...category, ...values }));
        }
        setActive(false);
    };

    const handleRemove = (id) => {
        dispatch(removeCategory(id));
        setActive(false);
    };

    const options = [
        { _id: "operation", value: "операций" },
        { _id: "account", value: "счетов" },
        { _id: "other", value: "общая" }
    ];

    return (
        <div className="row m-3">
            {category.type !== "base" ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form>
                            <h2>Информация о категории</h2>
                            <FormikController
                                control="radio"
                                label="Иконка"
                                name="icon"
                                options={icons}
                            />
                            <FormikController
                                control="input"
                                label="Название"
                                name="name"
                            />
                            <FormikController
                                control="radio"
                                label="Использовать для"
                                name="article"
                                options={options}
                            />
                            <div className="row">
                                {formik.values !== initialValues && (
                                    <button
                                        className="col-sm btn text-white m-2"
                                        type="submit"
                                        style={{ background: "#4ab563" }}
                                    >
                                        Изменить
                                    </button>
                                )}
                                <button
                                    className="col-sm btn text-dark m-2"
                                    style={{ background: "#ed969e" }}
                                    type="button"
                                    onClick={() => handleRemove(category._id)}
                                >
                                    Удалить
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
            ) : (
                <div className="row">
                    <h2>Информация о категории</h2>
                    {category.icon && (
                        <>
                            <label
                                className="form-label col-auto"
                                htmlFor="name"
                            >
                                Иконка
                            </label>
                            <span
                                className="form-control bg-light col-auto"
                                style={{ flex: 0 }}
                            >
                                {getIcon(category.icon)}
                            </span>
                        </>
                    )}
                    <label className="form-label" htmlFor="name">
                        Название
                    </label>
                    <div className="form-control bg-light text-dark ">
                        {category.name}
                    </div>
                    <label className="form-label" htmlFor="article">
                        Используется для
                    </label>
                    <div className="form-control bg-light text-dark ">
                        {options.map((n) => {
                            if (n._id === category.article) return n.value;
                            return null;
                        })}
                    </div>
                    <button
                        className="col-sm btn text-dark m-2"
                        style={{ background: "#ced4da" }}
                        type="button"
                        onClick={() => setActive(false)}
                    >
                        Закрыть
                    </button>
                </div>
            )}
        </div>
    );
};

CategoriesFormInfo.propTypes = {
    setActive: PropTypes.func,
    category: PropTypes.object
};

export default CategoriesFormInfo;
