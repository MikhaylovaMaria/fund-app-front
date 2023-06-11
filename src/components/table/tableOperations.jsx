import React, { useState } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const TableOperarions = ({
    operations,
    bankAccounts,
    categories,
    handleRemove
}) => {
    const [sortedColumn, setSortedColumn] = useState("Date");
    const [sortedBy, setSortedBy] = useState("asc");

    const sortedData = (oper, column, by) => {
        const currentOper = oper;
        if (column === "Sum") {
            by === "asc"
                ? currentOper.sort((o1, o2) => o1.summa - o2.summa)
                : currentOper.sort((o1, o2) => o2.summa - o1.summa);
        }
        if (column === "Date") {
            by === "asc"
                ? currentOper.sort(
                      (o1, o2) =>
                          new Date(o1.createdAt) - new Date(o2.createdAt)
                  )
                : currentOper.sort(
                      (o1, o2) =>
                          new Date(o2.createdAt) - new Date(o1.createdAt)
                  );
        }
        return currentOper;
    };

    return (
        <table className="table m-0 row">
            <TableHeader
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
            />
            <TableBody
                operations={sortedData(operations, sortedColumn, sortedBy)}
                bankAccounts={bankAccounts}
                categories={categories}
                handleRemove={handleRemove}
            />
        </table>
    );
};

TableOperarions.propTypes = {
    operations: PropTypes.array,
    bankAccounts: PropTypes.array,
    categories: PropTypes.array,
    handleRemove: PropTypes.func
};

export default TableOperarions;
