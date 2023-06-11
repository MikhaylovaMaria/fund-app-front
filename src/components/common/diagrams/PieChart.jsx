import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
    const options = {
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0 // animation duration after a resize
    };
    return <Pie data={chartData} options={options} />;
};

PieChart.propTypes = {
    chartData: PropTypes.object
};

export default PieChart;
