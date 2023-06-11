import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getCurrentUserData,
    getCurrentUserId,
    getErrorUser,
    getUserLoadingStatus
} from "../store/user";
import { getIcon } from "../utils/getIcon";
import {
    getCategorError,
    getCategories,
    getLoadingStatusCategory
} from "../store/categories";
import {
    getLoadingStatusOperations,
    getOperationError,
    getOperations
} from "../store/operation";
import { userAnalitic } from "../utils/userAnalitic";
import Loader from "../components/Loader";
import {
    getAccountError,
    getBankAccounts,
    getLoadingStatusAccount
} from "../store/bankAccount";
import Modal from "../components/Modal/modal";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserFormEdit from "../components/forms/editUserForm";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [modalActiveEdit, setModalActiveEdit] = useState(false);

    const statusCategories = useSelector(getLoadingStatusCategory());
    const statusOperations = useSelector(getLoadingStatusOperations());
    const statusAccounts = useSelector(getLoadingStatusAccount());
    const statusUser = useSelector(getUserLoadingStatus());
    const categories = useSelector(getCategories());
    const operations = useSelector(getOperations());
    const accounts = useSelector(getBankAccounts());

    const currentUserId = useSelector(getCurrentUserId());
    useEffect(() => {
        if (userId !== currentUserId) {
            navigate(`/user/${currentUserId}`);
        }
    }, [userId]);
    const [error, setError] = useState(null);

    const userErrors = useSelector(getErrorUser());
    const operationError = useSelector(getOperationError());
    const accountError = useSelector(getAccountError());
    const categorError = useSelector(getCategorError());

    useEffect(() => {
        setError(accountError);
    }, [accountError]);
    useEffect(() => {
        setError(operationError);
    }, [operationError]);
    useEffect(() => {
        setError(categorError);
    }, [categorError]);
    useEffect(() => {
        setError(userErrors);
    }, [userErrors]);

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    useEffect(() => {
        if (!statusCategories && !statusOperations && !statusAccounts) {
            setData(userAnalitic(operations, categories, accounts));
        }
    }, [
        statusCategories,
        statusOperations,
        statusAccounts,
        operations?.length,
        categories?.length,
        accounts?.length
    ]);

    const currentUser = useSelector(getCurrentUserData());
    const getValidData = (date) => {
        const data = new Date(date);
        const timeDiff = Math.abs(data.getTime() - new Date().getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    };

    return (
        <div className="container">
            {!statusUser ? (
                <div>
                    <div
                        className="card col-auto m-2"
                        style={{
                            background:
                                "linear-gradient(to bottom, #e6e6fa 0%, #f0ffff 100%)"
                        }}
                    >
                        <div className="card-body">
                            <span
                                role="button"
                                onClick={() => setModalActiveEdit(true)}
                                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            >
                                Редактировать{getIcon("edit")}
                            </span>
                            <div className="d-flex flex-column align-items-center text-center position-relative ">
                                <img
                                    src={currentUser.image}
                                    className="rounded-circle"
                                    width="140"
                                    height="140"
                                    alt="profile"
                                    style={{ background: "white" }}
                                />
                                <div className="mt-3 col">
                                    <h4>{currentUser.name}</h4>
                                    <p className="text-secondary mb-1">
                                        Возраст: {currentUser.age}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data ? (
                        <>
                            <div
                                className="card col-auto m-2"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, #f0ffff 0%, #fffafa 100%)"
                                }}
                            >
                                <div className="card-body ">
                                    <h5>Анализ использования приложения</h5>
                                    <div>
                                        <p>
                                            Созданно категорий:{" "}
                                            {data.categories}
                                        </p>
                                        <p>
                                            Создано счетов: {data.accounts - 1}
                                        </p>
                                        <p>
                                            Учтено операций: {operations.length}
                                        </p>
                                        <p>
                                            Количество дней использования
                                            приложения:{" "}
                                            {getValidData(
                                                currentUser.createdAt
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="card col-auto m-2"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, #fffafa 0%, #f5fffa 100%)"
                                }}
                            >
                                <div className="card-body ">
                                    <h5>Анализ счетов</h5>
                                    <div>
                                        <p>
                                            Всего активных счетов:{" "}
                                            {data.accounts}
                                        </p>
                                        <p>
                                            Текуший баланс по всем счетам:{" "}
                                            {data.balance}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="card col-auto m-2"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, #f5fffa 24%, #e6e6fa 61%)"
                                }}
                            >
                                <div className="card-body ">
                                    <h5>Анализ операций</h5>
                                    <div>
                                        <p>
                                            Суммарный получено средств:{" "}
                                            {data.income}
                                        </p>
                                        <p>
                                            Суммарный потрачено средств:{" "}
                                            {data.expenditure}
                                        </p>
                                        {data.income !== data.expenditure &&
                                            (data.income < data.expenditure ? (
                                                <p>
                                                    Ваши расходы превышают
                                                    доходы! {getIcon("frown")}
                                                </p>
                                            ) : (
                                                <p>
                                                    Ваши доходы превышают
                                                    расходы! {getIcon("smile")}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            ) : (
                <Loader />
            )}

            {modalActiveEdit && (
                <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
                    <UserFormEdit
                        user={currentUser}
                        setActive={setModalActiveEdit}
                    />
                </Modal>
            )}
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};
export default UserPage;
