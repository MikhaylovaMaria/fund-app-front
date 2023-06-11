import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getCategoriesOperation } from "../../store/categories";
import FormikController from "../common/form/FormikController";
import { IconsName } from "../../utils/iconsName";
import { updateAccount } from "../../store/bankAccount";
import PropTypes from "prop-types";

const BankAccountFormEdit = ({ setActive, account }) => {
    const dispatch = useDispatch();

    const categories = useSelector(getCategoriesOperation());
    const icons = IconsName;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
        category: Yup.string().required("Поле обязательно к заполнению")
    });

    const initialValues = {
        name: account.name,
        category: account.category,
        icon: account?.icon
    };

    const onSubmit = (values) => {
        if (!_.isEqual(values, initialValues)) {
            dispatch(updateAccount({ ...account, ...values }));
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
                        <h2>Информация о счете</h2>
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
                        <label className="form-label" htmlFor="balance">
                            Баланс
                        </label>
                        <div className="form-control bg-light text-dark ">
                            {account.balance}
                        </div>
                        <label className="form-label" htmlFor="type">
                            Тип
                        </label>
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
BankAccountFormEdit.propTypes = {
    setActive: PropTypes.func,
    account: PropTypes.object
};

export default BankAccountFormEdit;
