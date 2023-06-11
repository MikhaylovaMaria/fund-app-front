import React, { useState } from "react";
import Modal from "./Modal/modal";
import { getIcon } from "../utils/getIcon";
import CategoryFormAdd from "./forms/addCategoryForm";
import CategoriesFormInfo from "./forms/infoCategoriesForm";
import PropTypes from "prop-types";

const Categories = ({ categories }) => {
    const [modalActiveAdd, setModalActiveAdd] = useState(false);
    const [modalActiveEdit, setModalActiveEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({});
    const [showBaseCat, setBaseCat] = useState(false);
    const [showUserCat, setUserCat] = useState(false);

    const handleInfo = (c) => {
        setCurrentCategory(c);
        setModalActiveEdit(true);
    };

    return (
        <>
            <div className="row m-1">
                <h4 className="m-2">
                    {showBaseCat ? (
                        <span role="button" onClick={() => setBaseCat(false)}>
                            {getIcon("eye")}
                        </span>
                    ) : (
                        <span role="button" onClick={() => setBaseCat(true)}>
                            {getIcon("closeEye")}
                        </span>
                    )}
                    Базовые категории:
                </h4>
                {showBaseCat &&
                    categories.map((c) => {
                        if (c.type === "base") {
                            return (
                                <div
                                    role="button"
                                    onClick={() => handleInfo(c)}
                                    className="col-auto m-2 p-0 text-dark bg-white rounded-pill"
                                    key={c._id}
                                >
                                    {c.icon && getIcon(c.icon)}
                                    <span>{c.name}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                <h4 className="m-2">
                    {showUserCat ? (
                        <span role="button" onClick={() => setUserCat(false)}>
                            {getIcon("eye")}
                        </span>
                    ) : (
                        <span role="button" onClick={() => setUserCat(true)}>
                            {getIcon("closeEye")}
                        </span>
                    )}
                    Созданные категории:
                </h4>
                {showUserCat &&
                    categories.map((c) => {
                        if (c.type !== "base") {
                            return (
                                <div
                                    role="button"
                                    onClick={() => handleInfo(c)}
                                    className="col-auto m-2 text-dark bg-white rounded-pill"
                                    key={c._id}
                                >
                                    {c.icon && getIcon(c.icon)}
                                    {c.name}
                                </div>
                            );
                        }
                        return null;
                    })}
                <h4 className="m-2">
                    <span role="button" onClick={() => setModalActiveAdd(true)}>
                        {getIcon("plus")}
                    </span>
                    Добавить новую категорию?
                </h4>
                {modalActiveAdd ? (
                    <Modal
                        active={modalActiveAdd}
                        setActive={setModalActiveAdd}
                    >
                        <CategoryFormAdd setActive={setModalActiveAdd} />
                    </Modal>
                ) : (
                    ""
                )}
                {modalActiveEdit ? (
                    <Modal
                        active={modalActiveEdit}
                        setActive={setModalActiveEdit}
                    >
                        <CategoriesFormInfo
                            setActive={setModalActiveEdit}
                            category={currentCategory}
                        />
                    </Modal>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

Categories.propTypes = {
    categories: PropTypes.array
};

export default Categories;
