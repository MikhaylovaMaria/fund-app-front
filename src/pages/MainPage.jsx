import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import BankAccount from "../components/BankAccounts";
import { useSelector } from "react-redux";
import {
    getLoadingStatusOperations,
    getOperationError,
    getOperations
} from "../store/operation";
import Operations from "../components/Operations";
import { getAccountError, getBankAccounts } from "../store/bankAccount";
import {
    getCategorError,
    getCategories,
    getCategoriesOperation,
    getLoadingStatusCategory
} from "../store/categories";
import Categories from "../components/Categories";
import { getRandomColor } from "../utils/getRandomColor";
import DiagramCard from "../components/DiagramCard";
import { diagrammData } from "../utils/diagrammData";
import { toast } from "react-toastify";
import { getIcon } from "../utils/getIcon";

const MainPage = () => {
    const isLoadingCategories = useSelector(getLoadingStatusCategory());
    const isLoadingOperations = useSelector(getLoadingStatusOperations());
    const operations = useSelector(getOperations());
    const accounts = useSelector(getBankAccounts());
    const operationCategories = useSelector(getCategoriesOperation());
    const categories = useSelector(getCategories());

    const [userData, setUserData] = useState({});
    const [currentType, setCurrentType] = useState("income");
    const [colors, setColors] = useState();
    const [error, setError] = useState(null);

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
        toast.error(error);
        setError(null);
    }, [error]);

    useEffect(() => {
        if (!isLoadingCategories) {
            setColors(getRandomColor(operationCategories.length));
        }
    }, [isLoadingCategories]);

    useEffect(() => {
        if (!isLoadingCategories) {
            setColors((prev) => [...prev, getRandomColor(1)]);
        }
    }, [operationCategories?.length]);

    useEffect(() => {
        if (!isLoadingCategories && !isLoadingOperations) {
            setUserData({
                labels: diagrammData(
                    operations,
                    operationCategories,
                    currentType
                ).map((e) => e.name),
                datasets: [
                    {
                        label: false,
                        data: diagrammData(
                            operations,
                            operationCategories,
                            currentType
                        ).map((e) => e.summa),
                        backgroundColor: colors,
                        borderColor: "black",
                        borderWidth: 2
                    }
                ],
                options: {
                    legend: {
                        display: false
                    }
                }
            });
        }
    }, [
        currentType,
        isLoadingCategories,
        isLoadingOperations,
        operations?.length,
        colors
    ]);

    return (
        <div className="container">
            <div className="row">
                <Operations
                    operations={operations}
                    type={"income"}
                    name={"Доходы"}
                />
                <BankAccount accounts={accounts} />
                <Operations
                    operations={operations}
                    type={"expenditure"}
                    name={"Расходы"}
                />
            </div>

            <div className="col-sm">
                <div
                    className="card m-2"
                    style={{
                        background:
                            "linear-gradient(to bottom, #f0ffff 0%, #fffafa 100%)"
                    }}
                >
                    {!isLoadingCategories ? (
                        <Categories categories={categories} />
                    ) : (
                        <Loader />
                    )}
                </div>

                <div
                    className="card row m-2"
                    style={{
                        background:
                            "linear-gradient(to bottom, #fffafa 0%, #f5fffa 100%)"
                    }}
                >
                    <div className="row m-2">
                        <h5
                            onClick={() => setCurrentType("income")}
                            role="button"
                            className="text-dark rounded-pill col-auto m-2"
                            style={{ background: "#b2dfbc" }}
                        >
                            {currentType === "income" && getIcon("check")}
                            Доходы
                        </h5>
                        <h5
                            role="button"
                            onClick={() => setCurrentType("expenditure")}
                            className="text-dark rounded-pill col-auto m-2"
                            style={{ background: "#f2b6bc" }}
                        >
                            {currentType === "expenditure" && getIcon("check")}
                            Расходы
                        </h5>
                    </div>
                    {userData.labels?.length > 0 ? (
                        <DiagramCard
                            userData={userData}
                            columns={diagrammData(
                                operations,
                                operationCategories,
                                currentType
                            )}
                        />
                    ) : (
                        <h5>Операций нет</h5>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
