import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/registerForm";
import LoginForm from "../components/forms/loginForm";
import PropTypes from "prop-types";

const Login = ({ type }) => {
    const [formType, setFormType] = useState(
        type === "signUp" ? type : "logIn"
    );

    const toggleFormType = () => {
        setFormType((prevstate) =>
            prevstate === "signUp" ? "logIn" : "signUp"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 ">
                    {formType === "signUp" ? (
                        <>
                            <RegisterForm />
                            <p>
                                Уже зарегистритрованы?
                                <Link to="/auth/logIn" onClick={toggleFormType}>
                                    Войти
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <LoginForm />
                            <p>
                                Еще не зарегистрированы?
                                <Link
                                    to="/auth/signUp"
                                    onClick={toggleFormType}
                                >
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
Login.propTypes = {
    type: PropTypes.string
};

export default Login;
