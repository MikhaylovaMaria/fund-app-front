import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import FormikController from "../common/form/FormikController";
import PreviewImage from "../common/form/PrevieImage";
import { getIcon } from "../../utils/getIcon";
import _ from "lodash";
import PropTypes from "prop-types";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const UserFormEdit = ({ setActive, user }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Поле обязательно к заполнению"),
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
                          "Размер файла слишком большой",
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
                : Yup.string()
    });

    const initialValues = {
        name: user.name,
        age: user.age,
        sex: user.sex,
        image: user.image
    };

    const onSubmit = (values) => {
        if (!_.isEqual(values, initialValues)) {
            dispatch(updateUser(values, setActive));
        } else {
            setActive(false);
        }
    };

    const options = [
        { _id: "male", value: "мужской" },
        { _id: "female", value: "женский" },
        { _id: "other", value: "другое" }
    ];

    const fileRef = useRef(null);

    return (
        <div className="row m-3">
            <h2>Обо мне</h2>
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

UserFormEdit.propTypes = {
    setActive: PropTypes.func,
    user: PropTypes.object
};

export default UserFormEdit;
