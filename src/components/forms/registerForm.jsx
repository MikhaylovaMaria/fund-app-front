import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getErrorUser, signUp } from "../../store/user";
import FormikController from "../common/form/FormikController";
import PreviewImage from "../common/form/PrevieImage";
import { getIcon } from "../../utils/getIcon";
import { toast } from "react-toastify";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const RegisterForm = () => {
    const dispatch = useDispatch();
    const userErrors = useSelector(getErrorUser());
    const [error, setError] = useState(null);
    const [type, setType] = useState();

    useEffect(() => {
        setError(userErrors);
    }, [userErrors]);

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
        email: Yup.string()
            .email("Введите верный email")
            .required("Поле обязательно к заполнению"),
        password: Yup.string()
            .required("Поле обязательно к заполнению")
            .min(8, "Минимальная длина пароля 8 символов"),
        age: Yup.number("Введите ваш возраст")
            .required("Поле обязательно к заполнению")
            .min(1, "Введите ваш возраст"),
        sex: Yup.string().required("Поле обязательно к заполнению"),
        image:
            type === "obj"
                ? Yup.mixed()
                      .nullable()
                      .test(
                          "FILE_SIZE",
                          "Размер файла слмшком большой",
                          (value) =>
                              !value || (value && value.size <= 1024 * 1024)
                      )
                      .test(
                          "FILE_FORMAT",
                          "Неверный формат",
                          (value) =>
                              !value ||
                              (value && SUPPORTED_FORMATS.includes(value?.type))
                      )
                : Yup.string().url("").nullable()
    });

    const initialValues = {
        email: "",
        password: "",
        name: "",
        age: "",
        sex: "",
        image: "https://res.cloudinary.com/dh2eb0xye/image/upload/v1686404759/pngwing.com_2_bmvbbd.png"
    };

    const onSubmit = (values) => {
        dispatch(signUp(values));
    };

    const options = [
        { _id: "male", value: "мужской" },
        { _id: "female", value: "женский" },
        { _id: "other", value: "другое" }
    ];

    const fileRef = useRef(null);

    return (
        <div className="row m-3">
            <h2>Регистрация</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <Form>
                        <label className="form-label">
                            <span
                                type="button"
                                onClick={() => {
                                    fileRef.current.click();
                                }}
                            >
                                Аватар{getIcon("load")}
                            </span>
                        </label>

                        <input
                            ref={fileRef}
                            hidden
                            type="file"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue(
                                    "image",
                                    event.target.files[0]
                                );
                                setType("obj");
                            }}
                        />
                        {formik.values.image && (
                            <PreviewImage file={formik.values.image} />
                        )}
                        <div className="text-danger">
                            {" "}
                            {formik.errors.image}
                        </div>
                        <FormikController
                            control="input"
                            label="Имя"
                            name="name"
                        />
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
                        <FormikController
                            control="input"
                            label="Возраст"
                            name="age"
                            type="number"
                        />
                        <FormikController
                            control="radio"
                            label="Пол"
                            name="sex"
                            options={options}
                        />

                        <button className="btn btn-primary m-2" type="submit">
                            Зарегистроваться
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
