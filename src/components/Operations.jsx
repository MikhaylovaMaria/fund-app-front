import React, { useState } from "react";
import OperationFormAdd from "./forms/addOperationForm";
import Modal from "./Modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
    getLoadingStatusOperations,
    removeOperation
} from "../store/operation";
import { getIcon } from "../utils/getIcon";
import Loader from "./Loader";
import OperationFormEdit from "./forms/editOperationForm";
import { transformFormDate } from "../utils/transformDate";
import PropTypes from "prop-types";

const Operations = ({ operations, type, name }) => {
    const [modalActiveAdd, setModalActiveAdd] = useState(false);
    const [modalActiveEdit, setModalActiveEdit] = useState(false);
    const [currentOperation, setCurrentOperation] = useState({});

    const operationStatus = useSelector(getLoadingStatusOperations());

    const handleEdit = (a) => {
        setCurrentOperation(a);
        setModalActiveEdit(true);
    };
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(removeOperation(id));
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
                        <span className="col-sm">{name}</span>
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
                        {!operationStatus ? (
                            operations ? (
                                operations.map((o) => {
                                    if (o.type === type) {
                                        return (
                                            <div
                                                key={o._id}
                                                className="row bg-white rounded-pill col-auto m-2 p-2"
                                            >
                                                <span className="col-sm">
                                                    {o.summa}
                                                </span>
                                                <span className="col-auto">
                                                    {transformFormDate(
                                                        o.createdAt
                                                    )}
                                                </span>
                                                <span
                                                    className="col-auto"
                                                    role="button"
                                                    onClick={() =>
                                                        handleEdit(o)
                                                    }
                                                >
                                                    {getIcon("edit")}
                                                </span>

                                                <span
                                                    className="col-auto"
                                                    role="button"
                                                    onClick={() =>
                                                        handleRemove(o._id)
                                                    }
                                                >
                                                    {getIcon("delete")}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <p>Операций нет</p>
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>

                    {modalActiveAdd && (
                        <Modal
                            active={modalActiveAdd}
                            setActive={setModalActiveAdd}
                        >
                            <OperationFormAdd
                                setActive={setModalActiveAdd}
                                type={type}
                            />
                        </Modal>
                    )}
                    {modalActiveEdit && (
                        <Modal
                            active={modalActiveEdit}
                            setActive={setModalActiveEdit}
                        >
                            <OperationFormEdit
                                setActive={setModalActiveEdit}
                                operation={currentOperation}
                            />
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

Operations.propTypes = {
    operations: PropTypes.array,
    type: PropTypes.string,
    name: PropTypes.string
};

export default Operations;
