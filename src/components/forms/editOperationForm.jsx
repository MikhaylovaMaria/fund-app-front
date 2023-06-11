import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getCategoriesOperation } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import { updateOperation } from "../../store/operation";
import { transformFormDate } from "../../utils/transformDate";
import PropTypes from "prop-types";

const OperationFormEdit = ({ setActive, operation }) => {
    const dispatch = useDispatch();

    const categories = useSelector(getCategoriesOperation());

    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Поле обязательно к заполнению"),
        comment: Yup.string().max(20, "Допустимый формат 20 символов")
    });

    const initialValues = {
        category: operation.category,
        comment: operation.comment
    };

    const onSubmit = (values) => {
        if (!_.isEqual(values, initialValues)) {
            dispatch(updateOperation({ ...operation, ...values }));
        }
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
                        <h2>Информация об операции</h2>
                        <label className="form-label" htmlFor="summa">
                            Cумма
                        </label>
                        <div className="form-control bg-light text-dark ">
                            {operation.summa}
                        </div>
                        <label className="form-label" htmlFor="type">
                            Тип
                        </label>
                        <div className="form-control bg-light text-dark ">
                            {operation.type === "income" ? "Доход" : "Расход"}
                        </div>
                        <label className="form-label" htmlFor="date">
                            Дата
                        </label>
                        <div className="form-control bg-light text-dark ">
                            {transformFormDate(operation.createdAt)}
                        </div>
                        <FormikController
                            control="select"
                            label="Категория"
                            name="category"
                            options={categories}
                        />

                        <FormikController
                            control="textArea"
                            label="Комментарий"
                            name="comment"
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

OperationFormEdit.propTypes = {
    setActive: PropTypes.func,
    operation: PropTypes.object
};

export default OperationFormEdit;
