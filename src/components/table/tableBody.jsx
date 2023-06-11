import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { transformFormDate } from "../../utils/transformDate";
import PropTypes from "prop-types";

const TableBody = ({ operations, bankAccounts, categories, handleRemove }) => {
    const getColorSum = (type, sum) => {
        if (type === "income") {
            return <p className="text-success">+{sum}</p>;
        } else {
            return <p className="text-danger">-{sum}</p>;
        }
    };

    const getBankAccountName = (id) => {
        const bankAccount = bankAccounts?.filter((b) => b._id === id);
        return bankAccount ? bankAccount[0].name : null;
    };

    const getCategoryName = (id) => {
        const category = categories?.filter((c) => c._id === id);
        return category ? category[0].name : null;
    };

    return (
        <tbody
            style={{
                background:
                    "linear-gradient(to bottom, #f5fffa 24%, #e6e6fa 61%)"
            }}
        >
            {operations.map((o) => {
                return (
                    <tr className="row text-justify" key={o._id}>
                        <td className="col-sm text-center">
                            {getColorSum(o.type, o.summa)}
                        </td>
                        <td className="col-sm text-center">
                            {getBankAccountName(o.account)}
                        </td>
                        <td className="col-sm text-center">
                            {getCategoryName(o.category)}
                        </td>
                        <td className="col-sm text-center">
                            {transformFormDate(o.createdAt)}
                        </td>
                        <td className="col-sm text-justify text-truncate">
                            {o.comment}
                        </td>
                        <td className="col-auto text-center">
                            <DeleteOutlined
                                className="col-auto"
                                onClick={() => handleRemove(o._id)}
                            />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

TableBody.propTypes = {
    operations: PropTypes.array,
    bankAccounts: PropTypes.array,
    categories: PropTypes.array,
    handleRemove: PropTypes.func
};

export default TableBody;
