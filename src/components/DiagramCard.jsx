import React from "react";
import PieChart from "./common/diagrams/PieChart";
import PropTypes from "prop-types";

const DiagramCard = ({ userData, columns }) => {
    return (
        <div className="row m-2">
            <div className="col-sm" style={{ width: "50vw", height: "50vh" }}>
                {Object.keys(userData).length > 0 && (
                    <PieChart chartData={userData} />
                )}
            </div>
            <div className="col-sm" style={{ width: "20vw", height: "20vh" }}>
                {columns.map((str) => {
                    return (
                        <div key={str._id} className="m-2 ">
                            <h5 className="m-1 col-auto">
                                {str.name}: {str.summa}
                            </h5>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

DiagramCard.propTypes = {
    userData: PropTypes.object,
    columns: PropTypes.array
};

export default DiagramCard;
