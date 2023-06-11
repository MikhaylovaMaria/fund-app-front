import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccounts } from "../../store/bankAccount";
import { createOperation } from "../../store/operation";
import { getCategoriesOperation } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import PropTypes from "prop-types";

const OperationFormAdd = ({ setActive, type }) => {
    const dispatch = useDispatch();

    const categories = useSelector(getCategoriesOperation());
    const accounts = useSelector(getBankAccounts());

    const validationSchema = Yup.object().shape({
        summa: Yup.number("Введите число")
            .required("Поле обязательно к заполнению")
            .min(1, "Сумма должна быть положительным числом"),
        type: Yup.string().required("Поле обязательно к заполнению"),
        account: Yup.string().required("Поле обязательно к заполнению"),
        category: Yup.string().required("Поле обязательно к заполнению"),
        comment: Yup.string().max(20, "Допустимый формат 20 символов")
    });
    const options = [
        { _id: "income", value: "доход" },
        { _id: "expenditure", value: "расход" }
    ];

    const defaultType =
        type === "expenditure" ? options[1]._id : options[0]._id;

    const initialValues = {
        summa: "",
        type: defaultType,
        account: accounts[0]._id,
        category: categories.filter((c) => c.name === "Другое")[0]._id,
        comment: ""
    };

    const onSubmit = (values) => {
        dispatch(createOperation(values));
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
                        <h2>Новая операция</h2>
                        <FormikController
                            control="select"
                            label="Счет"
                            name="account"
                            options={accounts}
                        />
                        <FormikController
                            control="radio"
                            label="Тип операции"
                            name="type"
                            options={options}
                        />

                        <FormikController
                            control="select"
                            label="Категория"
                            name="category"
                            options={categories}
                        />

                        <FormikController
                            control="input"
                            label="Сумма"
                            name="summa"
                            type="number"
                        />
                        <FormikController
                            control="textArea"
                            label="Комментарий"
                            name="comment"
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

OperationFormAdd.propTypes = {
    setActive: PropTypes.func,
    type: PropTypes.string
};

export default OperationFormAdd;
