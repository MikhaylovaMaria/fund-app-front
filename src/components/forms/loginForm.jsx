import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getErrorUser, logIn } from "../../store/user";
import FormikController from "../common/form/FormikController";
import { toast } from "react-toastify";

const LoginForm = () => {
    const dispatch = useDispatch();

    const userErrors = useSelector(getErrorUser());

    const [error, setError] = useState(null);

    useEffect(() => {
        setError(userErrors);
    }, [userErrors]);

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Введите верный email")
            .required("Поле обязательно к заполнению"),
        password: Yup.string()
            .required("Поле обязательно к заполнению")
            .min(8, "Минимальная длина пароля 8 символов")
    });
    const initialValues = { email: "", password: "" };

    const onSubmit = (values) => {
        dispatch(logIn(values));
    };

    return (
        <div className="row m-3">
            <h2>Вход</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <FormikController
                            control="input"
                            type="email"
                            label="Почта"
                            name="email"
                        />
                        <FormikController
                            control="input"
                            type="password"
                            label="Пароль"
                            name="password"
                        />
                        <button className="btn btn-primary m-2" type="submit">
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
