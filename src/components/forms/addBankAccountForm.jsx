import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccount } from "../../store/bankAccount";
import { getCategoriesAccount } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import { IconsName } from "../../utils/iconsName";
import PropTypes from "prop-types";

const BankAccountFormAdd = ({ setActive }) => {
    const dispatch = useDispatch();

    const icons = IconsName;

    const categories = useSelector(getCategoriesAccount());

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
        balance: Yup.number().required("Поле обязательно к заполнению"),
        category: Yup.string().required("Поле обязательно к заполнению")
    });

    const initialValues = {
        name: "",
        balance: 0,
        category: categories.filter((c) => c.name === "Другое")[0]._id,
        icon: null
    };

    const onSubmit = (values) => {
        dispatch(createBankAccount(values));
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
                        <h2>Новый счет</h2>
                        <FormikController
                            control="radio"
                            label="Иконка"
                            name="icon"
                            options={icons}
                        />
                        <FormikController
                            control="input"
                            label="Название счета"
                            name="name"
                        />

                        <FormikController
                            control="select"
                            label="Тип счета"
                            name="category"
                            options={categories}
                        />
                        <FormikController
                            control="input"
                            label="Баланс"
                            name="balance"
                            type="number"
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

BankAccountFormAdd.propTypes = {
    setActive: PropTypes.func
};

export default BankAccountFormAdd;
