import React from "react";
import { getIcon } from "../../utils/getIcon";
import PropTypes from "prop-types";

const TableHeader = ({
    sortedColumn,
    setSortedColumn,
    sortedBy,
    setSortedBy
}) => {
    const handleClick = (name) => {
        setSortedColumn(name);
        setSortedBy((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const setRows = (name) => {
        if (sortedColumn === name && sortedBy === "asc") return getIcon("asc");
        if (sortedColumn === name && sortedBy === "desc")
            // eslint-disable-next-line curly
            return getIcon("desc");
    };
    return (
        <thead>
            <tr className="row text-justify">
                <th
                    scope="col"
                    className="col-sm text-center"
                    role="button"
                    onClick={() => handleClick("Sum")}
                >
                    <span>Сумма {setRows("Sum")}</span>
                </th>
                <th scope="col" className="col-sm text-center">
                    <span>Счет списания</span>
                </th>
                <th scope="col" className="col-sm text-center">
                    <span>Категория</span>
                </th>
                <th
                    scope="col"
                    className="col-sm text-center"
                    role="button"
                    onClick={() => handleClick("Date")}
                >
                    <span>Дата {setRows("Date")}</span>
                </th>
                <th scope="col" className="col-sm text-center">
                    <span>Комментарий</span>
                </th>
                <th scope="col" className="col-auto"></th>
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    sortedColumn: PropTypes.string,
    setSortedColumn: PropTypes.func,
    sortedBy: PropTypes.string,
    setSortedBy: PropTypes.func
};
export default TableHeader;
