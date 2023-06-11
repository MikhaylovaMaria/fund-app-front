import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOperations, removeOperation } from "../store/operation";
import { getBankAccounts } from "../store/bankAccount";
import { getCategoriesOperation } from "../store/categories";
import DrownButton from "../components/common/button/dropButton";
import TableOperarions from "../components/table/tableOperations";
import Loader from "../components/Loader";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import OperationFormAdd from "../components/forms/addOperationForm";
import { getIcon } from "../utils/getIcon";
import Modal from "../components/Modal/modal";

const HistoryPage = () => {
    const dispatch = useDispatch();
    const operations = useSelector(getOperations());
    const bankAccounts = useSelector(getBankAccounts());
    const categories = useSelector(getCategoriesOperation());

    const [isOpenOperation, setOpenOperation] = useState(false);
    const [isOpenCategory, setOpenCategory] = useState(false);
    const [isOpenAccount, setOpenAccount] = useState(false);

    const [currentOperation, setCurrentOperation] = useState({});
    const [currentAccount, setCurrentAccount] = useState({});
    const [currentCategory, setCurrentCategory] = useState({});

    const [modalActiveAdd, setModalActiveAdd] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [data, setData] = useState();

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const handleRemove = (id) => {
        dispatch(removeOperation(id));
    };

    const options = [
        { _id: "income", name: "Доходы" },
        { _id: "expenditure", name: "Расходы" }
    ];

    const filterData = (operations, typeOpe, typeCat, typeAcc) => {
        let result = operations;
        if (typeOpe?._id) result = result.filter((o) => o.type === typeOpe._id);
        if (typeCat?._id) result = result.filter((o) => o.category === typeCat._id);
        if (typeAcc?._id) result = result.filter((o) => o.account === typeAcc._id);

        return result;
    };
    const count = data?.length;

    useEffect(() => {
        setData(
            filterData(
                operations,
                currentOperation,
                currentCategory,
                currentAccount
            )
        );
    }, [currentAccount, currentCategory, currentOperation, operations]);

    return (
        <div className="container">
            {categories && bankAccounts && (
                <div
                    className="card m-2"
                    style={{
                        background:
                            "linear-gradient(to bottom, #e6e6fa 0%, #f0ffff 100%"
                    }}
                >
                    <div className="row m-2 text-justify">
                        <h5 className="col-auto text-left m-2">Показать</h5>
                        <DrownButton
                            setOpen={setOpenOperation}
                            isOpen={isOpenOperation}
                            defaultValue="Все операции"
                            options={options}
                            setCurrentValue={setCurrentOperation}
                            currentValue={currentOperation}
                            setDef1={setOpenCategory}
                            setDef2={setOpenAccount}
                        />
                        <DrownButton
                            setOpen={setOpenCategory}
                            isOpen={isOpenCategory}
                            defaultValue="Все категории"
                            options={categories}
                            setCurrentValue={setCurrentCategory}
                            currentValue={currentCategory}
                            setDef1={setOpenOperation}
                            setDef2={setOpenAccount}
                        />
                        <DrownButton
                            setOpen={setOpenAccount}
                            isOpen={isOpenAccount}
                            defaultValue="Все счета"
                            options={bankAccounts}
                            setCurrentValue={setCurrentAccount}
                            currentValue={currentAccount}
                            setDef1={setOpenOperation}
                            setDef2={setOpenCategory}
                        />
                        <h5
                            className="col-auto text-right m-2 "
                            role="button"
                            onClick={() => setModalActiveAdd(true)}
                        >
                            Добавить новую операцию
                            {getIcon("plus")}
                        </h5>
                    </div>
                </div>
            )}

            <div className="card m-2">
                {data ? (
                    data.length > 0 ? (
                        <TableOperarions
                            operations={paginate(data, currentPage, pageSize)}
                            bankAccounts={bankAccounts}
                            categories={categories}
                            handleRemove={handleRemove}
                        />
                    ) : (
                        <p>Операций нет</p>
                    )
                ) : (
                    <Loader />
                )}
            </div>

            <div className="d-flex justify-content-center">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            {modalActiveAdd && (
                <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                    <OperationFormAdd setActive={setModalActiveAdd} />
                </Modal>
            )}
        </div>
    );
};

export default HistoryPage;
