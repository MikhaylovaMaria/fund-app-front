import React, { useEffect, useState } from "react";
import Modal from "./Modal/modal";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
    getAccountError,
    getLoadingStatusAccount,
    removeAccount
} from "../store/bankAccount";
import { getIcon } from "../utils/getIcon";
import { getCategories } from "../store/categories";
import { toast } from "react-toastify";
import BankAccountFormEdit from "./forms/editBankAccountForm";
import BankAccountFormAdd from "./forms/addBankAccountForm";

const BankAccount = ({ accounts }) => {
    const dispatch = useDispatch();
    const [modalActiveAdd, setModalActiveAdd] = useState(false);
    const [modalActiveEdit, setModalActiveEdit] = useState(false);
    const [currentAccount, setCurrentAccount] = useState({});
    const [error, setError] = useState(null);

    const categories = useSelector(getCategories());
    const isLoadingAccounts = useSelector(getLoadingStatusAccount());
    const accountError = useSelector(getAccountError());

    useEffect(() => {
        setError(accountError);
    }, [accountError]);

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    const handleRemove = (id) => {
        dispatch(removeAccount(id));
    };
    const handleEdit = (a) => {
        setCurrentAccount(a);
        setModalActiveEdit(true);
    };

    const getCategoryIcon = (a) => {
        if (a?.icon) {
            return getIcon(a.icon);
        } else {
            const currentCategory = categories?.find(
                (c) => c._id === a.category
            );
            return getIcon(currentCategory?.icon);
        }
    };
    return (
        <div className="col m-2">
            <div
                className="card"
                style={{
                    background:
                        "linear-gradient(to bottom, #e6e6fa 0%, #f0ffff 100%)"
                }}
            >
                <div className="card-body">
                    <h4 className="row">
                        <span className="col-sm">Счета</span>
                        <span
                            className="col-auto d-flex flex-row-reverse"
                            role="button"
                            onClick={() => setModalActiveAdd(true)}
                        >
                            {getIcon("plus")}
                        </span>
                    </h4>
                    <div
                        className="scroll"
                        style={{
                            maxHeight: "25vh",
                            overflowX: "hidden",
                            scrollbarWidth: "1px"
                        }}
                    >
                        {!isLoadingAccounts ? (
                            accounts.map((a) => {
                                return (
                                    <div
                                        key={a._id}
                                        className="row bg-white rounded-pill col-auto m-2 p-2"
                                    >
                                        <span className="col-sm">
                                            <span className="col-auto">
                                                {getCategoryIcon(a)}
                                            </span>
                                            {a.name}
                                        </span>
                                        <span className="col-auto">
                                            {a.balance}
                                        </span>
                                        <span
                                            className="col-auto"
                                            role="button"
                                            onClick={() => handleEdit(a)}
                                        >
                                            {getIcon("edit")}
                                        </span>

                                        {a.type !== "main" ? (
                                            <span
                                                className="col-auto"
                                                role="button"
                                                onClick={() =>
                                                    handleRemove(a._id)
                                                }
                                            >
                                                {getIcon("delete")}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <Loader />
                        )}
                    </div>
                    {modalActiveAdd && (
                        <Modal
                            active={modalActiveAdd}
                            setActive={setModalActiveAdd}
                        >
                            <BankAccountFormAdd setActive={setModalActiveAdd} />
                        </Modal>
                    )}
                    {modalActiveEdit && (
                        <Modal
                            active={modalActiveEdit}
                            setActive={setModalActiveEdit}
                        >
                            <BankAccountFormEdit
                                setActive={setModalActiveEdit}
                                account={currentAccount}
                            />
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

BankAccount.propTypes = {
    accounts: PropTypes.array
};

export default BankAccount;
